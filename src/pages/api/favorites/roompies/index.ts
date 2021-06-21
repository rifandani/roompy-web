import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'
// files
import captureException from 'utils/sentry/captureException'
import initMiddleware from 'middlewares/initMiddleware'
import withYup from 'middlewares/withYup'
import { User } from 'utils/interfaces'
import { getAsString } from 'utils/getAsString'
import { favRoompiesApiSchema, TFavRoompiesApi } from 'utils/yup/apiSchema'
import { db, nowMillis } from 'configs/firebaseConfig'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'DELETE'],
  })
)

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    await cors(req, res) // run cors

    if (req.method === 'GET') {
      /* -------------------------------------------------------------------------- */
      /*                GET req => /favorites/roompies?userId=userId                */
      /* -------------------------------------------------------------------------- */

      const userId = getAsString(req.query.userId)

      // get user from firestore
      const userSnap = await db.collection('users').doc(userId).get()

      // append id, and casting as User
      const dbUser = {
        ...userSnap.data(),
        id: userSnap.id,
      } as User

      // get all favorited roompies
      const favoritedRoompies = dbUser.favorites.roompies
      const favRoompies = []

      if (favoritedRoompies.length > 0) {
        for (const roompyId of favoritedRoompies) {
          const roompySnap = await db.collection('roompies').doc(roompyId).get()

          favRoompies.push({
            ...roompySnap.data(),
            id: roompySnap.id,
          })
        }
      }

      // GET success => OK +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({ error: false, user: dbUser, favRoompies })
    } else if (req.method === 'POST') {
      /* -------------------------------------------------------------------------- */
      /*                       POST req => /favorites/roompies                      */
      /* -------------------------------------------------------------------------- */

      const { userId, roompyId } = req.body as TFavRoompiesApi

      const userRef = db.collection('users').doc(userId) // user ref

      // get user
      const userSnap = await userRef.get()
      const user = {
        ...userSnap.data(),
        id: userSnap.id,
      } as User

      // add favorited roompies to user document
      const prevFavRoompies = user.favorites.roompies
      const isAlreadyExists = prevFavRoompies.includes(roompyId)

      // kalau roompyId sudah ada di list
      if (isAlreadyExists) {
        res.status(400).json({
          error: true,
          message: `${roompyId} is already exists in the favorites list`,
        })
        return
      }

      // update user's favorites
      await userRef.update({
        favorites: {
          roompies: [...prevFavRoompies, roompyId],
        },
      })

      // POST success => Created +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(201).json({
        error: false,
        message: 'Success adding to the favorites list',
      })
    } else if (req.method === 'DELETE') {
      /* -------------------------------------------------------------------------- */
      /*      DELETE req => /favorites/roompies?userId=userId&roompyId=roompyId     */
      /* -------------------------------------------------------------------------- */

      const userId = getAsString(req.query.userId)
      const roompyId = getAsString(req.query.roompyId)

      const userRef = db.collection('users').doc(userId) // user ref

      // get user
      const userSnap = await userRef.get()
      const user = {
        ...userSnap.data(),
        id: userSnap.id,
      } as User

      // delete favorited roompies from user document
      const favRoompies = user.favorites.roompies
      const filteredFavRoompies = favRoompies.filter(
        (favId) => favId !== roompyId
      )

      // kalau favRoompies tidak ada isinya
      if (favRoompies.length === 0) {
        res.status(400).json({
          error: true,
          message: 'Favorited roompies is already empty, please check again!',
        })
      }

      // update user's favorites
      await userRef.update({
        favorites: {
          roompies: filteredFavRoompies,
        },
        updatedAt: nowMillis,
      })

      // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({
        error: false,
        message: 'Favorited roompies deleted successfully',
      })
    } else {
      // client error => Method Not Allowed -----------------------------------------------------------------
      res.status(405).json({
        error: true,
        name: 'METHOD NOT ALLOWED',
        message: 'Only support GET, POST, DELETE req',
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

export default withYup(favRoompiesApiSchema, handler)
