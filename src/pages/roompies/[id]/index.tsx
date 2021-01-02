import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
// files
import Nav from '../../../components/Nav';
import RoompyDetail from '../../../components/profile/RoompyDetail';
import Footer from '../../../components/Footer';
import { db } from '../../../configs/firebaseConfig';
import { RoompyProps } from '../../../utils/interfaces';

export default function RoompyPage({ roompy }: RoompyProps) {
  const { isFallback } = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (isFallback) {
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
    <div className="w-full min-h-screen">
      <Nav />

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
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 3 second
    revalidate: 3, // In seconds
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
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true, // means other routes should not be 404
  };
};
