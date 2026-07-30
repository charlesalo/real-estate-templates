'use client'

import { useEffect } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

function decodeJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return null
  }
}

// Google embeds the *hashed* nonce in the ID token; Supabase hashes the raw one
// we hand it and compares. So Google gets the hash, signInWithIdToken gets the
// original. Requires a secure context (https or localhost) for crypto.subtle.
async function generateNonce() {
  const raw = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw))
  const hashed = Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  return { raw, hashed }
}

/**
 * Google One Tap, in one of two modes.
 *
 * `supabaseAuth` — exchanges the One Tap credential for a real Supabase
 * session. Use this on templates behind the registration wall. Without it, a
 * visitor could accept the One Tap prompt, watch Google confirm they're signed
 * in, and still be sitting behind the gate.
 *
 * Default (no `supabaseAuth`) — the original behaviour: verify the token
 * server-side and notify the agent via web3forms. Still what the landing page
 * and the not-yet-ported templates use, since they have no session to create.
 *
 * The two are mutually exclusive on purpose. In Supabase mode the web3forms
 * ping is skipped, because AuthProvider's SIGNED_IN handler routes the signup
 * through /api/auth/sync-lead into HubSpot + Resend — firing both would put the
 * same lead in front of the agent twice.
 */
export default function GoogleOneTap({ clientId, supabaseAuth = false }) {
  useEffect(() => {
    if (!clientId) return

    const supabase = supabaseAuth ? getSupabaseBrowserClient() : null
    // Asked for Supabase mode on a deployment with no Supabase project: fall
    // back to the legacy path rather than showing a prompt that can't sign
    // anyone in.
    const useSupabase = Boolean(supabase)

    let script
    let cancelled = false

    async function init() {
      if (useSupabase) {
        // getSession, not getUser: this is a "should we prompt?" UI decision
        // read from local storage, not an authorization check. Authorization
        // always goes through the server (lib/auth/session.js).
        const { data } = await supabase.auth.getSession()
        if (data?.session) return   // already signed in — don't nag
      }

      const nonce = useSupabase ? await generateNonce() : null
      if (cancelled) return

      script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true

      script.onload = () => {
        if (cancelled) return

        window.google?.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => handleCredential(response, nonce),
          auto_select: false,
          cancel_on_tap_outside: true,
          context: 'signin',
          itp_support: true,
          // Chrome's third-party cookie phase-out — One Tap needs FedCM.
          use_fedcm_for_prompt: true,
          ...(nonce ? { nonce: nonce.hashed } : {}),
        })

        window.google?.accounts.id.prompt((notification) => {
          if (process.env.NODE_ENV === 'production') return
          if (notification.isNotDisplayed()) {
            console.warn('[GoogleOneTap] not displayed:', notification.getNotDisplayedReason())
          } else if (notification.isSkippedMoment()) {
            console.warn('[GoogleOneTap] skipped:', notification.getSkippedReason())
          }
        })
      }

      document.head.appendChild(script)
    }

    async function handleCredential(response, nonce) {
      if (useSupabase) {
        const { error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
          nonce: nonce.raw,
        })
        if (error) {
          console.error('[GoogleOneTap] Supabase sign-in failed:', error.message)
        }
        // On success, AuthProvider's SIGNED_IN listener takes it from here:
        // CRM sync, modal close, and a refresh so the gate re-resolves.
        return
      }

      // ── Legacy path ────────────────────────────────────────────────────
      const payload = decodeJwt(response.credential)
      if (!payload) return

      const authRes = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      }).catch(() => null)

      if (!authRes?.ok) return

      // Notify the agent from the browser (a server-side fetch is blocked by
      // Cloudflare on web3forms).
      const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
      if (web3Key) {
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `New Lead via Google Sign-In: ${payload.name}`,
            name: payload.name,
            email: payload.email,
            message: `A new lead signed in with Google 1-tap.\n\nName: ${payload.name}\nEmail: ${payload.email}\nPage: ${window.location.href}`,
            from_name: 'Website Lead Capture',
            botcheck: false,
          }),
        }).catch(() => {})
      }
    }

    init()

    return () => {
      cancelled = true
      window.google?.accounts.id.cancel()
      script?.remove()
    }
  }, [clientId, supabaseAuth])

  return null
}
