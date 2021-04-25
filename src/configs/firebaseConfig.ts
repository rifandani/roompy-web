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
export const serverTimestamp = app.firestore.FieldValue.serverTimestamp()
export const nowMillis = app.firestore.Timestamp.now().toMillis()
export const emailAuthProvider = app.auth.EmailAuthProvider

/*
 *
 *  implement firebase messaging
 *
 */
import 'firebase/messaging'
import localforage from 'localforage'

export const initFCM = async () => {
  try {
    // get fcmToken from localforage
    const fcmToken = await localforage.getItem<string>('fcmToken')

    // kalau fcmToken sudah ada di localforage
    if (fcmToken !== null) return false

    // inisiasi fcm
    const messaging = app.messaging()

    // request notifikasi permission
    const permission = await Notification.requestPermission()
    console.log('permission', permission.valueOf())

    // get token from fcm
    const token = await messaging.getToken()
    console.log('token', token)

    // set fcmToken to localforage
    const forageResult = await localforage.setItem('fcmToken', token)
    console.log('forageResult', forageResult)

    // messaging.onMessage((payload) => {
    //   console.log('messaging.onMessage => ', payload)
    // })

    // messaging.onBackgroundMessage((payload) => {
    //   console.log(
    //     '[firebase-messaging-sw.js] Received background message ',
    //     payload
    //   )

    //   // Customize notification here
    //   const notificationTitle = 'Background Message Title'
    //   const notificationOptions = {
    //     body: 'Background Message body.',
    //     icon: '/rifandani.png',
    //   }

    //   // @ts-ignore
    //   self.registration.showNotification(notificationTitle, notificationOptions)
    // })
  } catch (error) {
    console.error(error)
  }
}
