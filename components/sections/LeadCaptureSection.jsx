'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s().+\-]{7,20}$/

function validate(form) {
  const errors = {}
  if (!form.name.trim() || form.name.trim().length < 2) errors.name = 'Please enter your full name.'
  if (!EMAIL_RE.test(form.email)) errors.email = 'Please enter a valid email address.'
  if (form.phone && !PHONE_RE.test(form.phone)) errors.phone = 'Please enter a valid phone number.'
  return errors
}

export default function LeadCaptureSection({
  agentName = 'Victoria Sinclair',
  image = '/images/luxury-agent/lead-capture.jpg',
  bottomGap = false,
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [consent, setConsent] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!consent) return
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, interest: 'Off-Market Listings' }),
    }).catch(() => {})
    setLoading(false)
    setSent(true)
  }

  const inputCls = (field) =>
    `w-full bg-transparent border-b text-white text-sm py-3 outline-none placeholder:text-white/25 transition-colors font-sans ${
      errors[field] ? 'border-red-400/70' : 'border-white/15 focus:border-[#C9A96E]'
    }`

  return (
    <section className={`bg-[#0D0D0D] overflow-hidden relative ${bottomGap ? 'pb-20 lg:pb-28' : ''}`}>

      {/* Right image — full-bleed */}
      <div className={`absolute top-0 right-0 w-1/2 hidden lg:block ${bottomGap ? 'bottom-20 lg:bottom-28' : 'bottom-0'}`}>
        <Image
          src={image}
          alt=""
          fill
          sizes="50vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/40 to-transparent" />
      </div>

      {/* Left content — aligned to max-w-7xl grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 min-h-[520px]">

          {/* ── Left: form ───────────────────────────────── */}
          <div className="flex flex-col justify-center py-16 lg:py-28 lg:pr-16">

            <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A96E] mb-6 font-sans">
              Exclusive Access
            </p>

            <h2 className="font-heading text-4xl lg:text-5xl font-normal text-white leading-[1.05] mb-6">
              Get Access to My<br />Private Listings
            </h2>

            <div className="w-12 h-px bg-[#C9A96E] mb-6" />

            <p className="text-white/45 font-sans text-sm lg:text-base leading-relaxed mb-10 max-w-sm">
              Be the first to receive exclusive and off-market properties before they hit the public market.
            </p>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-4 py-6"
                >
                  <CheckCircle size={22} className="text-[#C9A96E] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-heading text-xl text-white mb-1">You&apos;re on the list.</p>
                    <p className="text-white/45 text-sm font-sans">
                      {agentName} will be in touch with exclusive opportunities soon.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className={inputCls('name')}
                      value={form.name}
                      onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(err => ({ ...err, name: undefined })) }}
                    />
                    {errors.name && <p className="mt-1.5 text-[10px] text-red-400/80 font-sans">{errors.name}</p>}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className={inputCls('email')}
                      value={form.email}
                      onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(err => ({ ...err, email: undefined })) }}
                    />
                    {errors.email && <p className="mt-1.5 text-[10px] text-red-400/80 font-sans">{errors.email}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number (optional)"
                      className={inputCls('phone')}
                      value={form.phone}
                      onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(err => ({ ...err, phone: undefined })) }}
                    />
                    {errors.phone && <p className="mt-1.5 text-[10px] text-red-400/80 font-sans">{errors.phone}</p>}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={e => setConsent(e.target.checked)}
                      className="mt-0.5 flex-shrink-0 accent-[#C9A96E]"
                    />
                    <span className="text-[10px] text-white/30 font-sans leading-relaxed">
                      I agree to be contacted by {agentName} via call, email, and text for real estate services.
                      To opt out, reply &apos;stop&apos; at any time. Message and data rates may apply.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!consent || loading}
                    className="w-full py-4 border border-[#C9A96E] text-[#C9A96E] bg-transparent text-[11px] tracking-[0.25em] uppercase font-semibold font-sans hover:bg-[#C9A96E] hover:text-[#0A0A0A] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting…' : 'Get Exclusive Access'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
