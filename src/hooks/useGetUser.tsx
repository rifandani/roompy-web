import { useEffect, useState } from 'react';
// files
import { User } from '../utils/interfaces';
import { db } from '../configs/firebaseConfig';

export default function useGetUser(userUid: string) {
  const userRef = db.collection('users').doc(userUid);

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
      id: userUid,
    };

    setUserDetail(userData as User);
    // setIsLoading(false);
  }

  return [userDetail];
  // return [userDetail, isLoading];
}
