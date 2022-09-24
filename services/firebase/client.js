// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
  onAuthStateChanged,
  signOut,
  getIdToken,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';
import localforage from 'localforage';
import authStatus from '../../context/auth/status';
import api from '../api';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: 'costd-789a2.appspot.com',
  messagingSenderId: '294037826120',
  appId: '1:294037826120:web:45ec69e5c25e48e7a3c67d',
  measurementId: 'G-JH3F85GZT8',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const db = getFirestore(app);

export const firebaseCloudMessaging = {
  init: async () => {
    try {
      const messaging = getMessaging(app);
      const tokenInLocalForage = await localforage.getItem('fcm_token');

      // Return the token if it is alredy in our local storage
      if (tokenInLocalForage !== null) {
        return tokenInLocalForage;
      }

      // Request the push notification permission from browser
      const status = await Notification.requestPermission();
      if (status && status === 'granted') {
        // Get new token from Firebase
        const fcm_token = getToken(messaging, {
          vapidKey:
            'BEbfgAHxsrrsJ-YdVsoTNARDNfot75nrj8YiA4B6hdZXuLICS4w2wSWdZUQcgY9xFtqMlLr4rGsWJ6JpQR2tELo',
        });

        // Set token in our local storage
        if (fcm_token) {
          localforage.setItem('fcm_token', fcm_token);
          return fcm_token;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

const mapUserFromFirebase = (user) => {
  if (!user.user) return null;
  const { displayName, email, photoURL, uid: id } = user.user;
  return {
    avatar: photoURL,
    displayName,
    email,
    id,
  };
};

export const checkAuthState = (onChange) => {
  return onAuthStateChanged(auth, async (user) => {
    const normalizedUser = mapUserFromFirebase({ user });
    if (normalizedUser) {
      storeUserInDb();
      return onChange({
        user: normalizedUser,
        status: authStatus.authenticated,
        token: await getIdToken(user),
      });
    }
    return onChange({
      user: null,
      status: authStatus.unauthenticated,
      token: null,
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

export const logout = () => {
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
