'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

const PersonIcon = () => (
  <svg className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
)

const MailIcon = () => (
  <svg className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3h3m-3 3h3" />
  </svg>
)

const fieldCls = 'flex items-center gap-3 px-4 py-3 rounded-lg bg-white border border-[#D5DBE9] focus-within:border-[#1A2D5A] transition-colors'
const inputCls = 'flex-1 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none bg-transparent'

export default function ModernTeamNewsletterForm({ consentId = 'newsletter-consent' }) {
  const [fields, setFields] = useState({ name: '', email: '', phone: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fields.email) return
    setLoading(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: 'Newsletter Subscription — Hargrove Group',
          ...fields,
        }),
      })
      const json = await res.json()
      if (json.success) setSent(true)
    } catch {}
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="py-12 flex flex-col items-start gap-4">
        <CheckCircle size={32} className="text-[#1A2D5A]" strokeWidth={1.5} />
        <p className="font-bold text-[#111827] text-lg" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>You're subscribed!</p>
        <p className="text-sm text-[#6B7280] font-sans leading-relaxed">
          Thanks for joining. We'll send you Houston market updates and new listing alerts.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className={fieldCls}>
        <PersonIcon />
        <input type="text" placeholder="Name" className={inputCls} value={fields.name} onChange={e => setFields(f => ({ ...f, name: e.target.value }))} />
      </div>
      <div className={fieldCls}>
        <MailIcon />
        <input type="email" placeholder="Email" required className={inputCls} value={fields.email} onChange={e => setFields(f => ({ ...f, email: e.target.value }))} />
      </div>
      <div className={fieldCls}>
        <PhoneIcon />
        <input type="tel" placeholder="Phone" className={inputCls} value={fields.phone} onChange={e => setFields(f => ({ ...f, phone: e.target.value }))} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-[#1A2D5A] text-white text-sm font-semibold rounded-lg hover:bg-[#243870] transition-colors disabled:opacity-50"
      >
        {loading ? 'Subscribing…' : 'Subscribe'}
      </button>

      <div className="flex items-start gap-3 pt-1">
        <input type="checkbox" required id={consentId} className="mt-0.5 w-3.5 h-3.5 flex-shrink-0 accent-[#1A2D5A]" />
        <label htmlFor={consentId} className="text-[12px] text-[#9CA3AF] font-sans leading-relaxed">
          I agree to be contacted by The Hargrove Group via email for market updates and real estate information. You can unsubscribe at any time.
        </label>
      </div>
    </form>
  )
}
