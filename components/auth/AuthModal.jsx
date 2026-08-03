'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, CheckCircle, Lock, Bell, Heart, MailCheck } from 'lucide-react'
import { useAuth } from './AuthProvider'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Please enter your name'),
  email:    z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, 'At least 8 characters'),
})

const signInSchema = z.object({
  email:    z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, 'Required'),
})

// What the visitor was doing when the wall came up, so the modal leads with the
// reason instead of a generic "sign in".
const INTENT_COPY = {
  search: {
    eyebrow: 'Unlock the full search',
    heading: 'See every listing',
    blurb:   'Create a free account to view all matching properties, open full listing details, and save the searches you care about.',
  },
  listing: {
    eyebrow: 'Full listing details',
    heading: 'View this property',
    blurb:   'Create a free account to see every photo, the full description, price history, and schedule a private showing.',
  },
  save: {
    eyebrow: 'Save this search',
    heading: 'Never miss a listing',
    blurb:   'Create a free account to save this search and pick up right where you left off next time.',
  },
}

const BENEFITS = [
  { Icon: Lock,  title: 'Every matching listing', body: 'Full MLS results, not just a preview.' },
  { Icon: Heart, title: 'Saved searches',         body: 'Keep your filters one click away.' },
  { Icon: Bell,  title: 'First to know',          body: 'Be ready the moment the right home hits the market.' },
]

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
    </svg>
  )
}

export default function AuthModal({
  teamName = 'The Hargrove Group',
  // Recorded as `signup_template` in Supabase user metadata so leads can be
  // attributed to the template that converted them. No default — this file is
  // shared and must not name a specific template.
  template,
}) {
  const { intent, closeAuth, configured } = useAuth()
  const supabase = getSupabaseBrowserClient()

  const [mode, setMode]           = useState('signup')
  const [authError, setAuthError] = useState('')
  const [checkEmail, setCheckEmail] = useState(false)
  const [googleBusy, setGoogleBusy] = useState(false)

  const open = intent !== null
  const copy = INTENT_COPY[intent] ?? INTENT_COPY.search

  const {
    register, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(mode === 'signup' ? signUpSchema : signInSchema) })

  const close = useCallback(() => {
    closeAuth()
    // Wait out the exit animation before resetting, so the form doesn't visibly
    // snap back to its empty state on the way out.
    setTimeout(() => {
      setAuthError('')
      setCheckEmail(false)
      setMode('signup')
      reset()
    }, 400)
  }, [closeAuth, reset])

  // Clear validation state when switching between sign-up and sign-in so stale
  // errors from the other form don't linger.
  const switchMode = () => {
    setMode(m => (m === 'signup' ? 'signin' : 'signup'))
    setAuthError('')
    reset()
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, close])

  const onSubmit = async (data) => {
    setAuthError('')
    if (!supabase) {
      setAuthError('Accounts are not configured on this deployment.')
      return
    }

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      if (error) setAuthError(error.message)
      // On success AuthProvider's SIGNED_IN handler closes the modal and
      // refreshes the server-rendered gate.
      return
    }

    const { data: result, error } = await supabase.auth.signUp({
      email:    data.email,
      password: data.password,
      options: {
        // Read by the handle_new_user trigger to populate profiles.full_name.
        data: { full_name: data.fullName, signup_template: template },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(window.location.pathname + window.location.search)}`,
      },
    })

    if (error) {
      setAuthError(error.message)
      return
    }
    // No session means the project has email confirmation switched on — the
    // wall stays up until they click the link.
    if (!result?.session) setCheckEmail(true)
  }

  const signInWithGoogle = async () => {
    setAuthError('')
    if (!supabase) return
    setGoogleBusy(true)
    const next = `${window.location.pathname}${window.location.search}`
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) {
      setAuthError(error.message)
      setGoogleBusy(false)
    }
  }

  const inputCls =
    'w-full bg-transparent border border-template-border text-template-fg text-sm px-4 py-3 rounded-lg outline-none placeholder:text-template-text-subtle focus:border-template-accent transition-colors'
  const labelCls = 'block text-[12px] tracking-[0.2em] uppercase text-template-text-muted mb-1.5 font-sans'
  const errorCls = 'text-red-500 text-xs mt-1 font-sans'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mt-auth-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-template-overlay/60 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={copy.heading}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl [&::-webkit-scrollbar]:hidden [scrollbar-width:none] grid lg:grid-cols-[1.1fr_0.9fr]"
          >

            {/* ── Left — Form ─────────────────────────────────── */}
            <div className="bg-template-panel px-8 py-10 lg:px-12 lg:py-12">

              <div className="mb-7">
                <p className="text-[12px] tracking-[0.3em] uppercase text-template-accent-muted font-sans mb-2">
                  {copy.eyebrow}
                </p>
                <h2 className="text-3xl font-bold text-template-accent tracking-tight leading-tight">
                  {mode === 'signup' ? copy.heading : 'Welcome back'}
                </h2>
                <p className="text-sm text-template-text-muted font-sans mt-3 leading-relaxed">
                  {mode === 'signup' ? copy.blurb : 'Sign in to pick up your search where you left off.'}
                </p>
              </div>

              {!configured ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-template-text-muted font-sans">
                    Accounts aren&apos;t configured on this deployment yet.
                  </p>
                </div>
              ) : checkEmail ? (
                <div className="py-14 text-center">
                  <MailCheck size={44} className="text-template-accent mx-auto mb-5" strokeWidth={1.25} />
                  <h3 className="text-xl font-semibold text-template-accent mb-2">Check your inbox</h3>
                  <p className="text-template-text-muted text-sm font-sans leading-relaxed">
                    We sent you a confirmation link. Click it and you&apos;ll land right back on your search.
                  </p>
                  <button
                    onClick={close}
                    className="mt-8 text-[12px] tracking-[0.2em] uppercase text-template-text-subtle hover:text-template-accent font-sans transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {/* Google */}
                  <button
                    type="button"
                    onClick={signInWithGoogle}
                    disabled={googleBusy}
                    className="w-full flex items-center justify-center gap-3 py-3 border border-template-border rounded-lg text-sm font-medium text-template-text-body hover:border-template-accent/40 hover:bg-template-bg transition-all font-sans disabled:opacity-50"
                  >
                    <GoogleMark />
                    {googleBusy ? 'Redirecting…' : 'Continue with Google'}
                  </button>

                  <div className="flex items-center gap-4 my-6">
                    <span className="flex-1 h-px bg-template-border" />
                    <span className="text-[12px] tracking-[0.2em] uppercase text-template-text-subtle font-sans">or</span>
                    <span className="flex-1 h-px bg-template-border" />
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {mode === 'signup' && (
                      <div>
                        <label className={labelCls}>Full Name</label>
                        <input {...register('fullName')} type="text" placeholder="Jane Smith" className={inputCls} />
                        {errors.fullName && <p className={errorCls}>{errors.fullName.message}</p>}
                      </div>
                    )}

                    <div>
                      <label className={labelCls}>Email</label>
                      <input {...register('email')} type="email" autoComplete="email" placeholder="jane@example.com" className={inputCls} />
                      {errors.email && <p className={errorCls}>{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className={labelCls}>Password</label>
                      <input
                        {...register('password')}
                        type="password"
                        autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                        placeholder={mode === 'signup' ? 'At least 8 characters' : '••••••••'}
                        className={inputCls}
                      />
                      {errors.password && <p className={errorCls}>{errors.password.message}</p>}
                    </div>

                    {mode === 'signup' && (
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          required
                          id="mt-auth-consent"
                          className="mt-0.5 w-4 h-4 rounded border-template-border accent-template-accent flex-shrink-0"
                        />
                        <label htmlFor="mt-auth-consent" className="text-[12px] text-template-text-subtle font-sans leading-relaxed">
                          I agree to be contacted by {teamName} via call, email, and text about listings and real estate services. Message and data rates may apply.
                        </label>
                      </div>
                    )}

                    {authError && (
                      <p className="text-red-500 text-xs font-sans text-center">{authError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-template-accent text-template-accent-fg text-[12px] tracking-[0.25em] uppercase font-semibold rounded-lg hover:bg-template-accent-hover transition-colors disabled:opacity-50"
                    >
                      {isSubmitting
                        ? 'Just a moment…'
                        : mode === 'signup' ? 'Create Free Account' : 'Sign In'}
                    </button>
                  </form>

                  <p className="text-center text-sm text-template-text-muted font-sans mt-6">
                    {mode === 'signup' ? 'Already have an account?' : 'New here?'}{' '}
                    <button
                      type="button"
                      onClick={switchMode}
                      className="text-template-accent font-semibold hover:underline"
                    >
                      {mode === 'signup' ? 'Sign in' : 'Create a free account'}
                    </button>
                  </p>
                </>
              )}
            </div>

            {/* ── Right — Why register (navy) ─────────────────── */}
            <div className="relative bg-template-accent px-8 py-10 lg:px-12 lg:py-12 flex flex-col">

              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-template-accent-fg/10 hover:bg-template-accent-fg/20 text-template-accent-fg/60 hover:text-template-accent-fg transition-all"
              >
                <X size={16} strokeWidth={2} />
              </button>

              <div className="mb-10 mt-2">
                <p className="text-[12px] tracking-[0.3em] uppercase text-template-accent-soft font-sans mb-2">
                  Free Account
                </p>
                <h3 className="text-xl font-semibold text-template-accent-fg leading-snug">
                  {teamName}
                </h3>
              </div>

              <div className="space-y-6 flex-1">
                {BENEFITS.map(({ Icon, title, body }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-template-accent-fg/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={13} className="text-template-accent-soft" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm text-template-accent-fg font-medium">{title}</p>
                      <p className="text-[13px] text-template-accent-fg/50 font-sans mt-0.5 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-template-accent-fg/10 flex items-start gap-2.5">
                <CheckCircle size={14} className="text-template-accent-soft flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <p className="text-[12px] text-template-accent-fg/35 font-sans leading-relaxed">
                  Always free. No obligation, and you can unsubscribe at any time.
                </p>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
