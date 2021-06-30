import axios from 'axios'
import * as admin from 'firebase-admin'
// files
import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withYupConnect from 'middlewares/withYupConnect'
import { fcmApiSchema, TFcmApi } from 'utils/yup/apiSchema'

export default nc
  .use(withCors(['POST']))
  .use(withYupConnect(fcmApiSchema)) // yup middleware
  /* -------------------------------------- POST => /api/fcm -------------------------------------- */
  .post('/api/fcm', async (req, res) => {
    // setting up firebase-admin
    let serviceAccount: admin.ServiceAccount

    if (!admin.apps.length) {
      const serviceAccountResponse = await axios.get(
        process.env.SERVICE_ACCOUNT_LINK
      )
      serviceAccount = serviceAccountResponse?.data

      // Initialize firebase admin default app
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIRE_DATABASE_URL,
      })
    }

    const { token, notification, data, webpush, android } = req.body as TFcmApi

    // Send a message to the web
    if (webpush) {
      const messageIdWeb = await admin.messaging().send({
        webpush,
        token,
        data,
        notification,
      })

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, messageId: messageIdWeb })
      return
    }

    // Send a message to android device
    const messageIdAndroid = await admin.messaging().send({
      android,
      token,
      data,
      notification,
    })

    // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({ error: false, messageId: messageIdAndroid })
  })
