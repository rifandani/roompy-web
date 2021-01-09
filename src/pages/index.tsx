// import Head from 'next/head';
// files
import NavHome from '../components/home/NavHome';
import FeatureHome from '../components/home/FeatureHome';
import Steps from '../components/home/Steps';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';
import Footer from '../components/Footer';

export default function IndexPage() {
  return (
    <div className="w-full h-full bg-white">
      <NavHome />

      <FeatureHome />

      <Steps />

      <Testimonials />

      <CTA />

      <Footer />
    </div>
  );
}
