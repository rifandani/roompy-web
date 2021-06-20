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

  // SECTION POST /api/auth/register
  if (req.method === 'POST') {
    // NOTE: id from firebase auth client
    const { id, username, email } = req.body

    try {
      // check if the user.id is already exists
      const userRef = await db.collection('users').doc(id).get()
      const userIsExists = userRef.exists

      if (!userIsExists) {
        // ANCHOR POST error => client error ---------------------------------------------
        res.status(400).json({ error: true, message: 'Id is already exists' })
        return
      }

      /* ------------------- save to firestore users collection ------------------- */
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

      /* ------------------- set JWT token to cookie in headers ------------------- */
      setCookie({ sub: id }, res)

      // ANCHOR POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: 'Register success',
      })
    } catch (err) {
      // capture exception sentry
      await captureException(err)

      // ANCHOR server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
  } else {
    // ANCHOR client error => Method Not Allowed -----------------------------------------------------------------
    res.status(405).json({ error: true, message: 'Only support POST req' })
  }
}

export default yupMiddleware(registerApiSchema, handler)
