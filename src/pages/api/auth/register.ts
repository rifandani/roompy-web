import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import setCookie from '../../../utils/setCookie'
import { db, nowMillis } from '../../../configs/firebaseConfig'
import initMiddleware from '../../../middlewares/initMiddleware'
import captureException from '../../../utils/sentry/captureException'
import yupMiddleware from '../../../middlewares/yupMiddleware'
import { registerApiSchema } from '../../../utils/yup/apiSchema'

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // Run cors

  // POST /api/auth/register
  if (req.method === 'POST') {
    const { id, username, email } = req.body // destructure request body form

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

export default yupMiddleware(registerApiSchema, handler)
