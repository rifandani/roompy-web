import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import axios from 'axios'
import * as admin from 'firebase-admin'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import yupMiddleware from '../../../middlewares/yupMiddleware'
import { fcmApiSchema } from '../../../utils/yup/apiSchema'
import captureException from '../../../utils/sentry/captureException'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'],
  })
)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // firebase-admin
  let serviceAccount: object

  if (!admin.apps.length) {
    const serviceAccountResponse = await axios.get(
      process.env.SERVICE_ACCOUNT_LINK!
    )
    serviceAccount = serviceAccountResponse?.data

    // Initialize firebase admin default app
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIRE_DATABASE_URL!,
    })
  }

  // GET req => /fcm
  if (req.method === 'GET') {
    try {
      // GET success => OK +++++++++++++++++++++++++++++++
      res.status(200).json({
        error: false,
        message: 'Success',
        data: serviceAccount,
      })
    } catch (err) {
      // server error => Internal Server Error ---------------------------------------
      res.status(500).json({
        error: true,
        name: err.name,
        message: err.message,
      })
    }
    // POST req => /fcm
  } else if (req.method === 'POST') {
    try {
      const { token, notification, data, webpush, android } = req.body // destructure body

      if (webpush) {
        // Send a message to the web
        const messageIdWeb = await admin.messaging().send({
          token,
          notification,
          data,
          webpush,
        })

        // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(201).json({ error: false, messageId: messageIdWeb })
        return
      }

      // Send a message to android device
      const messageIdAndroid = await admin.messaging().send({
        token,
        notification,
        data,
        android,
      })

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, messageId: messageIdAndroid })
    } catch (err) {
      // capture exception sentry
      await captureException(err)

      // POST server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
  } else {
    // client error => Method Not Allowed
    res
      .status(405)
      .json({ error: true, message: 'Only support GET and POST req' })
  }
}

export default yupMiddleware(fcmApiSchema, handler)
