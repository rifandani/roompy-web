import { NextApiRequest, NextApiResponse } from 'next';
// files
import setCookie from '../../../utils/setCookie';
import { auth, db } from '../../../configs/firebaseConfig';

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // destructure request body form
    const { username, email, password } = req.body;

    // TODO: clean/filter req.body

    try {
      // save to firebase auth
      const newUser = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      await newUser.user.updateProfile({ displayName: username }); // update user profile

      // save to firestore Users collection
      await db.collection('users').doc(newUser.user.uid).set({
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
      setCookie({ sub: newUser.user.uid }, res);

      // register SUCCESS --------------------------
      return res.status(201).json(newUser.user);
    } catch (err) {
      return res.status(500).json({ error: true, err }); // register ERROR
    }
  } else {
    // error => invalid req method
    return res
      .status(405)
      .json({ error: true, message: 'Only support POST req' });
  }
}
