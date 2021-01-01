import { NextApiRequest, NextApiResponse } from 'next';
// files
import setCookie from '../../../utils/setCookie';
import { auth } from '../../../configs/firebaseConfig';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // destructure request body form
    const { email, password } = req.body;

    try {
      // save to firebase auth
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password,
      );

      // set JWT token to cookie in headers
      setCookie({ sub: userCredential.user.uid }, res);

      // login SUCCESS --------------------------
      return res.status(200).json(userCredential.user);
    } catch (err) {
      return res.status(500).json({ error: true, err }); // login ERROR
    }
  } else {
    // error => invalid req method
    return res
      .status(405)
      .json({ error: true, message: 'Only support POST req' });
  }
}
