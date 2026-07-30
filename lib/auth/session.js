import 'server-only'

import { cache } from 'react'
import { getSupabaseServerClient } from '@/lib/supabase/server'

/**
 * The single source of truth for "is this request signed in?".
 *
 * Uses `auth.getUser()`, not `auth.getSession()` — getSession only decodes the
 * cookie, which a visitor can forge. getUser revalidates the JWT against the
 * Supabase auth server. Memoized with React's cache() so a page that checks the
 * gate in several places still makes one round trip per render pass.
 *
 * Returns null for signed-out visitors *and* for deployments with no Supabase
 * project configured.
 */
export const getSessionUser = cache(async () => {
  const supabase = await getSupabaseServerClient()
  if (!supabase) return null

  const { data, error } = await supabase.auth.getUser()
  if (error) return null

  return data?.user ?? null
})

export async function isSignedIn() {
  return (await getSessionUser()) !== null
}
