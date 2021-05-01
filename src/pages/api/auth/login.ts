import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import setCookie from '../../../utils/setCookie'
import initMiddleware from '../../../middlewares/initMiddleware'
import captureException from '../../../utils/sentry/captureException'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res) // Run cors

  if (req.method === 'POST') {
    // destructure request body form
    const { id } = req.body

    // validate client req.body
    if (!id) {
      // GET client error => Bad Request -----------------------------------------------------------------
      res.status(400).json({
        error: true,
        message: 'Please input all fields',
      })
      return
    } else if (typeof id !== 'string') {
      // GET client error => Bad Request -----------------------------------------------------------------
      res.status(400).json({
        error: true,
        message: 'Should be a valid string id from firebase uid',
      })
      return
    }

    try {
      // set JWT token to cookie in headers
      setCookie({ sub: id }, res)

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, message: 'Login success.' })
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
    res.status(405).json({ error: true, message: 'Only support POST req' })
  }
}
