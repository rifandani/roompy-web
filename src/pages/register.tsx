import Loader from 'react-loader-spinner';
// files
import RegisterComp from '../components/register/RegisterComp';
import useCheckUserInLogin from '../hooks/useCheckUserInLogin';
import { FireUser } from '../utils/interfaces';

export default function RegisterPage() {
  // hooks
  const [user, isLoading] = useCheckUserInLogin();

  return (
    <div className="">
      {isLoading ? (
        <div className="flex items-center justify-center w-full min-h-screen">
          <Loader
            type="ThreeDots"
            color="Purple"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      ) : (
        <RegisterComp user={user as FireUser} />
      )}
    </div>
  );
}
