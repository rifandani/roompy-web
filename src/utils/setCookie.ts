import cookie from 'cookie'
import { sign } from 'jsonwebtoken'
import { NextApiResponse } from 'next'
// files
import { AuthCookiePayload } from './interfaces'

export default function setCookie(
  payload: AuthCookiePayload,
  res: NextApiResponse
): void {
  // sign JWT token
  const jwt = sign(payload, process.env.MY_SECRET_KEY, { expiresIn: '1h' })

  // set cookie to response header
  res.setHeader(
    'Set-Cookie',
    // seperti JSON.stringify untuk cookies
    cookie.serialize('auth', jwt, {
      httpOnly: true, // klo true berarti client side javascript can't access our cookies (PENTING)
      maxAge: 60 * 60 * 1, // 1 hour
      path: '/', // make it available everywhere, not only in /api
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      // domain: process.env.NODE_ENV !== 'development' ? 'vercel.app' : '',
    })
  )
}
