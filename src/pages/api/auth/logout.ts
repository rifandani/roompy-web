import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
// files
import { auth } from '../../../configs/firebaseConfig';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // logout from firebase auth
      await auth.signOut();

      /* remove cookies from request header */
      res.setHeader('Set-Cookie', [
        serialize('auth', '', {
          maxAge: -1,
          path: '/',
        }),
      ]);

      // res.writeHead(302, { Location: '/api/auth/login' });
      // res.end();

      // logout SUCCESS --------------------------
      return res.status(200).json({ error: false, message: 'Logout success' });
    } catch (err) {
      return res.status(500).json({ error: true, err }); // logout ERROR
    }
  } else {
    // error => invalid req method
    return res
      .status(405)
      .json({ error: true, message: 'Only support GET req' });
  }
}
