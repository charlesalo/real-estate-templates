import HomeValuationForm from '@/components/lead-tools/HomeValuationForm'
import MortgageCalculator from '@/components/lead-tools/MortgageCalculator'

export const metadata = {
  title: 'Home Valuation',
  description: 'Find out what your home is worth. Get a free, no-obligation home valuation from Victoria Sinclair.',
}

export default function HomeValuationPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      {/* Header */}
      <div className="border-b border-white/10 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-3 font-sans">Free Service</p>
          <h1 className="font-heading text-4xl lg:text-5xl font-normal text-white mb-3">
            What Is Your Home Worth?
          </h1>
          <p className="text-white/50 text-base max-w-xl">
            Receive a discreet, no-obligation market analysis from Victoria within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Valuation form */}
          <div>
            <h2 className="font-heading text-2xl font-normal text-white mb-8">
              Get Your Estimate
            </h2>
            <HomeValuationForm template="luxury-agent" />
          </div>

          {/* Why it matters + mortgage calc */}
          <div className="space-y-12">
            <div>
              <h2 className="font-heading text-2xl font-normal text-white mb-6">
                Why an Accurate Valuation Matters
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: 'Price It Right the First Time',
                    body: 'Overpriced homes sit on the market and ultimately sell for less. A precise valuation ensures you capture maximum value from day one.',
                  },
                  {
                    title: 'Understand Your Equity',
                    body: 'Whether you\'re refinancing, planning a move, or simply curious, knowing your home\'s current market value is essential financial intelligence.',
                  },
                  {
                    title: 'Off-Market Opportunities',
                    body: 'Victoria\'s network of discreet buyers means your home may sell before it ever goes public — preserving your privacy and timeline.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-5 h-px bg-[#C9A96E] mt-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-white text-sm font-medium mb-1">{item.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-normal text-white mb-6">
                Mortgage Calculator
              </h2>
              <MortgageCalculator template="luxury-agent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
