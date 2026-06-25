'use client'

import { useEffect, useCallback } from 'react'

function decodeJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return null
  }
}

export default function GoogleOneTap({ clientId, onSuccess }) {
  const handleCredential = useCallback(async (response) => {
    const payload = decodeJwt(response.credential)
    if (!payload) return

    // Server-side token verification
    const authRes = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential }),
    }).catch(() => null)

    if (!authRes?.ok) return

    // Notify agent from the browser (server-side fetch is blocked by Cloudflare on web3forms)
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

    onSuccess?.({ name: payload.name, email: payload.email, picture: payload.picture })
  }, [onSuccess])

  useEffect(() => {
    if (!clientId) return

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    script.onload = () => {
      window.google?.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredential,
        auto_select: false,
        cancel_on_tap_outside: true,
        context: 'signin',
        itp_support: true,
        use_fedcm_for_prompt: true,
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

    return () => {
      window.google?.accounts.id.cancel()
      document.head.removeChild(script)
    }
  }, [clientId, handleCredential])

  return null
}
