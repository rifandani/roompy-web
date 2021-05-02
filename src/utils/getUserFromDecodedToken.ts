// files
import { db } from '../configs/firebaseConfig'
import { User } from './interfaces'

interface IDecoded {
  sub: string
  iat?: number
  exp?: number
}

export default async function getUserFromDecodedToken(decoded: IDecoded) {
  // ref
  const userRef = db.collection('users').doc(decoded.sub)

  // get roompy
  const userSnap = await userRef.get()

  const user = {
    ...userSnap.data(),
    id: userSnap.id,
  }

  return { user: user as User, userRef: userRef }
}
