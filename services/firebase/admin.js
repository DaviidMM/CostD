require('dotenv').config();

import admin from 'firebase-admin';

import { applicationDefault, initializeApp, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getMessaging } from 'firebase-admin/messaging';

const createOrLoadApp = (appName) => {
  if (!admin.apps.find((app) => app.name_ === appName)) {
    return initializeApp(
      {
        credential: applicationDefault(),
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
  const [_, token] = authorization.split(' ');
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
    data: { body, image, title },
    token,
  };

  getMessaging(app)
    .send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
};

export const subscribeTopic = async (tokens, topic) => {
  return await getMessaging(app).subscribeToTopic(tokens, topic);
};
