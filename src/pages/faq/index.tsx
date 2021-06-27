// files
import NavFAQ from 'components/faq/NavFAQ'
import FAQ from 'components/faq/FAQ'
import Footer from 'components/Footer'

export default function FAQPage(): JSX.Element {
  return (
    <div className="bg-white">
      <NavFAQ />

      <FAQ />

      <Footer />
    </div>
  )
}
