import { db } from 'configs/firebaseConfig'
import { DocDataRef, User } from './interfaces'

interface Return {
  user: User
  userRef: DocDataRef
}

export default async function getUser(userId: string): Promise<Return> {
  // get user ref
  const userRef = db.collection('users').doc(userId)

  // get user
  const userDoc = await userRef.get()

  const user = {
    ...userDoc.data(),
    id: userDoc.id,
  } as User

  return { user, userRef }
}
