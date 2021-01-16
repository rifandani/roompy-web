import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Loader from 'react-loader-spinner';
import { verify } from 'jsonwebtoken';
// files
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import MatchesContent from '../../../components/matches/MatchesContent';
import { db } from '../../../configs/firebaseConfig';
import { Roompies } from '../../../utils/interfaces';

export interface MatchesPageProps {
  userId: string;
  matchRoompies: Roompies | [];
  havePostedRoompies: boolean;
}

export default function MatchesPage({
  userId,
  matchRoompies,
  havePostedRoompies,
}: MatchesPageProps) {
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
          <MatchesContent
            userId={userId}
            matchRoompies={matchRoompies}
            havePostedRoompies={havePostedRoompies}
          />
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
    const userId = (decoded as { sub: string })?.sub;

    // get all roompies
    const roompiesSnap = await db.collection('roompies').get();

    const roompies = roompiesSnap.docs.map((el) => ({
      ...el.data(),
      id: el.id,
    }));

    // userPostedRoompies
    const userPostedRoompies = (roompies as Roompies).filter(
      (el) => el.postedBy === userId,
    );

    // kalau belum ada postedRoompies
    if (userPostedRoompies.length === 0) {
      return {
        props: {
          userId,
          matchRoompies: [],
          havePostedRoompies: false,
        },
      };
    }

    // current user roompiesPreferences
    const userPref = {
      gender: userPostedRoompies[0].roompiesPref.gender,
      ageFrom: userPostedRoompies[0].roompiesPref.ageFrom,
      ageTo: userPostedRoompies[0].roompiesPref.ageTo,
      pet: userPostedRoompies[0].roompiesPref.pet,
      smoker: userPostedRoompies[0].roompiesPref.smoker,
      loc: userPostedRoompies[0].locPref,
    };

    // roompies except user postedRoompies
    const roompiesExcept = (roompies as Roompies).filter(
      (el) => el.postedBy !== userId,
    );

    // filter all roompies based on userPref
    const matchRoompies = (roompiesExcept as Roompies).filter((roompy) => {
      const isPetOkay = userPref.pet === 'Okay';
      const isSmokerOkay = userPref.smoker === 'Okay';
      const isGenderFlex = userPref.gender === 'Flex';

      const selected =
        roompy.locPref.includes(userPref.loc[0]) &&
        roompy.ownPet === isPetOkay &&
        roompy.smoker === isSmokerOkay &&
        (isGenderFlex ? true : roompy.gender === userPref.gender) &&
        roompy.age >= userPref.ageFrom &&
        roompy.age <= userPref.ageTo;

      return selected;
    });

    return {
      props: {
        userId,
        matchRoompies,
        havePostedRoompies: true,
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
