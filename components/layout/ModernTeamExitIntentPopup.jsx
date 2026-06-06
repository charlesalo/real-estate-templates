'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'

const SESSION_KEY = 'modern_team_exit_popup_dismissed'

export default function ModernTeamExitIntentPopup({ teamName = 'The Hargrove Group' }) {
  const [open, setOpen]     = useState(false)
  const [email, setEmail]   = useState('')
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    let ready = false
    const readyTimer = setTimeout(() => { ready = true }, 2000)

    const onMouseMove = (e) => {
      if (!ready) return
      if (e.clientY > 8) return
      if (sessionStorage.getItem(SESSION_KEY)) return
      setOpen(true)
    }

    const mobileTimer = setTimeout(() => {
      if (!sessionStorage.getItem(SESSION_KEY)) setOpen(true)
    }, 30000)

    document.addEventListener('mousemove', onMouseMove)
    return () => {
      clearTimeout(readyTimer)
      clearTimeout(mobileTimer)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') dismiss() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, '1')
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !agreed) return
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          email,
          subject: `Exit Intent — Listing Alerts | ${teamName}`,
          message: `New listing alert opt-in from ${email}`,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('sent')
        sessionStorage.setItem(SESSION_KEY, '1')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Fixed X — always visible regardless of scroll */}
          <motion.button
            key="mt-exit-close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            aria-label="Close"
            className="fixed top-4 right-4 z-[80] w-9 h-9 flex items-center justify-center text-[#111827]/60 lg:text-white/70 hover:text-[#111827] lg:hover:text-white transition-colors"
          >
            <X size={20} strokeWidth={1.75} />
          </motion.button>

          {/* Scrollable overlay */}
          <motion.div
            key="mt-exit-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain"
            style={{ backgroundColor: 'rgba(17,24,39,0.65)' }}
            onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
          >
            <div
              className="min-h-full flex items-center justify-center p-4 lg:p-8"
              onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
                style={{ backgroundColor: '#fff' }}
              >
                <div className="grid lg:grid-cols-2">

                  {/* ── Left: image ───────────────────────────────── */}
                  <div className="relative aspect-[3/4] lg:aspect-auto lg:min-h-[500px]">
                    <Image
                      src="https://plus.unsplash.com/premium_photo-1674773521455-e3bb5d0dc9e8?q=80&w=998&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Houston home"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                    {/* Gradient blending into right panel */}
                    <div className="hidden lg:block absolute inset-y-0 right-0 w-10 bg-gradient-to-r from-transparent to-white" />
                  </div>

                  {/* ── Right: content ────────────────────────────── */}
                  <div className="px-8 py-8 lg:px-10 lg:py-12 flex flex-col justify-center">

                    {/* Eyebrow */}
                    <p className="text-[12px] tracking-[0.4em] uppercase text-[#4B6090] font-sans mb-3">
                      Before You Go
                    </p>

                    {/* Headline */}
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] leading-tight mb-3"
                        style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                      Find Your Home Before Someone Else Does
                    </h2>

                    {/* Divider */}
                    <div className="w-10 h-[3px] bg-[#1A2D5A] mb-5 rounded-full" />

                    {/* Subheadline */}
                    <p className="text-sm text-[#6B7280] font-sans leading-relaxed mb-7">
                      Get curated listings matched to your search sent straight to your inbox — including new listings before they hit the market.
                    </p>

                    {status === 'sent' ? (
                      <div className="py-6 text-center">
                        <CheckCircle size={44} className="text-[#1A2D5A] mx-auto mb-4" strokeWidth={1.5} />
                        <h3 className="text-xl font-bold text-[#111827] mb-2"
                            style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
                          You're on the list!
                        </h3>
                        <p className="text-[#6B7280] text-sm font-sans mb-6">
                          {teamName} will send curated listings your way soon.
                        </p>
                        <button
                          onClick={dismiss}
                          className="text-xs text-[#9CA3AF] hover:text-[#6B7280] font-sans transition-colors tracking-wide"
                        >
                          Close
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email */}
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address"
                          className="w-full border border-[#D5DBE9] rounded-lg px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#1A2D5A] transition-colors font-sans"
                        />

                        {/* Consent */}
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="mt-exit-consent"
                            required
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="mt-0.5 flex-shrink-0 accent-[#1A2D5A]"
                          />
                          <label htmlFor="mt-exit-consent" className="text-[12px] text-[#9CA3AF] font-sans leading-relaxed">
                            I agree to be contacted by {teamName} via call, email, and text for real estate services. To opt out, reply 'stop' at any time. Message and data rates may apply.
                          </label>
                        </div>

                        {status === 'error' && (
                          <p className="text-red-500 text-xs font-sans">Something went wrong. Please try again.</p>
                        )}

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={status === 'sending'}
                          className="w-full py-3.5 bg-[#1A2D5A] text-white text-[12px] tracking-[0.2em] uppercase font-bold font-sans rounded-lg hover:bg-[#243870] transition-colors disabled:opacity-50"
                        >
                          {status === 'sending' ? 'Submitting…' : 'Get Listing Alerts'}
                        </button>

                        {/* No thanks */}
                        <button
                          type="button"
                          onClick={dismiss}
                          className="w-full text-center text-xs text-[#9CA3AF] hover:text-[#6B7280] font-sans transition-colors pt-1"
                        >
                          No thanks
                        </button>

                      </form>
                    )}
                  </div>

                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
