import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
// files
import UserContext from '../contexts/UserContext';
import { FireUser } from '../utils/interfaces';

function useCheckUser() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useContext(UserContext);
  const { push } = useRouter();

  async function checkUser() {
    if (!user) {
      setIsLoading(true);
      await push('/', '/', { shallow: true });
      return toast.error('You are not authenticated');
    }

    setIsLoading(false);
  }

  useEffect(() => {
    checkUser();
  }, []);

  return [user, isLoading] as [FireUser, boolean];
}

export default useCheckUser;
