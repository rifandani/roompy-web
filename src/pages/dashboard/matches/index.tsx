import Loader from 'react-loader-spinner';
// files
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import useCheckUser from '../../../hooks/useCheckUser';

export default function MatchesPage() {
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
          <div>Matches</div>
        </DashboardLayout>
      )}
    </div>
  );
}
