import Cors from 'cors'
// files
import withYupConnect from 'middlewares/withYupConnect'
import nc from 'middlewares/nc'
import setCookie from 'utils/setCookie'
import { db, nowMillis } from 'configs/firebaseConfig'
import { registerApiSchema, TRegisterApi } from 'utils/yup/apiSchema'

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['POST'],
    })
  )
  .use(withYupConnect(registerApiSchema)) // yup middleware
  .post(async (req, res) => {
    // id from firebase auth client
    const { id, username, email } = req.body as TRegisterApi

    // check if the user.id is already exists
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

    // save to firestore users collection
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
  })
