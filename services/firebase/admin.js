require('dotenv').config();

import admin from 'firebase-admin';

import { applicationDefault, initializeApp, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

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
