import * as admin from 'firebase-admin'

let defaultApp: admin.app.App

if (!admin.apps.length) {
  // Initialize the default app
  defaultApp = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.NEXT_PUBLIC_FIRE_DATABASE_URL!,
  })
}

// Retrieve services via the defaultApp variable...
export const adminMessaging = admin.messaging()
