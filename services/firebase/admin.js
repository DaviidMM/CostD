import admin from 'firebase-admin';

import { applicationDefault, initializeApp, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getMessaging } from 'firebase-admin/messaging';

require('dotenv').config();

const createOrLoadApp = (appName) => {
  if (!admin.apps.find((app) => app.name_ === appName)) {
    return initializeApp(
      {
        credential: applicationDefault()
      },
      appName
    );
  }
  return getApp(appName);
};

const app = createOrLoadApp('adminApp');
export const db = getFirestore(app);
const auth = getAuth(app);

export const extractUser = (authorization) => {
  if (!authorization) return false;
  const token = authorization.split(' ')[1];
  return auth
    .verifyIdToken(token)
    .then((user) => user)
    .catch((err) => {
      console.error(err);
      return false;
    });
};

export const sendNotification = ({ body, image, title, token }) => {
  const message = {
    data: { body, image: image || '', title },
    token
  };

  getMessaging(app)
    .send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
};

export const sendGroupNotification = async ({
  body,
  group,
  image,
  sender,
  title
}) => {
  const groupData = (await db.collection('groups').doc(group).get()).data();
  // Send notification to all members except sender
  const members = groupData.members
    .map((m) => m.uid)
    .filter((m) => m && m !== sender);

  if (!members.length) return;

  const users = await db
    .collection('users')
    .where(admin.firestore.FieldPath.documentId(), 'in', members)
    .get();

  const pushNotificationDefault = (
    await db.collection('preferences').doc('pushNotifications').get()
  ).data().default;

  const tokens = users.docs.reduce((acc, doc) => {
    const user = doc.data();
    // Do not send notification to users that have disabled pushNotifications
    if (
      user.preferences?.pushNotifications === false ||
      (user.preferences?.pushNotifications === undefined &&
        !pushNotificationDefault)
    ) {
      return acc;
    }
    return [...acc, ...user.devices.map((d) => d.token)];
  }, []);

  if (!tokens.length) return;

  const message = {
    data: { body, image: image || '', title, url: `/groups/${group}` },
    tokens
  };

  return getMessaging(app)
    .sendMulticast(message)
    .then((response) => {
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(tokens[idx]);
          }
        });
        console.log('List of tokens that caused failures: ' + failedTokens);
      }
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
};

export const subscribeTopic = async (tokens, topic) => {
  return await getMessaging(app).subscribeToTopic(tokens, topic);
};
