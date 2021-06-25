// files
import NavPricing from 'components/pricing/NavPricing'
import Pricing from 'components/pricing/Pricing'
import Footer from 'components/Footer'

export default function PricingPage(): JSX.Element {
  return (
    <div className="bg-white">
      <NavPricing />

      <Pricing />

      <Footer />
    </div>
  )
}
