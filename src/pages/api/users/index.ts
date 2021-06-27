import Cors from 'cors'
import axios from 'axios'
// files
import withYupConnect from 'middlewares/withYupConnect'
import nc from 'middlewares/nc'
import getUser from 'utils/getUser'
import { getAsString } from 'utils/getAsString'
import { usersApiSchema } from 'utils/yup/apiSchema'
import { db, nowMillis } from 'configs/firebaseConfig'

const usersRef = db.collection('users')

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['GET', 'PUT', 'DELETE'],
    })
  )
  .use(withYupConnect(usersApiSchema)) // yup middleware
  /* ---------------------------- GET req => /users & /users?id=userId ---------------------------- */
  .get(async (req, res) => {
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
      return
    }

    // get query as string
    const userId = getAsString(req.query.id)

    // get user
    const { user } = await getUser(userId)

    // kalau query.id tidak valid
    if (!user.username) {
      res.status(400).json({ error: true, message: 'Invalid query user id' })
      return
    }

    // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json(user)
  })
  /* --------------------------------- PUT req => /users?id=userId -------------------------------- */
  .put(async (req, res) => {
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
    res.status(201).json({ error: false, message: 'User updated successfully' })
  })
  /* ------------------------------- DELETE req => /users?id=userId ------------------------------- */
  .delete(async (req, res) => {
    // get query as string
    const userId = getAsString(req.query.id)

    // get user
    const { user, userRef } = await getUser(userId)

    // kalau query id tidak valid
    if (!user.username) {
      res.status(400).json({
        error: true,
        message: 'Invalid query user id',
      })
      return
    }

    // query id valid, but can not delete premium user
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
  })
