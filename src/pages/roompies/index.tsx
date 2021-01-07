import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Loader from 'react-loader-spinner';
// files
import RoompiesComp from '../../components/roompies/RoompiesComp';
import { db } from '../../configs/firebaseConfig';
import { RoompiesProps } from '../../utils/interfaces';

export default function RoompiesPage({ roompies }: RoompiesProps) {
  const [busy, setBusy] = useState<boolean>(false);

  if (busy) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loader
          type="ThreeDots"
          color="Purple"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-200">
      {/* <Nav />
      <Search />
      <Footer /> */}

      <RoompiesComp roompies={roompies} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // render pertama kali
  if (Object.keys(ctx.query).length === 0) {
    const snap = await db
      .collection('roompies')
      .orderBy('createdAt', 'desc')
      .limit(12)
      .get();

    const roompiesData = snap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return {
      props: {
        roompies: roompiesData,
      },
    };
  }

  const { gender, sub } = ctx.query;

  return {
    props: {
      roompies: [],
    },
  };
};
