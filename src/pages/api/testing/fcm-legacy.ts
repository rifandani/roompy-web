import Cors from 'cors'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import initMiddleware from 'middlewares/initMiddleware'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'],
  })
)

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await cors(req, res) // Run cors

  // GET req => /testing/fcm-legacy
  if (req.method === 'GET') {
    try {
      const res2 = await axios.get(process.env.SERVICE_ACCOUNT_LINK)

      const serviceAccount = res2?.data

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
    // POST req => /testing/fcm-legacy
  } else if (req.method === 'POST') {
    try {
      const { key } = req.body // destructure body

      const axiosRes = await axios.post(
        'https://fcm.googleapis.com/fcm/send',
        req.body,
        {
          headers: {
            Authorization: 'key=' + key,
          },
        }
      )

      if (axiosRes?.status !== 200) {
        // POST fail => error ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res
          .status(400)
          .json({ error: true, message: 'Error', requestBody: req.body })
      }

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, data: axiosRes?.data })
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
