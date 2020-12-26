import { GetStaticPaths, GetStaticProps } from 'next';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// files
import Nav from '../../../components/Nav';
import RoompyDetail from '../../../components/profile/RoompyDetail';
import Footer from '../../../components/Footer';
import { db } from '../../../configs/firebaseConfig';
import { RoompyProps } from '../../../utils/interfaces';

export default function RoompyPage({ roompy }: RoompyProps) {
  // const [roompy, setRoompy] = useState(null);
  // const { query } = useRouter(); // object { id: string }

  // useEffect(() => {
  //   getRoompy();
  // }, []);

  // async function getRoompy() {
  //   const roompyRef = db.collection('roompies').doc(query.id! as string);
  //   const roompySnap = await roompyRef.get();

  //   setRoompy({
  //     ...roompySnap.data(),
  //     id: query.id!,
  //   });
  // }

  return (
    <div className="w-full min-h-screen">
      <Nav />

      {/* {roompy && <RoompyDetail roompy={roompy} />} */}
      <RoompyDetail roompy={roompy} />

      <Footer footer2 />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  let id: string | string[];

  if (Array.isArray(ctx.params?.id)) {
    id = ctx.params?.id[0];
  } else {
    id = ctx.params?.id;
  }

  const roompiesRef = db.collection('roompies').doc(id);
  const roompiesSnap = await roompiesRef.get();

  const roompy = {
    ...roompiesSnap.data(),
    id,
  };

  return {
    props: {
      roompy: {
        ...roompy,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const docSnap = await db.collection('roompies').get();
  const paths = docSnap.docs.map((doc) => ({
    params: { id: doc.id },
  }));

  // We'll pre-render only these paths at build time.
  return {
    paths,
    fallback: false, // means other routes should 404
  };
};
