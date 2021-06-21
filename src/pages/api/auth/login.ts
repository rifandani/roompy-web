import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import setCookie from 'utils/setCookie'
import captureException from 'utils/sentry/captureException'
import initMiddleware from 'middlewares/initMiddleware'
import withYup from 'middlewares/withYup'
import { loginApiSchema, TLoginApi } from 'utils/yup/apiSchema'

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

    if (req.method === 'POST') {
      // NOTE: id from firebase auth client
      const { id } = req.body as TLoginApi

      // set JWT token to cookie in headers
      setCookie({ sub: id }, res)

      // POST success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({ error: false, message: 'Login success' })
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

export default withYup(loginApiSchema, handler)
