import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import Cors from 'cors'
// files
import initMiddleware from '../../../middlewares/initMiddleware'

const cors = initMiddleware(
  Cors({
    methods: ['GET'],
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  if (req.method === 'GET') {
    // remove cookies from request header by setting it to 0
    res.setHeader(
      'Set-Cookie',
      serialize('auth', '', {
        httpOnly: true, // klo true berarti client side javascript can't access our cookies (PENTING)
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0), // here we set expires to 0
        path: '/',
      })
    )

    // res.writeHead(302, { Location: '/api/auth/login' });
    // res.end();

    // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, message: 'Logout success' })
  } else {
    // client error => Method Not Allowed -----------------------------------------------------------------
    res.status(405).json({ error: true, message: 'Only support GET req' })
  }
}
