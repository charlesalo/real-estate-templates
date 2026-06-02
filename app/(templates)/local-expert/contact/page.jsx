'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react'
import { AGENT } from '@/lib/local-expert-data'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: '', interest: '', disclosure: false,
  })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Phase 1: console.log — Phase 2: POST /api/contact + Resend
    console.log('[LocalExpert] Contact:', form)
    setSent(true)
  }

  return (
    <>
      <section className="pt-[112px] pb-[64px] lg:pt-[144px] lg:pb-[80px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 lg:gap-24 items-start">

            {/* Left: info */}
            <div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-4">Contact</p>
              <h1
                className="text-[40px] lg:text-[54px] font-normal text-[#24180F] leading-[1.05] mb-6"
                style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
              >
                Let&apos;s start<br />the conversation.
              </h1>
              <p className="text-[17px] text-[#1B3B2B]/55 leading-relaxed max-w-md mb-10">
                Tell me what you&apos;re thinking. I respond within a few hours — usually sooner.
              </p>

              <div className="space-y-5">
                <a href={`tel:${AGENT.phone}`} className="flex items-center gap-3 text-[15px] text-[#1B3B2B] hover:opacity-60 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-[#1B3B2B]/8 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-[#1B3B2B]" />
                  </div>
                  {AGENT.phone}
                </a>
                <a href={`mailto:${AGENT.email}`} className="flex items-center gap-3 text-[15px] text-[#1B3B2B] hover:opacity-60 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-[#1B3B2B]/8 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-[#1B3B2B]" />
                  </div>
                  {AGENT.email}
                </a>
                <div className="flex items-start gap-3 text-[15px] text-[#1B3B2B]/50">
                  <div className="w-10 h-10 rounded-full bg-[#1B3B2B]/8 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-[#1B3B2B]" />
                  </div>
                  <div>
                    <p className="text-[#1B3B2B] font-medium">{AGENT.brokerage}</p>
                    <p className="text-[#1B3B2B]/40">{AGENT.brokerageAddress}</p>
                    <p className="text-[#1B3B2B]/30 text-[11px] mt-1">{AGENT.brokerageLicense}</p>
                  </div>
                </div>
              </div>

              {/* NYS agency disclosure */}
              <div className="mt-12 p-5 rounded-xl border border-[#E5E0D8] bg-[#F4F0EA]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1B3B2B]/40 mb-2">
                  NYS Agency Disclosure
                </p>
                <p className="text-[11px] text-[#1B3B2B]/45 leading-relaxed">
                  New York State law requires real estate licensees who are acting as agents of buyers or sellers
                  of property to advise the potential buyers or sellers with whom they work of the nature of their
                  agency relationship. Before you begin working with a licensed real estate agent, please make sure
                  you understand who the agent is representing. Ask whether the licensee is acting for the seller,
                  the buyer, or both as a dual agent. The disclosure form is available upon request.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-2xl p-8 border border-[#E5E0D8]" style={{ backgroundColor: 'white' }}>
              {sent ? (
                <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
                  <CheckCircle size={40} className="text-[#8B9E8B]" />
                  <div>
                    <h3
                      className="text-xl font-normal text-[#24180F]"
                      style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                    >
                      Message received.
                    </h3>
                    <p className="text-[15px] text-[#1B3B2B]/50 mt-2">
                      I&apos;ll be in touch within a few hours. Talk soon.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2
                      className="text-[18px] font-normal text-[#24180F] mb-1"
                      style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                    >
                      Send a message
                    </h2>
                    <p className="text-[12px] text-[#1B3B2B]/40">All fields marked * are required.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#1B3B2B]/40 mb-1.5">Name *</label>
                      <input
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#1B3B2B] placeholder-[#1B3B2B]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#1B3B2B]/40 mb-1.5">Phone</label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(917) 555-0100"
                        className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#1B3B2B] placeholder-[#1B3B2B]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#1B3B2B]/40 mb-1.5">Email *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#1B3B2B] placeholder-[#1B3B2B]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#1B3B2B]/40 mb-1.5">I&apos;m interested in</label>
                    <select
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#1B3B2B] focus:outline-none focus:border-[#1B3B2B]/30 bg-white transition-colors"
                    >
                      <option value="">Select one...</option>
                      <option>Buying a home in NYC</option>
                      <option>Selling my current home</option>
                      <option>Renting (referral only)</option>
                      <option>Market information / report</option>
                      <option>General inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#1B3B2B]/40 mb-1.5">Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about what you're looking for — neighborhood, timeline, budget, questions..."
                      className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#1B3B2B] placeholder-[#1B3B2B]/25 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors resize-none"
                    />
                  </div>

                  {/* NYS First Point of Contact */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="disclosure"
                      required
                      checked={form.disclosure}
                      onChange={handleChange}
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-[#1B3B2B]"
                    />
                    <span className="text-[10.5px] text-[#1B3B2B]/40 leading-relaxed">
                      I acknowledge receipt of the{' '}
                      <strong className="text-[#1B3B2B]/55">NYS Disclosure Form for Buyers and Sellers of Real Property</strong>
                      {' '}(First Point of Contact disclosure — required under New York State Department of State regulations). *
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-[13px] font-bold rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
