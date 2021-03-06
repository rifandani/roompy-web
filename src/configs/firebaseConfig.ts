// this all available in client-side
import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// NOTE: without null assertion might be error
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIRE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIRE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIRE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIRE_DATABASE_URL,
}

if (!app.apps.length) {
  app.initializeApp(firebaseConfig)
}

export const db = app.firestore()
export const auth = app.auth()
export const storage = app.storage()
export const realDB = app.database()
export const nowMillis = app.firestore.Timestamp.now().toMillis() // isEqual(Date.now()) === firestoreTimestamp, ternyata sama saja valuenya
export const firestoreTimestamp = app.firestore.FieldValue.serverTimestamp() // hanya untuk firestore field value ketika di set() atau update()
export const databaseTimestamp = app.database.ServerValue.TIMESTAMP // hanya untuk di realtime database field value
export const emailAuthProvider = app.auth.EmailAuthProvider

/*
 *
 *  implement firebase messaging
 *
 */
import 'firebase/messaging'
import localforage from 'localforage'

export const initFCM = async (): Promise<void> => {
  try {
    // get fcmToken from localforage
    const fcmToken = await localforage.getItem<string>('fcmToken')

    // kalau fcmToken sudah ada di localforage
    if (fcmToken !== null) return

    // inisiasi fcm
    const messaging = app.messaging()

    // request notifikasi permission
    const permission = await Notification.requestPermission()
    console.info('permission', permission.valueOf())

    // get token from fcm
    const token = await messaging.getToken()
    console.info('token', token)

    // set fcmToken to localforage
    const forageResult = await localforage.setItem('fcmToken', token)
    console.info('forageResult', forageResult)

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
