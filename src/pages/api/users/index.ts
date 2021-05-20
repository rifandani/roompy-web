import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import axios from 'axios'
// files
import initMiddleware from '../../../middlewares/initMiddleware'
import { db, nowMillis } from '../../../configs/firebaseConfig'
import getUser from '../../../utils/getUser'
import { getAsString } from '../../../utils/getAsString'
import captureException from '../../../utils/sentry/captureException'
import yupMiddleware from '../../../middlewares/yupMiddleware'
import { usersApiSchema } from '../../../utils/yup/apiSchema'

// Initialize the cors middleware, more available options here: https://github.com/expressjs/cors#configuration-options
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'PUT', 'DELETE'],
  })
)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res) // run cors

  const usersRef = db.collection('users')

  // GET req => /users & /users?id=userId
  if (req.method === 'GET') {
    try {
      // if there is no query === get ALL users
      if (Object.keys(req.query).length === 0) {
        // get all users
        const usersSnap = await usersRef.get()
        const users = usersSnap.docs.map((el) => ({
          ...el.data(),
          id: el.id,
        }))

        // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // res.setHeader('Cache-Control', 'public, max-age=900, max-stale=604800') // tambahin cache untuk android
        res.status(200).json(users)
      } else {
        // get user
        const { user } = await getUser(req)

        // kalau query.id tidak valid
        if (!user.username) {
          res
            .status(400)
            .json({ error: true, message: 'Invalid query user id' })
          return
        }

        // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        res.status(200).json(user)
      }
    } catch (err) {
      // capture exception sentry
      await captureException(err)

      // GET server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    // PUT req => /users?id=userId
  } else if (req.method === 'PUT') {
    try {
      // get request query and body
      const userId = getAsString(req.query.id)
      const { username, email } = req.body

      // update user document
      const userRef = usersRef.doc(userId)
      await userRef.update({
        username,
        email,
        updatedAt: nowMillis,
      })

      // PUT success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res
        .status(201)
        .json({ error: false, message: 'User updated successfully' })
    } catch (err) {
      // capture exception sentry
      await captureException(err)

      // PUT server error => Internal Server Error -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
    // DELETE req => /users?id=userId
  } else if (req.method === 'DELETE') {
    try {
      const { user, userRef } = await getUser(req)

      // can not delete premium user
      if (user.premium) {
        // DELETE client error => Bad Request -----------------------------------------------------------------
        res.status(400).json({
          error: true,
          message: 'You can not delete a premium user',
          user,
        })
        return
      }

      // delete all posted ROOMPIES + ROOMS
      const postedRoompies = user.postedRoompies
      // const postedRooms = user.postedRooms;

      if (postedRoompies.length > 0) {
        for (const roompyId of postedRoompies) {
          const resp = await axios.delete(`/roompies?id=${roompyId}`)

          if (resp.status !== 200) {
            res.status(500).json(resp)
            return
          }
        }
      }

      // if (postedRooms.length > 0) {
      // for (const roomId of postedRooms) {
      //   const resp = await axios.delete(`/rooms?id=${roomId}`);

      //   if (resp.status !== 200) {
      //     return res.status(500).json(resp)
      //   }
      // }
      // }

      // delete in users collection
      await userRef.delete()

      // DELETE success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      res.status(200).json({
        error: false,
        message: 'User deleted successfully',
      })
    } catch (err) {
      // capture exception sentry
      await captureException(err)

      // DELETE ERROR -----------------------------------------------------------------
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message })
    }
  } else {
    // client error => Method Not Allowed
    res
      .status(405)
      .json({ error: true, message: 'Only support GET, PUT and DELETE req' })
  }
}

export default yupMiddleware(usersApiSchema, handler)
