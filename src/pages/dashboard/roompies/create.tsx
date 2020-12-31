import { useContext } from 'react';
import Loader from 'react-loader-spinner';
// files
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import CreateRoompies from '../../../components/createRoompies/CreateRoompies';
import useGetUser from '../../../hooks/useGetUser';
import useCheckUser from '../../../hooks/useCheckUser';
import UserContext from '../../../contexts/UserContext';

export default function DashboardPage() {
  const { user } = useContext(UserContext);
  const [fireUser, isLoading] = useCheckUser();
  const [userDetail] = useGetUser(user);

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
        <DashboardLayout ver2>
          <CreateRoompies user={fireUser} userDetail={userDetail} />
        </DashboardLayout>
      )}
    </div>
  );
}
