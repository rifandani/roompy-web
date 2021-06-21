import Cors from 'cors'
import axios from 'axios'
import * as admin from 'firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import withYup from 'middlewares/withYup'
import initMiddleware from 'middlewares/initMiddleware'
import captureException from 'utils/sentry/captureException'
import { fcmApiSchema, TFcmApi } from 'utils/yup/apiSchema'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    await cors(req, res) // Run cors

    /* ------------------------ setting up firebase-admin ----------------------- */
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

    if (req.method === 'POST') {
      /* -------------------------------------------------------------------------- */
      /*                              POST req => /fcm                              */
      /* -------------------------------------------------------------------------- */

      const { token, notification, data, webpush, android } =
        req.body as TFcmApi

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
    } else {
      // client error => Method Not Allowed -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only support POST req',
      })
    }
  } catch (err) {
    // capture exception sentry
    await captureException(err)

    // server error => Internal Server Error -----------------------------------------------------------------
    res.status(500).json({
      error: true,
      name: err.name,
      message: err.message,
    })
  }
}

export default withYup(fcmApiSchema, handler)
