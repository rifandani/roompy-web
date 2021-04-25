/* global importScripts, firebase */
importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-messaging.js')

// inisialisasi firebase
firebase.initializeApp({
  apiKey: 'AIzaSyBf1dnAqc9N7EPGxXCtysVE-96oLcNNHIg',
  authDomain: 'roompy-roompies.firebaseapp.com',
  projectId: 'roompy-roompies',
  messagingSenderId: '963030164384',
  appId: '1:963030164384:web:85ab56de068fb7d44a7ac5',
})

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging()

// Handle messages when your web app is in the foreground.
// Called when:
// 1) a message is received while the app has focus
// 2) the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
messaging.onMessage((payload) => {
  console.log('messaging.onMessage => ', payload);
});

// Handle messages when your web app is in the background.
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/rifandani.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// code from karthik-js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (ev) => {
    console.log('code from karthik-js work => ', ev)
  })
}