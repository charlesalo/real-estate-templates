import 'server-only'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from './env'

// Server Components, Route Handlers and Server Actions all read the session
// from the same cookie jar. Returns null when Supabase isn't configured for
// this deployment — callers treat that as "no session, gate disabled".
export async function getSupabaseServerClient() {
  if (!isSupabaseConfigured) return null

  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Server Components can't write cookies. Token refresh still happens
          // in Route Handlers and Server Actions, which can.
        }
      },
    },
  })
}
