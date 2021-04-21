import { NextApiRequest, NextApiResponse } from 'next'
import validator from 'validator'
import Cors from 'cors'
// files
import setCookie from '../../../utils/setCookie'
import { db, nowMillis } from '../../../configs/firebaseConfig'
import initMiddleware from '../../../middlewares/initMiddleware'

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
      // kalau input kosong
      return res.status(400).json({
        error: true,
        message: 'Please input all fields',
      })
    } else if (typeof id !== 'string') {
      // kalau input id tidak berupa string
      return res.status(400).json({
        error: true,
        message: 'Should be a valid string id from firebase uid',
      })
    } else if (!validator.isLength(username, { min: 3 })) {
      // kalau input email tidak berupa valid email address
      return res.status(400).json({
        error: true,
        message: 'Username should be minimal 3 characters',
      })
    } else if (!validator.isEmail(email)) {
      // kalau input email tidak berupa valid email address
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

      // register SUCCESS --------------------------
      res.status(201).json({
        error: false,
        message: 'User created successfully',
      })
    } catch (err) {
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message, err }) // register ERROR
    }
  } else {
    // error => invalid req method
    res.status(405).json({ error: true, message: 'Only support POST req' })
  }
}
