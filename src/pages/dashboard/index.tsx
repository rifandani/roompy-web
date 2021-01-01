import { GetServerSideProps } from 'next';
import { verify } from 'jsonwebtoken';
// files
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardContent from '../../components/dashboard/DashboardContent';
import { db } from '../../configs/firebaseConfig';
import { Roompies, User } from '../../utils/interfaces';

export interface DashboardProps {
  user: User;
  allRoompy: Roompies | [];
}

export default function DashboardPage({ user, allRoompy }: DashboardProps) {
  return (
    <div className="">
      <DashboardLayout>
        <DashboardContent user={user} allRoompy={allRoompy} />
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

    // get user postedRoompies
    const userPostedRoompies = (user as User).postedRoompies;
    const userPostedRoompiesLength = (user as User).postedRoompies.length;
    let allRoompy = [];

    if (userPostedRoompiesLength === 0) {
      allRoompy = [];
    } else {
      for (let i = 0; i < userPostedRoompiesLength; i++) {
        // get list postedRoompies
        const postedRoompiesSnap = await db
          .collection('roompies')
          .doc(userPostedRoompies[i])
          .get();

        // push ke allRoompy array
        postedRoompiesSnap &&
          allRoompy.push({
            ...postedRoompiesSnap.data(),
            id: postedRoompiesSnap.id,
          });
      }
    }

    return {
      props: {
        user,
        allRoompy,
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
