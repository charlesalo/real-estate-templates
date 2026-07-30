'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

const AuthContext = createContext({
  user: null,
  loading: true,
  configured: false,
  intent: null,
  openAuth: () => {},
  closeAuth: () => {},
  signOut: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

/**
 * Holds the browser-side view of the session and owns the auth modal's
 * open/closed state.
 *
 * The server is still the authority on what a visitor may see — this exists so
 * the UI can react to a sign-in without a full reload, and so any component can
 * pop the wall with `openAuth()` (or a `window.dispatchEvent(new CustomEvent(
 * 'auth:open'))`, matching the existing `contact:open` idiom).
 */
export default function AuthProvider({ children, initialUser = null }) {
  const supabase = getSupabaseBrowserClient()
  const router   = useRouter()

  const [user, setUser]       = useState(initialUser)
  const [loading, setLoading] = useState(Boolean(supabase) && !initialUser)
  // null = closed. Otherwise a short string describing what the visitor was
  // trying to do, so the modal can lead with the right headline.
  const [intent, setIntent]   = useState(null)

  // Guards against re-running the CRM push for a session we've already synced
  // in this tab (the route is idempotent regardless — this just saves a call).
  const syncedRef = useRef(new Set())

  const syncLead = useCallback((sessionUser) => {
    if (!sessionUser || syncedRef.current.has(sessionUser.id)) return
    syncedRef.current.add(sessionUser.id)
    fetch('/api/auth/sync-lead', { method: 'POST' }).catch(() => {})
  }, [])

  useEffect(() => {
    if (!supabase) return

    let active = true

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return
      setUser(data?.user ?? null)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return
      const nextUser = session?.user ?? null
      setUser(nextUser)
      setLoading(false)

      if (event === 'SIGNED_IN') {
        setIntent(null)
        syncLead(nextUser)
        // Server Components decided what to render from the *old* cookie state.
        // Refresh so the gate re-resolves with the session now in place.
        router.refresh()
      }
      if (event === 'SIGNED_OUT') {
        router.refresh()
      }
    })

    return () => {
      active = false
      sub?.subscription?.unsubscribe()
    }
  }, [supabase, router, syncLead])

  const openAuth  = useCallback((reason = 'search') => setIntent(reason), [])
  const closeAuth = useCallback(() => setIntent(null), [])

  useEffect(() => {
    const handler = (e) => openAuth(e.detail?.reason ?? 'search')
    window.addEventListener('auth:open', handler)
    return () => window.removeEventListener('auth:open', handler)
  }, [openAuth])

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }, [supabase, router])

  const value = useMemo(
    () => ({ user, loading, configured: Boolean(supabase), intent, openAuth, closeAuth, signOut }),
    [user, loading, supabase, intent, openAuth, closeAuth, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
