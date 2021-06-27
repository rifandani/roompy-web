import { useEffect, useState } from 'react'
// files
import { User } from 'utils/interfaces'
import { db } from 'configs/firebaseConfig'

export default function useGetUser(userId: string): readonly [User] {
  const userRef = db.collection('users').doc(userId)

  const [userDetail, setUserDetail] = useState<null | User>(null)
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    // setIsLoading(true);
    const userSnap = await userRef.get()

    const userData = {
      ...userSnap.data(),
      id: userId,
    } as User

    setUserDetail(userData)
    // setIsLoading(false);
  }

  return [userDetail] as const
  // return [userDetail, isLoading];
}
