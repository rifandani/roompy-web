import Loader from 'react-loader-spinner';
// files
import useCheckUser from '../../hooks/useCheckUser';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardContent from '../../components/dashboard/DashboardContent';

export default function DashboardPage() {
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
          <DashboardContent user={user} />
        </DashboardLayout>
      )}
    </div>
  );
}
