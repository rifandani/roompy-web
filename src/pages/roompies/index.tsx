// files
import Nav from '../../components/Nav';
import Search from '../../components/roompies/Search';
import Footer from '../../components/Footer';
import { GetServerSideProps } from 'next';

export default function SearchPage() {
  return (
    <div className="bg-white">
      <Nav />

      <Search />

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { gender, sub } = ctx.query;

  return {
    props: {},
  };
};
