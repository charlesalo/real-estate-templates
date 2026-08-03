import { NextResponse, after } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'

// Which site converted the visitor, for the HubSpot lead source. Only the
// browser knows: `signup_template` in user metadata is written by the sign-up
// form alone, so Google OAuth and One Tap registrations arrive without it.
// AuthProvider sends the slug of the layout it's mounted in, and metadata is
// the fallback for anything that reaches this route without a body.
const TEMPLATE_LABELS = {
  'modern-team':  'Modern Team',
  'luxury-agent': 'Luxury Agent',
  'local-expert': 'Local Expert',
}

async function readTemplate(request) {
  try {
    const body = await request.json()
    return typeof body?.template === 'string' ? body.template : null
  } catch {
    return null
  }
}

/**
 * Pushes a newly registered visitor into the existing HubSpot + Resend lead
 * pipeline, exactly once.
 *
 * Called by AuthProvider on every SIGNED_IN — Google OAuth, email/password and
 * confirmation-link returns all funnel through the same event, so there's no
 * "was this a sign-up or a sign-in?" guesswork on the client. The exactly-once
 * guarantee comes from the conditional UPDATE below: whoever manages to stamp
 * lead_synced_at gets the row back and owns the CRM push; everyone else gets an
 * empty result and does nothing.
 */
export async function POST(request) {
  const requestedTemplate = await readTemplate(request)

  const supabase = await getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ success: true, synced: false, reason: 'not-configured' })
  }

  const { data: userData, error: userError } = await supabase.auth.getUser()
  const user = userData?.user
  if (userError || !user) {
    return NextResponse.json({ success: false, error: 'Not signed in' }, { status: 401 })
  }

  // RLS restricts this to the caller's own row, so no service role needed.
  const { data: claimed, error: claimError } = await supabase
    .from('profiles')
    .update({ lead_synced_at: new Date().toISOString() })
    .eq('id', user.id)
    .is('lead_synced_at', null)
    .select('id, email, full_name')

  if (claimError) {
    console.error('[auth/sync-lead] Profile claim failed:', claimError.message)
    return NextResponse.json({ success: false, error: 'Profile unavailable' }, { status: 500 })
  }

  const profile = claimed?.[0]
  if (!profile) {
    // Already synced on an earlier sign-in — nothing to do.
    return NextResponse.json({ success: true, synced: false, reason: 'already-synced' })
  }

  const fullName =
    profile.full_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    ''

  const provider = user.app_metadata?.provider === 'google' ? 'Google' : 'Email'
  const { origin } = new URL(request.url)

  const slug = TEMPLATE_LABELS[requestedTemplate]
    ? requestedTemplate
    : user.user_metadata?.signup_template
  const siteLabel = TEMPLATE_LABELS[slug] ?? 'Website'

  // Don't make the visitor wait on HubSpot/Resend — the wall is already down
  // by the time this runs.
  after(async () => {
    try {
      const res = await fetch(`${origin}/api/leads/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:       fullName,
          email:      profile.email ?? user.email,
          leadSource: `${siteLabel} - Gated Search Signup (${provider})`,
          formType:   'gated-search-signup',
        }),
      })
      if (!res.ok) {
        console.error('[auth/sync-lead] Lead capture returned', res.status)
      }
    } catch (err) {
      // The account still exists and the gate is still open for them — a CRM
      // outage must not look like a failed sign-up.
      console.error('[auth/sync-lead] Lead capture failed:', err)
    }
  })

  return NextResponse.json({ success: true, synced: true })
}
