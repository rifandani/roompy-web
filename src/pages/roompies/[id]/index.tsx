import { GetStaticPaths, GetStaticProps } from 'next';
// files
import { db } from '../../../configs/firebaseConfig';
import { Roompy } from '../../../utils/interfaces';
import Nav from '../../../components/profile/Nav';
import RoompyDetail from '../../../components/profile/RoompyDetail';

export default function RoompyPage({ roompy }: { roompy: Roompy }) {
  return (
    <div className="w-full min-h-screen">
      <Nav />

      <RoompyDetail />
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
        // test: roompy.test.toMillis(),
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
