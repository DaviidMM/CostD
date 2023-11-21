// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
  onAuthStateChanged,
  signOut,
  getIdToken
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';
import localforage from 'localforage';
import authStatus from '../../src/context/auth/status';
import api from '../api';

const FirebasePublicApiKey =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY
    : process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY_DEV;
const FirebaseAuthDomain =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_DEV;
const FirebaseProjectId =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_DEV;
const FirebaseStorageBucket =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_DEV;
const FirebaseMessagingSenderId =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    : process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_DEV;
const FirebaseAppId =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    : process.env.NEXT_PUBLIC_FIREBASE_APP_ID_DEV;
const FirebaseMeasurementId =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    : process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_DEV;
const PublicVapidKey =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_VAPID_KEY
    : process.env.NEXT_PUBLIC_VAPID_KEY_DEV;

const firebaseConfig = {
  apiKey: FirebasePublicApiKey,
  authDomain: FirebaseAuthDomain,
  projectId: FirebaseProjectId,
  storageBucket: FirebaseStorageBucket,
  messagingSenderId: FirebaseMessagingSenderId,
  appId: FirebaseAppId,
  measurementId: FirebaseMeasurementId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export const firebaseCloudMessaging = {
  init: async () => {
    try {
      const messaging = getMessaging(app);
      const tokenInLocalForage = await localforage.getItem('fcmToken');

      // Return the token if it is alredy in our local storage
      if (tokenInLocalForage !== null) return tokenInLocalForage;

      // Request the push notification permission from browser
      const status = await Notification.requestPermission();
      if (status && status === 'granted') {
        // Get new token from Firebase
        const vapidKey = PublicVapidKey;
        const fcmToken = await getToken(messaging, { vapidKey });
        // Set token in our local storage
        if (fcmToken) {
          localforage.setItem('fcmToken', fcmToken);
          return fcmToken;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

const mapUserFromFirebase = (user) => {
  if (!user) return null;
  const { displayName, email, photoURL, uid: id } = user;
  return {
    avatar: photoURL,
    displayName,
    email,
    id
  };
};

export const checkAuthState = (onChange) => {
  return onAuthStateChanged(auth, async (user) => {
    const normalizedUser = mapUserFromFirebase(user);
    if (normalizedUser) {
      storeUserInDb();
      return onChange({
        user: normalizedUser,
        status: authStatus.authenticated,
        token: await getIdToken(user)
      });
    }
    return onChange({
      user: null,
      status: authStatus.unauthenticated,
      token: null
    });
  });
};

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider).then(mapUserFromFirebase);
};

export const loginWithTwitter = () => {
  const provider = new TwitterAuthProvider();
  return signInWithPopup(auth, provider)
    .then(mapUserFromFirebase)
    .then(storeUserInDb);
};

export const logout = async () => {
  return signOut(auth).catch((err) => {
    console.error(err);
  });
};

export const getUserToken = async () => {
  const { currentUser } = auth;
  return currentUser ? await getIdToken(currentUser) : null;
};

export const storeUserInDb = async () => {
  return api.post('/users').then((res) => res.data);
};
