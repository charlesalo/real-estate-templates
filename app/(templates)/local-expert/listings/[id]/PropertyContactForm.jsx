'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Phone, CheckCircle } from 'lucide-react'

export default function PropertyContactForm({ listing, agent }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in ${listing.address}. Please send more information.`,
    disclosure: false,
  })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:       form.name,
          email:      form.email,
          phone:      form.phone,
          message:    `Property: ${listing.address}\n\n${form.message}`,
          leadSource: 'Local Expert - Property Inquiry',
          formType:   'contact',
        }),
      })
      const json = await res.json()
      if (json.success) {
        setSent(true)
      } else {
        setSubmitError(json.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-[#E5E0D8] overflow-hidden" style={{ backgroundColor: 'white' }}>
      {/* Agent card */}
      <div className="p-5 border-b border-[#E5E0D8] flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image src={agent.photo} alt={agent.name} fill className="object-cover" />
        </div>
        <div>
          <p className="text-[15px] font-bold text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
            {agent.name}
          </p>
          <p className="text-[12px] text-[#24180F]/40">{agent.brokerage}</p>
          <a href={`tel:${agent.phone}`} className="flex items-center gap-1 text-[12px] text-[#2C1E11]/55 hover:text-[#BA5B3E] transition-colors mt-0.5">
            <Phone size={10} /> {agent.phone}
          </a>
        </div>
      </div>

      {/* Form */}
      <div className="p-5">
        {sent ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle size={32} className="text-[#8B9E8B]" />
            <p className="text-[15px] font-bold text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
              I&apos;ll be in touch soon.
            </p>
            <p className="text-[13px] text-[#24180F]/45">Usually within a few hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-[14px] font-semibold text-[#2C1E11] mb-4">
              Interested in this property?
            </p>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name *"
              className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#2C1E11] placeholder-[#2C1E11]/30 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors"
            />
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Email *"
              className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#2C1E11] placeholder-[#2C1E11]/30 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors"
            />
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#2C1E11] placeholder-[#2C1E11]/30 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors"
            />
            <textarea
              name="message"
              rows={3}
              value={form.message}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-[13px] border border-[#E5E0D8] rounded-lg text-[#2C1E11] placeholder-[#2C1E11]/30 focus:outline-none focus:border-[#1B3B2B]/30 transition-colors resize-none"
            />
            {/* NYS First Point of Contact */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="disclosure"
                required
                checked={form.disclosure}
                onChange={handleChange}
                className="mt-0.5 h-3 w-3 flex-shrink-0 accent-[#1B3B2B]"
              />
              <span className="text-[9.5px] text-[#2C1E11]/35 leading-relaxed">
                I acknowledge receipt of the NYS Disclosure Form for Buyers and Sellers (First Point of Contact — required by NYS DOS). *
              </span>
            </label>
            {submitError && (
              <p className="text-red-500 text-[13px]">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 text-[13px] font-bold rounded-full bg-[#1B3B2B] text-[#F8F3EB] hover:bg-[#2a5540] transition-colors disabled:opacity-50"
            >
              {submitting ? 'Sending…' : 'Request Information'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
