import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import { adminMessaging } from '../../../configs/firebaseAdmin'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'],
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // GET req => /testing/fcm
  if (req.method === 'GET') {
    try {
      // GET success => OK +++++++++++++++++++++++++++++++
      res.status(500).json({
        error: false,
        message: 'Success',
      })
    } catch (err) {
      // server error => Internal Server Error ---------------------------------------
      res.status(500).json({
        error: true,
        name: err.name,
        message: err.message,
      })
    }
    // POST req => /testing/fcm
  } else if (req.method === 'POST') {
    try {
      const { token, notification, data, webpush, android } = req.body // destructure body

      if (webpush) {
        // Send a message to the web
        const messageIdWeb = await adminMessaging.send({
          token,
          notification,
          data,
          webpush,
        })

        // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        return res.status(201).json({ error: false, messageId: messageIdWeb })
      }

      // Send a message to android device
      const messageIdAndroid = await adminMessaging.send({
        token,
        notification,
        data,
        android,
      })

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      return res.status(201).json({ error: false, messageId: messageIdAndroid })
    } catch (err) {
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
