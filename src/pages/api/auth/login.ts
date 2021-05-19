import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import setCookie from '../../../utils/setCookie'
import initMiddleware from '../../../middlewares/initMiddleware'
import captureException from '../../../utils/sentry/captureException'
import yupMiddleware from '../../../middlewares/yupMiddleware'
import { loginApiSchema } from '../../../utils/yup/apiSchema'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  if (req.method === 'POST') {
    const { id } = req.body // destructure request body form

    try {
      // set JWT token to cookie in headers
      setCookie({ sub: id }, res)

      // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, message: 'Login success' })
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

export default yupMiddleware(loginApiSchema, handler)
