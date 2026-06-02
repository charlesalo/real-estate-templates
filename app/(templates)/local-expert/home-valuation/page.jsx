'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { AGENT } from '@/lib/local-expert-data'

const STEPS = ['Address', 'Property Details', 'Contact Info']

export default function HomeValuationPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    address: '',
    beds: '',
    baths: '',
    sqft: '',
    condition: '',
    name: '',
    email: '',
    phone: '',
    disclosure: false,
  })
  const [done, setDone] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Phase 1: console.log — Phase 2: POST /api/valuation + Resend
    console.log('[LocalExpert] Home valuation:', data)
    setDone(true)
  }

  return (
    <section className="pt-[112px] pb-[64px] lg:pt-[144px] lg:pb-[80px]" style={{ backgroundColor: '#F8F3EB' }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-16 lg:gap-24 items-start">

          {/* Left: copy */}
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-4">Market Intelligence</p>
            <h1
              className="text-[40px] lg:text-[54px] font-normal text-[#24180F] leading-[1.05] mb-5"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              What is your home actually worth?
            </h1>
            <p className="text-[17px] text-[#1B3B2B]/55 leading-relaxed mb-8 max-w-md">
              Not a Zillow estimate. A real, hand-annotated analysis from a broker who sold 240 homes
              in these exact neighborhoods. Takes 60 seconds to request. Free.
            </p>
            <ul className="space-y-3">
              {[
                'Comparable sales from the last 90 days',
                'Off-market comps you won\'t find online',
                'Board package analysis (co-ops)',
                'Current buyer demand for your unit type',
                'Delivered within 24 hours',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[15px] text-[#1B3B2B]/60">
                  <CheckCircle size={15} className="text-[#8B9E8B] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl border border-[#E5E0D8] overflow-hidden" style={{ backgroundColor: 'white' }}>
            {done ? (
              <div className="flex flex-col items-center gap-5 p-12 text-center">
                <CheckCircle size={40} className="text-[#8B9E8B]" />
                <div>
                  <h2
                    className="text-[22px] font-normal text-[#24180F]"
                    style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                  >
                    Your estimate is being prepared.
                  </h2>
                  <p className="text-[15px] text-[#1B3B2B]/50 mt-2">
                    I&apos;ll contact you within 24 hours with a full market analysis.
                  </p>
                </div>
                <Link
                  href="/local-expert"
                  className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#1B3B2B]/40 hover:text-[#1B3B2B] transition-colors"
                >
                  Back to home <ArrowRight size={12} />
                </Link>
              </div>
            ) : (
              <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); setStep(s => s + 1) }}>
                {/* Step indicator */}
                <div className="px-7 pt-7 pb-5 border-b border-[#E5E0D8]">
                  <div className="flex items-center gap-2 mb-1">
                    {STEPS.map((s, i) => (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${i <= step ? 'bg-[#1B3B2B] text-white' : 'bg-[#E5E0D8] text-[#1B3B2B]/30'}`}>
                          {i < step ? '✓' : i + 1}
                        </div>
                        {i < STEPS.length - 1 && <div className={`h-px w-8 transition-colors ${i < step ? 'bg-[#1B3B2B]' : 'bg-[#E5E0D8]'}`} />}
                      </div>
                    ))}
                  </div>
                  <p className="text-[13px] font-bold text-[#1B3B2B] mt-3">{STEPS[step]}</p>
                </div>

                <div className="p-7 space-y-4">
                  {step === 0 && (
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#1B3B2B]/40 mb-1.5">Property Address *</label>
                      <input
                        name="address"
                        required
                        value={data.address}
                        onChange={handleChange}
                        placeholder="147 Perry Street, West Village, NY 10014"
                        className="w-full px-3 py-3 text-[13px] border border-[#E5E0D8] rounded-lg text-[#1B3B2B] placeholder-[#1B3B2B]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors"
                      />
                    </div>
                  )}

                  {step === 1 && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-[#1B3B2B]/40 mb-1.5">Bedrooms</label>
                          <select name="beds" value={data.beds} onChange={handleChange} className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#1B3B2B] focus:outline-none bg-white">
                            <option value="">Select</option>
                            {['Studio', '1', '2', '3', '4', '5+'].map(v => <option key={v}>{v}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-[#1B3B2B]/40 mb-1.5">Bathrooms</label>
                          <select name="baths" value={data.baths} onChange={handleChange} className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#1B3B2B] focus:outline-none bg-white">
                            <option value="">Select</option>
                            {['1', '1.5', '2', '2.5', '3', '3.5', '4+'].map(v => <option key={v}>{v}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#1B3B2B]/40 mb-1.5">Square Footage (approx.)</label>
                        <input name="sqft" type="number" value={data.sqft} onChange={handleChange} placeholder="e.g. 1400" className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#1B3B2B] placeholder-[#1B3B2B]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#1B3B2B]/40 mb-1.5">Property Condition</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Excellent', 'Good', 'Fair', 'Needs Work'].map((c) => (
                            <button key={c} type="button" onClick={() => setData(p => ({ ...p, condition: c }))}
                              className={`py-2.5 text-[12px] font-medium rounded-lg border transition-colors ${data.condition === c ? 'bg-[#1B3B2B] text-white border-[#1B3B2B]' : 'border-[#E5E0D8] text-[#1B3B2B]/60 hover:border-[#1B3B2B]/30'}`}>
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#1B3B2B]/40 mb-1.5">Full Name *</label>
                        <input name="name" required value={data.name} onChange={handleChange} placeholder="Your name" className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#1B3B2B] placeholder-[#1B3B2B]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#1B3B2B]/40 mb-1.5">Email *</label>
                        <input name="email" type="email" required value={data.email} onChange={handleChange} placeholder="your@email.com" className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#1B3B2B] placeholder-[#1B3B2B]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#1B3B2B]/40 mb-1.5">Phone</label>
                        <input name="phone" type="tel" value={data.phone} onChange={handleChange} placeholder="(917) 555-0100" className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#1B3B2B] placeholder-[#1B3B2B]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors" />
                      </div>
                      {/* NYS First Point of Contact */}
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input type="checkbox" name="disclosure" required checked={data.disclosure} onChange={handleChange} className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-[#1B3B2B]" />
                        <span className="text-[10px] text-[#1B3B2B]/40 leading-relaxed">
                          I acknowledge receipt of the <strong className="text-[#1B3B2B]/55">NYS Disclosure Form for Buyers and Sellers of Real Property</strong> (First Point of Contact — required by NYS DOS). *
                        </span>
                      </label>
                    </>
                  )}

                  <div className="flex gap-3 pt-2">
                    {step > 0 && (
                      <button type="button" onClick={() => setStep(s => s - 1)} className="px-5 py-3 text-[12px] text-[#1B3B2B]/50 hover:text-[#1B3B2B] transition-colors">
                        ← Back
                      </button>
                    )}
                    <button
                      type="submit"
                      className="flex-1 py-3 text-[13px] font-bold rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] transition-colors"
                    >
                      {step < 2 ? 'Continue →' : 'Get My Estimate'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
