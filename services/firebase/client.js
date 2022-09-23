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
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
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
  tokenInLocalStorage: async () => {
    const token = await window.localStorage.getItem('fcm_token');
    console.log('fcm_token tokenInLocalStorage', token);
    return token;
  },
  onMessage: async () => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      alert('Notificacion');
    });
  },
  init: async function () {
    try {
      if ((await this.tokenInLocalStorage()) !== null) {
        console.log('it already exists');
        return false;
      }
      console.log('it is creating it.');
      const messaging = getMessaging(app);
      await Notification.requestPermission();
      getToken(messaging, {
        vapidKey:
          'BEbfgAHxsrrsJ-YdVsoTNARDNfot75nrj8YiA4B6hdZXuLICS4w2wSWdZUQcgY9xFtqMlLr4rGsWJ6JpQR2tELo',
      })
        .then((currentToken) => {
          console.log('current Token', currentToken);
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // save the token in your database
            window.localStorage.setItem('fcm_token', currentToken);
            console.log('fcm_token', currentToken);
          } else {
            // Show permission request UI
            console.log(
              'NOTIFICACION, No registration token available. Request permission to generate one.'
            );
            // ...
          }
        })
        .catch((err) => {
          console.log(
            'NOTIFICACIONAn error occurred while retrieving token . '
          );
          console.log(err);
        });
    } catch (error) {
      console.error(error);
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
