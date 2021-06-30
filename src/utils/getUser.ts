import { db } from 'configs/firebaseConfig'
import { User, DocDataRef, DocDataSnap } from './interfaces'

interface Return {
  user: User
  userRef: DocDataRef
  userSnap: DocDataSnap
}

export default async function getUser(userId: string): Promise<Return> {
  // get user ref
  const userRef = db.collection('users').doc(userId)

  // get user snap
  const userSnap = await userRef.get()

  const user = {
    ...userSnap.data(),
    id: userSnap.id,
  } as User

  return { user, userRef, userSnap }
}
