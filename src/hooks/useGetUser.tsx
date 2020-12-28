import { useEffect, useState } from 'react';
// files
import { FireUser, User } from '../utils/interfaces';
import { db } from '../configs/firebaseConfig';

export default function useGetUser(userContext: FireUser) {
  const userRef = db.collection('users').doc(userContext.uid);

  const [userDetail, setUserDetail] = useState<null | User>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    // setIsLoading(true);
    const userSnap = await userRef.get();

    const userData = {
      ...userSnap.data(),
      id: userContext.uid,
    };

    setUserDetail(userData as User);
    // setIsLoading(false);
  }

  return [userDetail];
  // return [userDetail, isLoading];
}
