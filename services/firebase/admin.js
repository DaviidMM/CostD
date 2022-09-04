require('dotenv').config();

import admin from 'firebase-admin';

import { applicationDefault, initializeApp, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

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
