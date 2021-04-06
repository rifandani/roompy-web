import admin, { ServiceAccount } from 'firebase-admin'
// import serviceAccount from './serviceAccount.json';

// firebase -> project settings -> service accounts -> firebase admin SDK
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount as ServiceAccount),
//     databaseURL: process.env.FIRE_DATABASE_URL!,
//     storageBucket: process.env.FIRE_STORAGE_BUCKET!,
//   });
// }

export const adminDb = admin.firestore()
export const adminAuth = admin.auth()
export const adminStorage = admin.storage().bucket()
