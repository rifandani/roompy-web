import { ColDataRef, ColDataSnap, User } from './interfaces'
import { db } from 'configs/firebaseConfig'

export interface GetUsersReturn {
  users: User[]
  usersRef: ColDataRef
  usersSnap: ColDataSnap
}

export async function getUsers(): Promise<GetUsersReturn> {
  // get users ref
  const usersRef = db.collection('users')

  // get users snap
  const usersSnap = await usersRef.get()

  const users = usersSnap.docs.map((user) => ({
    ...user.data(),
    id: user.id,
  })) as User[]

  return { users, usersRef, usersSnap }
}
