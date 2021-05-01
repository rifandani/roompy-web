import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
// files
import initMiddleware from '../../../../middlewares/initMiddleware'
import { db, nowMillis } from '../../../../configs/firebaseConfig'
import { User } from '../../../../utils/interfaces'
import { getAsString } from '../../../../utils/getAsString'
import captureException from '../../../../utils/sentry/captureException'

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'DELETE'],
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // run cors

  // GET req => /favorites/roompies?userId=userId
  if (req.method === 'GET') {
    try {
      const userId = getAsString(req.query.userId)

      // get user from firestore
      const userSnap = await db.collection('users').doc(userId).get()

      // append id to user object
      const dbUser = {
        ...userSnap.data(),
        id: userSnap.id,
      }

      // get all favorited roompies
      const favoritedRoompies = (dbUser as User).favorites.roompies
      let favRoompies = []

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
    } catch (err) {
      // capture exception sentry
      await captureException(err)

      // GET server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    // POST req => /favorites/roompies
  } else if (req.method === 'POST') {
    try {
      const { userId, roompyId } = req.body // destructure req.body
      const userRef = db.collection('users').doc(userId) // user ref

      // get user
      const userSnap = await userRef.get()
      const user = {
        ...userSnap.data(),
        id: userSnap.id,
      }

      // add favorited roompies to user document
      const prevFavRoompies = (user as User).favorites.roompies
      const isAlreadyExists = prevFavRoompies.includes(roompyId)

      // kalau roompyId sudah ada di list
      if (isAlreadyExists) {
        // POST client error => Bad Request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message: `${roompyId} is already exists in the favorites list`,
        })
        return
      }

      // if roompyId belum ada di list
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
    } catch (err) {
      // capture exception sentry
      await captureException(err)

      // POST server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    // DELETE req => /favorites/roompies?userId=userId&roompyId=roompyId
  } else if (req.method === 'DELETE') {
    try {
      // destructuring
      const userId = getAsString(req.query.userId)
      const roompyId = getAsString(req.query.roompyId)
      const userRef = db.collection('users').doc(userId) // user ref

      // get user
      const userSnap = await userRef.get()
      const user = {
        ...userSnap.data(),
        id: userSnap.id,
      }

      // delete favorited roompies from user document
      const favRoompies = (user as User).favorites.roompies
      const filteredFavRoompies = favRoompies.filter(
        (favId) => favId !== roompyId
      )

      // kalau favRoompies tidak ada isinya
      if (favRoompies.length === 0) {
        // DELETE client error => Bad Request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message: 'Favorited roompies is already empty, please check again!',
        })
      }

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
    } catch (err) {
      // capture exception sentry
      await captureException(err)

      // DELETE server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
  } else {
    // client error => Method Not Allowed
    res
      .status(405)
      .json({ error: true, message: 'Only support GET, POST and DELETE req' })
  }
}
