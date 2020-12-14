import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBf1dnAqc9N7EPGxXCtysVE-96oLcNNHIg',
  authDomain: 'roompy-roompies.firebaseapp.com',
  projectId: 'roompy-roompies',
  storageBucket: 'roompy-roompies.appspot.com',
  messagingSenderId: '963030164384',
  appId: '1:963030164384:web:85ab56de068fb7d44a7ac5',
  measurementId: 'G-VCE8864BGF',
};

app.initializeApp(firebaseConfig);

export const db = app.firestore();
export const auth = app.auth();
export const storage = app.storage();
export const timestamp = app.firestore.FieldValue.serverTimestamp;
