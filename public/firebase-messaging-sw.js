importScripts( //eslint-disable-line
  'https://www.gstatic.com/firebasejs/9.9.3/firebase-app-compat.js'
);
importScripts( //eslint-disable-line
  'https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging-compat.js'
);

firebase.initializeApp({ //eslint-disable-line
  apiKey: 'AIzaSyANBaRbOgFpiPi5X29E4fg5XniwwVJoDm8',
  authDomain: 'costd-789a2.firebaseapp.com',
  projectId: 'costd-789a2',
  storageBucket: 'costd-789a2.appspot.com',
  messagingSenderId: '294037826120',
  appId: '1:294037826120:web:45ec69e5c25e48e7a3c67d',
  measurementId: 'G-JH3F85GZT8'
});

const messaging = firebase.messaging(); //eslint-disable-line

messaging.onBackgroundMessage((payload) => {
  const { data } = payload;
  console.log('background notification', data);
  const { title, body, image, url } = data;
  const options = { body, data: { url }, image, actions: [{ action: 'open_url', title: '¡Echa un vistazo!' }] };
  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function (event) {
  clients.openWindow(event.notification.data.url); // eslint-disable-line
  return event.notification.close();
}
, false);
