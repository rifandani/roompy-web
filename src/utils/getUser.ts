import { NextApiRequest } from 'next';
// files
import { db } from '../configs/firebaseConfig';
import { getAsString } from './getAsString';
import { User } from './interfaces';

export default async function getUser(req: NextApiRequest) {
  // ref
  const userId = getAsString(req.query.id);
  const userRef = db.collection('users').doc(userId);

  // get roompy
  const userSnap = await userRef.get();

  const user = {
    ...userSnap.data(),
    id: userSnap.id,
  };

  return { user: user as User, userRef: userRef };
}
