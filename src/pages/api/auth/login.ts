import Cors from 'cors'
// files
import nc from 'middlewares/nc'
import withYupConnect from 'middlewares/withYupConnect'
import setCookie from 'utils/setCookie'
import { loginApiSchema, TLoginApi } from 'utils/yup/apiSchema'

export default nc
  // cors middleware
  .use(
    Cors({
      methods: ['POST'],
    })
  )
  .use(withYupConnect(loginApiSchema)) // yup middleware
  .post(async (req, res) => {
    // id from firebase auth client
    const { id } = req.body as TLoginApi

    // set JWT token to cookie in headers
    setCookie(
      {
        sub: id,
        iss: 'Roompy',
      },
      res
    )

    // POST success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(201).json({ error: false, message: 'Login success' })
  })
