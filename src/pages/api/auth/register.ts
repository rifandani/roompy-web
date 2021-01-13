import { NextApiRequest, NextApiResponse } from 'next';
// files
import setCookie from '../../../utils/setCookie';
import { db } from '../../../configs/firebaseConfig';

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // destructure request body form
    const { id, username, email } = req.body;

    // TODO: clean/filter req.body

    try {
      // save to firestore Users collection
      await db.collection('users').doc(id).set({
        createdAt: Date.now(),
        email,
        favorites: [],
        messagesFrom: [],
        messagesTo: [],
        postedRoompies: [],
        postedRooms: [],
        premium: false,
        premiumUntil: 0,
        token: '',
        updatedAt: Date.now(),
        username,
      });

      // set JWT token to cookie in headers
      setCookie({ sub: id }, res);

      // register SUCCESS --------------------------
      res.status(201).json({
        error: false,
        message: 'User created successfully',
      });
    } catch (err) {
      res
        .status(500)
        .json({ error: true, name: err.name, message: err.message, err }); // register ERROR
    }
  } else {
    // error => invalid req method
    res.status(405).json({ error: true, message: 'Only support POST req' });
  }
}
