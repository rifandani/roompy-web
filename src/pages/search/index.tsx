// files
import NavSearch from '../../components/search/NavSearch';
import Search from '../../components/search/Search';
import Footer from '../../components/Footer';

export default function SearchPage() {
  return (
    <div className="bg-white">
      <NavSearch />

      <Search />

      <Footer />
    </div>
  );
}
