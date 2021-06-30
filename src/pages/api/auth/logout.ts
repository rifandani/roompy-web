import { serialize } from 'cookie'
// files
import nc from 'middlewares/nc'
import withCors from 'middlewares/withCors'

export default nc
  .use(withCors(['GET']))
  /* ------------------------------------ GET /api/auth/logout ------------------------------------ */
  .get('/api/auth/logout', async (_, res) => {
    // remove cookies from request header by setting its expires to 0
    res.setHeader(
      'Set-Cookie',
      serialize('auth', '', {
        httpOnly: true, // klo true berarti client side javascript can't access our cookies (PENTING)
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0), // here we set expires to 0
        path: '/',
      })
    )

    // res.writeHead(302, { Location: '/api/auth/login' });
    // res.end();

    // GET success => OK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    res.status(200).json({ error: false, message: 'Logout success' })
  })
