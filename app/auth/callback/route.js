import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'

// Where Supabase sends the browser back after Google OAuth or an emailed
// confirmation link. Exchanges the one-time code for a session cookie, then
// drops the visitor back on the page that raised the wall.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  // Only ever redirect to a path on this origin — `next` comes from the query
  // string, so an absolute URL here would be an open redirect.
  const requested = searchParams.get('next') ?? '/modern-team/listings'
  const next = requested.startsWith('/') && !requested.startsWith('//')
    ? requested
    : '/modern-team/listings'

  if (!code) {
    return NextResponse.redirect(`${origin}${next}`)
  }

  const supabase = await getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.redirect(`${origin}${next}`)
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) {
    const url = new URL(next, origin)
    url.searchParams.set('auth_error', '1')
    return NextResponse.redirect(url)
  }

  return NextResponse.redirect(`${origin}${next}`)
}
