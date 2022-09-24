import { getMessaging, onMessage } from 'firebase/messaging';
import { useEffect } from 'react';
import { app, firebaseCloudMessaging } from '../../services/firebase/client';

export default function PushNotificationLayout({ children }) {
  useEffect(() => {
    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log('token', token);
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }

    setToken();
    // Event listener that listens for the push notification event in the background
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.addEventListener('message', (event) => {
    //     console.log('event for the service worker', event);
    //   });
    // }
  });

  // Get the push notification message and triggers a toast to display it
  function getMessage() {
    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {
      const { notification } = payload;
      console.log({ notification });
      new Notification(notification.title, { body: notification.body });
    });
  }

  return children;
}
