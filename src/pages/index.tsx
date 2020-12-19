// import Head from 'next/head';
// files
import NavHome from '../components/home/NavHome';
import Steps from '../components/home/Steps';
import ContentHome from '../components/home/ContentHome';
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
