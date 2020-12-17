// import Head from 'next/head';
// files
import NavHome from '../components/NavHome';
import Steps from '../components/Steps';
import ContentHome from '../components/ContentHome';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function IndexPage() {
  return (
    <div className="w-full h-full">
      <NavHome />

      <Steps />

      <ContentHome />

      <CTA />

      <Footer />
    </div>
  );
}
