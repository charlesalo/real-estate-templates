'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Mail, CheckSquare } from 'lucide-react'

export default function ContactModal({ agent, open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', disclosure: false })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

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
          message:    form.message,
          leadSource: 'Local Expert - Contact Modal',
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
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[80]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          >
            <div
              className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
              style={{ backgroundColor: '#F8F3EB' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-8 pt-8 pb-6 border-b border-[#1B3B2B]/10">
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 p-1.5 text-[#2C1E11]/40 hover:text-[#2C1E11] transition-colors"
                >
                  <X size={18} />
                </button>
                <p className="text-[12px] tracking-[0.3em] uppercase text-[#8B9E8B] mb-1">Get in Touch</p>
                <h2
                  className="text-xl font-bold text-[#24180F]"
                  style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                >
                  Let&apos;s Talk Neighborhoods
                </h2>
                <p className="text-sm text-[#2C1E11]/55 mt-1.5">
                  Tell me what you&apos;re looking for — I respond within a few hours.
                </p>
              </div>

              {/* Body */}
              <div className="px-8 py-6">
                {sent ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 rounded-full bg-[#1B3B2B]/10 flex items-center justify-center mx-auto mb-4">
                      <CheckSquare size={22} className="text-[#2C1E11]" />
                    </div>
                    <h3
                      className="text-lg font-bold text-[#24180F] mb-2"
                      style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                    >
                      Message sent
                    </h3>
                    <p className="text-sm text-[#2C1E11]/55">
                      I&apos;ll be in touch within a few hours. Talk soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] text-[#2C1E11]/50 mb-1.5 uppercase tracking-wider">Name</label>
                        <input
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-sm border border-[#1B3B2B]/15 rounded-lg bg-white/60 text-[#2C1E11] placeholder-[#2C1E11]/30 focus:outline-none focus:border-[#1B3B2B]/40 transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] text-[#2C1E11]/50 mb-1.5 uppercase tracking-wider">Phone</label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          type="tel"
                          className="w-full px-3 py-2.5 text-sm border border-[#1B3B2B]/15 rounded-lg bg-white/60 text-[#2C1E11] placeholder-[#2C1E11]/30 focus:outline-none focus:border-[#1B3B2B]/40 transition-colors"
                          placeholder="(917) 555-0100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#2C1E11]/50 mb-1.5 uppercase tracking-wider">Email</label>
                      <input
                        name="email"
                        required
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-sm border border-[#1B3B2B]/15 rounded-lg bg-white/60 text-[#2C1E11] placeholder-[#2C1E11]/30 focus:outline-none focus:border-[#1B3B2B]/40 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#2C1E11]/50 mb-1.5 uppercase tracking-wider">Message</label>
                      <textarea
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-sm border border-[#1B3B2B]/15 rounded-lg bg-white/60 text-[#2C1E11] placeholder-[#2C1E11]/30 focus:outline-none focus:border-[#1B3B2B]/40 transition-colors resize-none"
                        placeholder="Which neighborhoods are you curious about?"
                      />
                    </div>

                    {/* NYS First Point of Contact Disclosure */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="disclosure"
                        required
                        checked={form.disclosure}
                        onChange={handleChange}
                        className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-[#1B3B2B]"
                      />
                      <span className="text-[10.5px] text-[#2C1E11]/45 leading-relaxed">
                        I acknowledge receipt of the{' '}
                        <strong className="font-medium text-[#2C1E11]/60">
                          NYS Disclosure Form for Buyers and Sellers of Real Property
                        </strong>{' '}
                        (First Point of Contact Disclosure — required under NYS DOS regulations).
                      </span>
                    </label>

                    {submitError && (
                      <p className="text-red-500 text-sm">{submitError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 text-[14px] font-semibold bg-[#1B3B2B] text-[#F8F3EB] rounded-full hover:bg-[#2a5540] transition-colors mt-1 disabled:opacity-50"
                    >
                      {submitting ? 'Sending…' : 'Send Message'}
                    </button>
                  </form>
                )}

                {/* Direct contact */}
                <div className="flex items-center gap-6 mt-6 pt-5 border-t border-[#1B3B2B]/10">
                  {agent?.phone && (
                    <a href={`tel:${agent.phone}`} className="flex items-center gap-1.5 text-xs text-[#2C1E11]/45 hover:text-[#2C1E11] transition-colors">
                      <Phone size={11} /> {agent.phone}
                    </a>
                  )}
                  {agent?.email && (
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-1.5 text-xs text-[#2C1E11]/45 hover:text-[#2C1E11] transition-colors">
                      <Mail size={11} /> {agent.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
