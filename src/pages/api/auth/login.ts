import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'
import withYupConnect from 'middlewares/withYupConnect'
import getUser from 'utils/getUser'
import setAuthCookie from 'utils/setAuthCookie'
import { loginApiSchema, TLoginApi } from 'utils/yup/apiSchema'

export default nc
  // cors middleware
  .use(withCors(['POST']))
  .use(withYupConnect(loginApiSchema)) // yup middleware
  .post(async (req, res) => {
    // id from firebase auth client
    const { id } = req.body as TLoginApi

    // check if the user.id is NOT exists
    const { userSnap } = await getUser(id)

    if (!userSnap.exists) {
      // client error => user is NOT exists
      res.status(400).json({
        error: true,
        message: `User with id: ${id} is not exists`,
      })
      return
    }

    // set JWT token to cookie in headers
    setAuthCookie(
      {
        sub: id,
        iss: 'Roompy',
      },
      res
    )

    // POST success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({ error: false, message: 'Login success' })
  })
