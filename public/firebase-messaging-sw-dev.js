importScripts( //eslint-disable-line
  'https://www.gstatic.com/firebasejs/9.9.3/firebase-app-compat.js'
);
importScripts( //eslint-disable-line
  'https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging-compat.js'
);

firebase.initializeApp({ //eslint-disable-line
  apiKey: 'AIzaSyCbhsc_gEq41n2Pf9R4KLfOz1R0y2N3JHM',
  authDomain: 'costdev-d2487.firebaseapp.com',
  projectId: 'costdev-d2487',
  storageBucket: 'costdev-d2487.appspot.com',
  messagingSenderId: '765552544332',
  appId: '1:765552544332:web:48ce2b68f340199f1442e9',
  measurementId: 'G-E4BL5RN6S6'
});

const messaging = firebase.messaging(); //eslint-disable-line

messaging.onBackgroundMessage((payload) => {
  const { data } = payload;
  console.log('background notification', data);
  const { title, body, image, url } = data;
  const options = {
    body,
    data: { url },
    image,
    actions: [{ action: 'open_url', title: '¡Echa un vistazo!' }]
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener(
  'notificationclick',
  function (event) {
    clients.openWindow(event.notification.data.url); // eslint-disable-line
    return event.notification.close();
  },
  false
);
