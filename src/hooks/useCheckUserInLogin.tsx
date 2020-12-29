import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
// files
import UserContext from '../contexts/UserContext';

function useCheckUserInLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useContext(UserContext);
  const { push } = useRouter();

  async function checkUserInLogin() {
    if (user) {
      await push('/');
      setIsLoading(false);
      return toast.error('You are already logged in');
    }

    setIsLoading(false);
  }

  let timeout: NodeJS.Timeout;
  useEffect(() => {
    timeout = setTimeout(() => {
      checkUserInLogin();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [user]);

  return [user, isLoading];
}

export default useCheckUserInLogin;
