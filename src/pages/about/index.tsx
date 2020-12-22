// files
import NavAbout from '../../components/about/NavAbout';
import Teams from '../../components/about/Teams';
import Contact from '../../components/about/Contact';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div className="bg-white">
      <NavAbout />

      <Teams />

      <Contact />

      <Footer />
    </div>
  );
}
