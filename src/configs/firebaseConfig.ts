// this all available in client-side

import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIRE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIRE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIRE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIRE_MEASUREMENT_ID!,
  databaseURL: process.env.NEXT_PUBLIC_FIRE_DATABASE_URL!,
}

if (!app.apps.length) {
  app.initializeApp(firebaseConfig)
}

export const db = app.firestore()
export const auth = app.auth()
export const storage = app.storage()
export const realDB = app.database()
// export const fcm = app.messaging()
export const serverTimestamp = app.firestore.FieldValue.serverTimestamp()
export const nowMillis = app.firestore.Timestamp.now().toMillis()
export const emailAuthProvider = app.auth.EmailAuthProvider
