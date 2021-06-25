import { db } from 'configs/firebaseConfig'

export default async function checkIfUserExists(
  userId: string
): Promise<boolean> {
  const userDoc = await db.collection('users').doc(userId).get()

  return userDoc.exists
}
