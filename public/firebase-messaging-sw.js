importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyANBaRbOgFpiPi5X29E4fg5XniwwVJoDm8',
  authDomain: 'costd-789a2.firebaseapp.com',
  projectId: 'costd-789a2',
  storageBucket: 'costd-789a2.appspot.com',
  messagingSenderId: '294037826120',
  appId: '1:294037826120:web:45ec69e5c25e48e7a3c67d',
  measurementId: 'G-JH3F85GZT8',
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
