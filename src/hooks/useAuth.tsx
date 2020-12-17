import { useState, useEffect } from 'react';
// files
import { auth } from '../configs/firebaseConfig';
import { AuthUser } from '../utils/interfaces';

function useAuth() {
  const [authUser, setAuthUser] = useState<AuthUser>(null);

  useEffect(() => {
    // triggered ketika user signed in / signed out
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // jika user signed in
        setAuthUser(user);
      } else {
        // jika user signed out
        setAuthUser(null);
      }
    });

    // cleanup
    return () => unsubscribe();
  }, []);

  return [authUser, setAuthUser];
}

export default useAuth;
