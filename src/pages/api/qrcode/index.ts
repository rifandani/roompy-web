import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import QRCode from 'qrcode'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import yupMiddleware from '../../../middlewares/yupMiddleware'
import { qrcodeApiSchema } from '../../../utils/yup/apiSchema'
import captureException from '../../../utils/sentry/captureException'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST'],
  })
)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // GET /api/qrcode
  if (req.method === 'GET') {
    try {
      // generate QRcode
      const url = 'https://roompy.vercel.app'
      const qrcodeUrl = await QRCode.toDataURL(url)

      // GET success => OK +++++++++++++++++++++++++++++++
      res.status(200).json({
        error: false,
        message: `QRcode for URL: ${url}`,
        url: qrcodeUrl,
      })
    } catch (err) {
      // server error => Internal Server Error ---------------------------------------
      res.status(500).json({
        error: true,
        name: err.name,
        message: err.message,
      })
    }
    // POST /api/qrcode
  } else if (req.method === 'POST') {
    try {
      // generate qrcode based on url
      const { url } = req.body
      const qrcodeUrl = await QRCode.toDataURL(url)

      // POST success => Created +++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: `QRcode for URL: ${url}`,
        url: qrcodeUrl,
      })
    } catch (err) {
      // capture exception sentry
      await captureException(err)

      // server error => Internal Server Error ---------------------------------------
      res.status(500).json({
        error: true,
        name: err.name,
        message: err.message,
      })
    }
  } else {
    // client error => Method Not Allowed
    res.status(405).json({ error: true, message: 'Only support GET and POST' })
  }
}

// apply yup middleware
export default yupMiddleware(qrcodeApiSchema, handler)
