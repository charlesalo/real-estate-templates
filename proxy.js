import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from '@/lib/supabase/env'

// No subdomain routing — templates are served at /modern-team and /luxury-agent
// under a single domain (re-templates.chavbuilds.com).
//
// What this does do is keep the Supabase session alive across page loads.
// Server Components can read a session but can't write cookies, so a refreshed
// access token would be thrown away on a plain page navigation. Refreshing here
// (where cookies *can* be written) is what stops signed-in visitors from
// silently dropping back behind the wall once their token expires.
//
// This is deliberately not where the gate is enforced — that lives next to the
// data, in lib/gating.js and the routes that call it.
export async function proxy(request) {
  if (!isSupabaseConfigured) return NextResponse.next()

  let response = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  // Touching getUser() is what triggers the refresh — don't drop this call.
  await supabase.auth.getUser()

  return response
}

export const config = {
  // Only the templates that are behind the wall. Route Handlers refresh their
  // own cookies, and local-expert has no session to maintain yet.
  matcher: ['/modern-team/:path*', '/luxury-agent/:path*'],
}
