import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withYupConnect from 'middlewares/withYupConnect'
import { Roompy, User } from 'utils/interfaces'
import { getAsString } from 'utils/getAsString'
import { db, nowMillis } from 'configs/firebaseConfig'
import { favRoompiesApiSchema, TFavRoompiesApi } from 'utils/yup/apiSchema'

export default nc
  .use(withCors(['GET', 'POST', 'DELETE']))
  .use(withYupConnect(favRoompiesApiSchema)) // yup middleware
  /* ------------------------ GET => /api/favorites/roompies?userId=userId ------------------------ */
  .get('/api/favorites/roompies', async (req, res) => {
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
    const favRoompies = [] as Roompy[]

    if (favoritedRoompies.length > 0) {
      for (const roompyId of favoritedRoompies) {
        const roompySnap = await db.collection('roompies').doc(roompyId).get()

        favRoompies.push({
          ...roompySnap.data(),
          id: roompySnap.id,
        } as Roompy)
      }
    }

    // GET success => OK +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, user: dbUser, favRoompies })
  })
  /* ------------------------------- POST => /api/favorites/roompies ------------------------------ */
  .post('/api/favorites/roompies', async (req, res) => {
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
  })
  /* -------------- DELETE => /api/favorites/roompies?userId=userId&roompyId=roompyId ------------- */
  .delete('/api/favorites/roompies', async (req, res) => {
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
  })
