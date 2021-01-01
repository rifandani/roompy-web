import { GetServerSideProps } from 'next';
import { verify } from 'jsonwebtoken';
// files
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import CreateRoompies from '../../../components/createRoompies/CreateRoompies';
import { db } from '../../../configs/firebaseConfig';
import { User } from '../../../utils/interfaces';

export interface CreateRoompiesProps {
  user: User;
}

export default function CreateRoompiesPage({ user }) {
  return (
    <div className="">
      <DashboardLayout ver2>
        <CreateRoompies user={user} />
      </DashboardLayout>
    </div>
  );
}

// You should not use fetch() to call an API route in getServerSideProps. Instead, directly import the logic used inside your API route
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = ctx.req.headers?.cookie;
  const authCookie = cookie?.replace('auth=', ''); // get only the cookie

  // kalau auth cookie kosong
  if (!authCookie) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    // decoded === payload { sub: user.uid }
    const decoded = verify(authCookie!, process.env.MY_SECRET_KEY);

    // get user from firestore
    const userSnap = await db
      .collection('users')
      .doc((decoded as { sub: string })?.sub)
      .get();

    const user = {
      ...userSnap.data(),
      id: userSnap.id,
    };

    return {
      props: {
        user,
      },
    };
  } catch (err) {
    // kalau auth cookie ada tapi tidak valid / verify error
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
