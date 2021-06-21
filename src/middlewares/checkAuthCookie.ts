/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { verify, TokenExpiredError } from 'jsonwebtoken'

const checkAuthCookie =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    verify(
      req.cookies.auth,
      process.env.MY_SECRET_KEY,
      async (err, decoded) => {
        // 401 -> Unauthorized error
        if (err instanceof TokenExpiredError) {
          res.status(401).json({
            error: true,
            name: 'TokenExpiredError',
            message: 'Unauthorized! Access token was expired',
          })
          return
        } else if (err && !decoded) {
          res.status(401).json({
            error: true,
            name: 'NotAuthenticated',
            message: 'Unauthorized! You are not authenticated',
          })
          return
        }

        // next()
        return await fn(req, res)
      }
    )
  }

export default checkAuthCookie
