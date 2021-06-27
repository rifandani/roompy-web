import { useEffect } from 'react'
// files
import NavHome from 'components/home/NavHome'
import FeatureHome from 'components/home/FeatureHome'
import Steps from 'components/home/Steps'
import Testimonials from 'components/home/Testimonials'
import CTA from 'components/home/CTA'
import Footer from 'components/Footer'
import { initFCM } from 'configs/firebaseConfig'

export default function IndexPage(): JSX.Element {
  useEffect(() => {
    initFCM() // FCM dengan token hasil dari getToken() akan ditampilkan di halaman ini
  }, [])

  return (
    <div className="w-full h-full bg-white">
      <NavHome />

      <FeatureHome />

      <Steps />

      <Testimonials />

      <CTA />

      <Footer />
    </div>
  )
}
