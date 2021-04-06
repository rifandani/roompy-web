// this all available in client-side

import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.FIRE_API_KEY!,
  authDomain: process.env.FIRE_AUTH_DOMAIN!,
  projectId: process.env.FIRE_PROJECT_ID!,
  storageBucket: process.env.FIRE_STORAGE_BUCKET!,
  messagingSenderId: process.env.FIRE_MESSAGING_SENDER_ID!,
  appId: process.env.FIRE_APP_ID!,
  measurementId: process.env.FIRE_MEASUREMENT_ID!,
  databaseURL: process.env.FIRE_DATABASE_URL!,
}

if (!app.apps.length) {
  app.initializeApp(firebaseConfig)
}

export const emailAuthProvider = app.auth.EmailAuthProvider
export const db = app.firestore()
export const auth = app.auth()
export const storage = app.storage()
export const realDB = app.database()
export const serverTimestamp = app.firestore.FieldValue.serverTimestamp
export const nowMillis = app.firestore.Timestamp.now().toMillis()
