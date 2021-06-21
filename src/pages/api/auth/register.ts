import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import setCookie from 'utils/setCookie'
import captureException from 'utils/sentry/captureException'
import initMiddleware from 'middlewares/initMiddleware'
import withYup from 'middlewares/withYup'
import { db, nowMillis } from 'configs/firebaseConfig'
import { registerApiSchema, TRegisterApi } from 'utils/yup/apiSchema'

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
      const { id, username, email } = req.body as TRegisterApi

      /* ----------------- check if the user.id is already exists ----------------- */
      const userRef = await db.collection('users').doc(id).get()
      const userIsExists = userRef.exists

      if (!userIsExists) {
        // client error => user already exists
        res.status(400).json({
          error: true,
          message: `User with id: ${id} is already exists`,
        })
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

      // set JWT token to cookie in headers
      setCookie({ sub: id }, res)

      // POST success => Created ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: 'Register success',
      })
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

export default withYup(registerApiSchema, handler)
