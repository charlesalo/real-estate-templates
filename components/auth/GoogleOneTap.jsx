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

    // Send to API for server-side verification + lead capture
    await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential }),
    }).catch(() => {})

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
      })
      window.google?.accounts.id.prompt()
    }

    return () => {
      window.google?.accounts.id.cancel()
      document.head.removeChild(script)
    }
  }, [clientId, handleCredential])

  return null
}
