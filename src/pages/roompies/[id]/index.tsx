import { GetStaticPaths, GetStaticProps } from 'next';
// files
import { db } from '../../../configs/firebaseConfig';
import { Roompy } from '../../../utils/interfaces';
import Nav from '../../../components/profile/Nav';

export default function RoompyPage({ roompy }: { roompy: Roompy }) {
  return (
    <>
      <Nav />

      <pre className="mt-30">{JSON.stringify(roompy, null, 4)}</pre>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params?.id as string;

  const docSnap = await db.collection('roompies').doc(id).get();
  const roompy = {
    ...docSnap.data(),
    id,
  };

  return {
    props: {
      roompy,
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
