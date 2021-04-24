import { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'
import Cors from 'cors'
// files
import setCookie from '../../../utils/setCookie'
import { db, nowMillis } from '../../../configs/firebaseConfig'
import initMiddleware from '../../../middlewares/initMiddleware'
import captureException from '../../../utils/sentry/captureException'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  if (req.method === 'POST') {
    // destructure request body form
    const { id, username, email } = req.body

    // clean/filter/validate client req.body
    if (!id || !username || !email) {
      // client error => Bad Request ----------------------------------------------------------------
      return res.status(400).json({
        error: true,
        message: 'Please input all fields',
      })
    } else if (typeof id !== 'string') {
      // client error => Bad Request ----------------------------------------------------------------
      return res.status(400).json({
        error: true,
        message: 'Should be a valid string id from firebase uid',
      })
    } else if (!validator.isLength(username, { min: 3 })) {
      // client error => Bad Request ----------------------------------------------------------------
      return res.status(400).json({
        error: true,
        message: 'Username should be minimal 3 characters',
      })
    } else if (!validator.isEmail(email)) {
      // client error => Bad Request ----------------------------------------------------------------
      return res.status(400).json({
        error: true,
        message: 'Should be a valid email address',
      })
    }

    try {
      // save to firestore Users collection
      await db
        .collection('users')
        .doc(id)
        .set({
          createdAt: nowMillis,
          email,
          favorites: {
            roompies: [],
            rooms: [],
          },
          messagesFrom: [],
          messagesTo: [],
          postedRoompies: [],
          postedRooms: [],
          premium: false,
          premiumUntil: 0,
          token: '',
          updatedAt: nowMillis,
          username,
        })

      // set JWT token to cookie in headers
      setCookie({ sub: id }, res)

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: 'Register success',
      })
    } catch (err) {
      // capture exception sentry
      await captureException(err)

      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
  } else {
    // client error => Method Not Allowed -----------------------------------------------------------------
    res.status(405).json({ error: true, message: 'Only support POST req' })
  }
}
