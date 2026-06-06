'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Phone, Mail, MapPin, CheckCircle } from 'lucide-react'

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName:  z.string().min(1, 'Required'),
  email:     z.string().email({ message: 'Invalid email' }),
  phone:     z.string().optional(),
  message:   z.string().min(10, 'Please write at least a brief message'),
})

function IconInstagram() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
}
function IconFacebook() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}
function IconLinkedIn() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
}

export default function ModernTeamContactModal({
  agentName   = 'The Hargrove Group',
  agentDre    = '',
  phone       = '(713) 555-0182',
  email       = 'hello@hargrovegroup.com',
  address     = '1700 Post Oak Blvd, Suite 600\nHouston, TX 77056',
  socialLinks = {},
}) {
  const [open, setOpen] = useState(false)
  const [sent, setSent]  = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    const handler = () => { setOpen(true); setSent(false) }
    window.addEventListener('contact:open', handler)
    return () => window.removeEventListener('contact:open', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const close = () => { setOpen(false); setTimeout(() => { setSent(false); reset() }, 400) }

  const onSubmit = async (data) => {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY, ...data }),
      })
      const json = await res.json()
      if (json.success) setSent(true)
    } catch {}
  }

  const inputCls =
    'w-full bg-transparent border border-[#D5DBE9] text-[#111827] text-sm px-4 py-3 rounded-lg outline-none placeholder:text-[#9CA3AF] focus:border-[#1A2D5A] transition-colors'
  const labelCls = 'block text-[12px] tracking-[0.2em] uppercase text-[#6B7280] mb-1.5 font-sans'
  const errorCls = 'text-red-500 text-xs mt-1 font-sans'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mt-contact-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0F1E3E]/60 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl [&::-webkit-scrollbar]:hidden [scrollbar-width:none] grid lg:grid-cols-2"
          >

            {/* ── Left — Form (light) ─────────────────────────── */}
            <div className="bg-white px-8 py-10 lg:px-12 lg:py-12">

              {/* Header */}
              <div className="mb-8">
                <p className="text-[12px] tracking-[0.3em] uppercase text-[#4B6090] font-sans mb-2">
                  We'd love to hear from you
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2D5A] tracking-tight leading-tight">
                  Get in Touch
                </h2>
              </div>

              {sent ? (
                <div className="py-16 text-center">
                  <CheckCircle size={48} className="text-[#1A2D5A] mx-auto mb-5" strokeWidth={1.25} />
                  <h3 className="text-xl font-semibold text-[#1A2D5A] mb-2">Message Sent!</h3>
                  <p className="text-[#6B7280] text-sm font-sans">
                    We'll be in touch within 24 hours.
                  </p>
                  <button
                    onClick={close}
                    className="mt-8 text-[12px] tracking-[0.2em] uppercase text-[#9CA3AF] hover:text-[#1A2D5A] font-sans transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>First Name</label>
                      <input {...register('firstName')} type="text" placeholder="Jane" className={inputCls} />
                      {errors.firstName && <p className={errorCls}>{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Last Name</label>
                      <input {...register('lastName')} type="text" placeholder="Smith" className={inputCls} />
                      {errors.lastName && <p className={errorCls}>{errors.lastName.message}</p>}
                    </div>
                  </div>

                  {/* Email + Phone row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Email</label>
                      <input {...register('email')} type="email" placeholder="jane@example.com" className={inputCls} />
                      {errors.email && <p className={errorCls}>{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input {...register('phone')} type="tel" placeholder="(713) 555-0100" className={inputCls} />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelCls}>Message</label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      placeholder="Tell us what you're looking for…"
                      className={`${inputCls} resize-none`}
                    />
                    {errors.message && <p className={errorCls}>{errors.message.message}</p>}
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      id="mt-consent"
                      className="mt-0.5 w-4 h-4 rounded border-[#D5DBE9] accent-[#1A2D5A] flex-shrink-0"
                    />
                    <label htmlFor="mt-consent" className="text-[12px] text-[#9CA3AF] font-sans leading-relaxed">
                      I agree to be contacted by {agentName} via call, email, and text for real estate services. Message and data rates may apply.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#1A2D5A] text-white text-[12px] tracking-[0.25em] uppercase font-semibold rounded-lg hover:bg-[#243870] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending…' : 'Submit'}
                  </button>
                </form>
              )}
            </div>

            {/* ── Right — Contact details (navy) ──────────────── */}
            <div className="relative bg-[#1A2D5A] px-8 py-10 lg:px-12 lg:py-12 flex flex-col">

              {/* Close button */}
              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all"
              >
                <X size={16} strokeWidth={2} />
              </button>

              {/* Team name */}
              <div className="mb-10 mt-2">
                <p className="text-[12px] tracking-[0.3em] uppercase text-[#7B93C5] font-sans mb-2">
                  Contact Details
                </p>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  {agentName}
                </h3>
                {agentDre && (
                  <p className="text-xs text-white/40 font-sans mt-1">{agentDre}</p>
                )}
              </div>

              {/* Contact info */}
              <div className="space-y-6 flex-1">
                {[
                  { Icon: Phone,  label: 'Phone',   value: phone,   href: `tel:${phone.replace(/\D/g,'')}` },
                  { Icon: Mail,   label: 'Email',   value: email,   href: `mailto:${email}` },
                  { Icon: MapPin, label: 'Address', value: address, href: null },
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={13} className="text-[#7B93C5]" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-[12px] tracking-[0.3em] uppercase text-white/35 font-sans mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-white/70 hover:text-white transition-colors font-sans whitespace-pre-line">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-white/70 font-sans whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social icons */}
              {(socialLinks.instagram || socialLinks.facebook || socialLinks.linkedin) && (
                <div className="flex items-center gap-2 mt-10">
                  {[
                    { key: 'facebook',  href: socialLinks.facebook,  Icon: IconFacebook },
                    { key: 'instagram', href: socialLinks.instagram, Icon: IconInstagram },
                    { key: 'linkedin',  href: socialLinks.linkedin,  Icon: IconLinkedIn },
                  ].filter(s => s.href).map(({ key, href, Icon }) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:border-white/50 hover:text-white transition-all duration-200"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              )}

              {/* Decorative bottom accent */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-[12px] text-white/25 font-sans leading-relaxed">
                  Houston's trusted real estate team. Available 7 days a week.
                </p>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
