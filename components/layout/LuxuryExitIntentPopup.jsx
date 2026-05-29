'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'

const SESSION_KEY = 'luxury_exit_popup_dismissed'

export default function LuxuryExitIntentPopup({ agentName = 'Victoria Sinclair' }) {
  const [open, setOpen]   = useState(false)
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    let ready = false
    const readyTimer = setTimeout(() => { ready = true }, 2000)

    const onMouseMove = (e) => {
      if (!ready) return
      if (e.clientY > 8) return  // cursor entering top ~8px = heading for browser chrome
      if (sessionStorage.getItem(SESSION_KEY)) return
      setOpen(true)
    }

    // Mobile fallback — show after 30 s if still on page
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
          subject: `Exit Intent — Listing Alerts | ${agentName}`,
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
            key="exit-popup-close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            aria-label="Close"
            className="fixed top-4 right-4 z-[80] w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </motion.button>

          {/* Scrollable overlay */}
          <motion.div
            key="exit-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain"
            style={{ backgroundColor: 'rgba(0,0,0,0.80)' }}
            onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
          >
            {/* Centering wrapper — min-h ensures tap-outside works on short content */}
            <div
              className="min-h-full flex items-center justify-center p-4 lg:p-8"
              onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-4xl overflow-hidden"
                style={{ backgroundColor: '#111111' }}
              >
            <div className="grid lg:grid-cols-2">

              {/* ── Left: image ──────────────────────────────────── */}
              <div className="relative aspect-[3/4] lg:aspect-auto lg:min-h-[480px]">
                <Image
                  src="https://images.unsplash.com/photo-1678908644007-2590bac83d34?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Luxury living room"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                {/* Subtle gradient overlay on right edge to blend into panel */}
                <div className="hidden lg:block absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-[#111111]" />
              </div>

              {/* ── Right: content ───────────────────────────────── */}
              <div className="px-8 py-8 lg:px-10 lg:py-12 flex flex-col justify-center">

                {/* Eyebrow */}
                <p className="text-[9px] tracking-[0.45em] uppercase text-[#C9A96E] mb-4 font-sans">
                  Before You Go
                </p>

                {/* Headline */}
                <h2 className="font-heading text-2xl lg:text-3xl font-normal text-white leading-tight mb-2 lg:whitespace-nowrap">
                  Never Miss the Right Listing
                </h2>
                <div className="w-8 h-px bg-[#C9A96E] mb-5" />

                {/* Subheadline */}
                <p className="text-[12px] text-white/50 font-sans leading-relaxed mb-8">
                  Receive hand-selected properties matched to your criteria — including exclusive off-market opportunities — delivered directly to your inbox.
                </p>

                {status === 'sent' ? (
                  <div className="py-6 text-center">
                    <CheckCircle size={40} className="text-[#C9A96E] mx-auto mb-4" strokeWidth={1} />
                    <h3 className="font-heading text-lg text-white mb-2">You're on the list.</h3>
                    <p className="text-white/40 text-xs font-sans mb-6">
                      {agentName} will send curated listings your way soon.
                    </p>
                    <button
                      onClick={dismiss}
                      className="text-[9px] tracking-[0.25em] uppercase text-white/25 hover:text-white font-sans transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full bg-transparent border-b border-white/20 text-white text-sm py-3 outline-none placeholder:text-white/30 focus:border-[#C9A96E] transition-colors font-sans"
                      />
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="exit-consent"
                        required
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 flex-shrink-0 accent-[#C9A96E]"
                      />
                      <label htmlFor="exit-consent" className="text-[10px] text-white/25 font-sans leading-relaxed">
                        I agree to be contacted by {agentName} via call, email, and text for real estate services. To opt out, reply 'stop' at any time. Message and data rates may apply.
                      </label>
                    </div>

                    {status === 'error' && (
                      <p className="text-red-400 text-xs font-sans">Something went wrong. Please try again.</p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full py-4 bg-[#C9A96E] text-[#0A0A0A] text-[11px] tracking-[0.25em] uppercase font-medium font-sans hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {status === 'sending' ? 'Submitting…' : 'Submit'}
                    </button>

                    {/* No thanks */}
                    <button
                      type="button"
                      onClick={dismiss}
                      className="w-full text-center text-[9px] tracking-[0.2em] uppercase text-white/20 hover:text-white/50 font-sans transition-colors pt-1"
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
