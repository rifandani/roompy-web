import { GetStaticProps } from 'next';
// files
import Nav from '../../components/Nav';
import Search from '../../components/roompies/Search';
import Footer from '../../components/Footer';
import { db } from '../../configs/firebaseConfig';
import { RoompiesProps } from '../../utils/interfaces';

export default function SearchPage({ roompies }: RoompiesProps) {
  return (
    <div className="bg-white">
      <Nav />

      <Search roompies={roompies} />

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // TODO: cities collection sudah tidak dipakai lagi => /postals

  // get latest roompies
  const snap = await db
    .collection('roompies')
    .orderBy('createdAt', 'desc')
    .get();

  const roompies = snap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return {
    props: {
      roompies,
    },
  };
};
