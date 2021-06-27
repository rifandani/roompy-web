import cookie from 'cookie'
import { sign } from 'jsonwebtoken'
import { NextApiResponse } from 'next'
// files
import { AuthCookiePayload } from './interfaces'

export default function setAuthCookie(
  payload: AuthCookiePayload,
  res: NextApiResponse
): void {
  // sign JWT token
  const jwt = sign(payload, process.env.MY_SECRET_KEY, { expiresIn: '3h' })

  // set cookie to response header
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('auth', jwt, {
      httpOnly: true, // klo true berarti client side javascript can't access our cookies (PENTING)
      maxAge: 60 * 60 * 3, // 3 hour
      path: '/', // make it available everywhere, not only in /api
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      // domain: process.env.NODE_ENV !== 'development' ? 'vercel.app' : '',
    })
  )
}
