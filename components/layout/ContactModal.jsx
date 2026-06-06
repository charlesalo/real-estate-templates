'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Phone, Mail, MapPin, CheckCircle } from 'lucide-react'

const schema = z.object({
  fullName: z.string().min(2, 'Required'),
  email:    z.string().email({ message: 'Invalid email' }),
  phone:    z.string().optional(),
  message:  z.string().min(10, 'Please write at least a brief message'),
})

function IconInstagram() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
}
function IconFacebook() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}
function IconLinkedIn() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
}

export default function ContactModal({
  agentName    = 'Victoria Sinclair',
  agentDre     = '',
  phone        = '(310) 555-0194',
  email        = 'victoria@victoriasinclair.com',
  address      = '432 N Beverly Drive\nBeverly Hills, CA 90210',
  socialLinks  = {},
  backgroundImage = 'https://images.unsplash.com/photo-1571007667516-62962d19bebf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}) {
  const [open, setOpen] = useState(false)
  const [sent, setSent]  = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
  })

  // Listen for the global open event
  useEffect(() => {
    const handler = () => { setOpen(true); setSent(false) }
    window.addEventListener('contact:open', handler)
    return () => window.removeEventListener('contact:open', handler)
  }, [])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Escape key
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

  const inputCls = 'w-full bg-transparent border-b border-white/20 text-white text-sm py-3 outline-none placeholder:text-white/25 focus:border-[#C9A96E] transition-colors'
  const labelCls = 'block text-[12px] tracking-[0.35em] uppercase text-white/40 mb-2 font-sans'
  const errorCls = 'text-red-400 text-xs mt-1 font-sans'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="contact-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center"
        >
          {/* Background image + overlay */}
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/82" />
          </div>

          {/* Close button */}
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-6 right-6 z-10 text-white/40 hover:text-white transition-colors"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl mx-4 lg:mx-8 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
          >
            <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/15">

              {/* ── Left: Contact details ───────────────────────── */}
              <div className="px-8 py-10 lg:px-12 lg:py-14">
                <h2 className="font-heading text-2xl lg:text-3xl text-white font-normal tracking-wide mb-2">
                  Contact Details
                </h2>
                <div className="w-8 h-px bg-[#C9A96E] mb-8" />

                <p className="text-[12px] tracking-[0.4em] uppercase text-[#C9A96E] mb-8 font-sans">
                  {agentName}{agentDre ? ` | ${agentDre}` : ''}
                </p>

                <div className="space-y-7">
                  {[
                    { Icon: Phone,  label: 'Phone',   value: phone,   href: `tel:${phone.replace(/\D/g,'')}` },
                    { Icon: Mail,   label: 'Email',   value: email,   href: `mailto:${email}` },
                    { Icon: MapPin, label: 'Address', value: address, href: null },
                  ].map(({ Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <Icon size={14} className="text-[#C9A96E] flex-shrink-0 mt-1" strokeWidth={1.5} />
                      <div>
                        <p className="text-[12px] tracking-[0.35em] uppercase text-white/35 font-sans mb-1">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-white/65 hover:text-white transition-colors font-sans whitespace-pre-line">{value}</a>
                        ) : (
                          <p className="text-sm text-white/65 font-sans whitespace-pre-line">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social icons — square bordered, consistent with template */}
                {(socialLinks.instagram || socialLinks.facebook || socialLinks.linkedin) && (
                  <div className="flex items-center gap-2 mt-10">
                    {[
                      { key: 'facebook',  href: socialLinks.facebook,  Icon: IconFacebook },
                      { key: 'instagram', href: socialLinks.instagram, Icon: IconInstagram },
                      { key: 'linkedin',  href: socialLinks.linkedin,  Icon: IconLinkedIn },
                    ].filter(s => s.href).map(({ key, href, Icon }) => (
                      <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={key}
                        className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/40 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-200">
                        <Icon />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Right: Form ──────────────────────────────────── */}
              <div className="px-8 py-10 lg:px-12 lg:py-14">
                <h2 className="font-heading text-2xl lg:text-3xl text-white font-normal tracking-wide mb-2">
                  Submit a Message
                </h2>
                <div className="w-8 h-px bg-[#C9A96E] mb-8" />

                {sent ? (
                  <div className="py-12 text-center">
                    <CheckCircle size={44} className="text-[#C9A96E] mx-auto mb-5" strokeWidth={1} />
                    <h3 className="font-heading text-xl text-white mb-3">Message Received</h3>
                    <p className="text-white/45 text-sm font-sans">
                      Victoria will be in touch within 24 hours.
                    </p>
                    <button onClick={close} className="mt-8 text-[12px] tracking-[0.25em] uppercase text-white/30 hover:text-white font-sans transition-colors">
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                    <div>
                      <label className={labelCls}>Name</label>
                      <input {...register('fullName')} type="text" placeholder="Jane Smith" className={inputCls} />
                      {errors.fullName && <p className={errorCls}>{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Email</label>
                      <input {...register('email')} type="email" placeholder="jane@example.com" className={inputCls} />
                      {errors.email && <p className={errorCls}>{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input {...register('phone')} type="tel" placeholder="(310) 555-0100" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Message</label>
                      <textarea
                        {...register('message')}
                        rows={4}
                        placeholder="Tell Victoria what you're looking for…"
                        className={`${inputCls} resize-none`}
                      />
                      {errors.message && <p className={errorCls}>{errors.message.message}</p>}
                    </div>

                    <div className="flex items-start gap-3">
                      <input type="checkbox" required id="consent" className="mt-0.5 accent-[#C9A96E]" />
                      <label htmlFor="consent" className="text-[12px] text-white/30 font-sans leading-relaxed">
                        I agree to be contacted by {agentName} via call, email, and text for real estate services. Message and data rates may apply.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#C9A96E] text-[#0A0A0A] text-[12px] tracking-[0.25em] uppercase font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending…' : 'Submit'}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
