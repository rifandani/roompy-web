import Loader from 'react-loader-spinner';
// files
import useCheckUser from '../../../hooks/useCheckUser';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';

export default function AccountPage() {
  const [user, isLoading] = useCheckUser();

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
        <DashboardLayout>
          <div>Account</div>
        </DashboardLayout>
      )}
    </div>
  );
}
