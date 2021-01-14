import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import Cors from 'cors';
// files
import initMiddleware from '../../../middlewares/initMiddleware';

const cors = initMiddleware(
  Cors({
    methods: ['PUT'],
  }),
);

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await cors(req, res); // Run cors

  if (req.method === 'GET') {
    try {
      /* remove cookies from request header */
      res.setHeader('Set-Cookie', [
        serialize('auth', '', {
          maxAge: 1,
          path: '/',
        }),
      ]);

      // res.writeHead(302, { Location: '/api/auth/login' });
      // res.end();

      // logout SUCCESS --------------------------
      res.status(200).json({ error: false, message: 'Logout success' });
    } catch (err) {
      res.status(500).json({ error: true, err }); // logout ERROR
    }
  } else {
    // error => invalid req method
    res.status(405).json({ error: true, message: 'Only support GET req' });
  }
}
