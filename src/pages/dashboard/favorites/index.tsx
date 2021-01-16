import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Loader from 'react-loader-spinner';
import { verify } from 'jsonwebtoken';
// files
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import FavoritesContent from '../../../components/favorites/FavoritesContent';
import { db } from '../../../configs/firebaseConfig';
import { User } from '../../../utils/interfaces';

export interface FavoritesPageProps {
  dbUser: User;
}

export default function FavoritesPage({ dbUser }: FavoritesPageProps) {
  // hooks
  const [busy, setBusy] = useState<boolean>(false);

  return (
    <div className="">
      {busy ? (
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
          <FavoritesContent setBusy={setBusy} dbUser={dbUser} />
        </DashboardLayout>
      )}
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

    const dbUser = {
      ...userSnap.data(),
      id: userSnap.id,
    };

    return {
      props: {
        dbUser,
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
