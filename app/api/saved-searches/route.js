import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'

// The filter keys the search UI actually uses. Anything else a caller sends is
// dropped rather than stored — saved_searches.search_criteria is jsonb, and an
// unbounded blob is how that column turns into a dumping ground.
const CRITERIA_KEYS = [
  'q', 'status', 'minprice', 'maxprice',
  'minbeds', 'minbaths', 'type', 'minarea', 'sort',
]

const TEMPLATES = ['modern-team', 'luxury-agent', 'local-expert']
const ALERT_FREQUENCIES = ['instant', 'daily', 'weekly']

function sanitizeCriteria(raw) {
  if (!raw || typeof raw !== 'object') return {}
  const out = {}
  for (const key of CRITERIA_KEYS) {
    const value = raw[key]
    if (value === undefined || value === null || value === '') continue
    out[key] = String(value).slice(0, 120)
  }
  return out
}

async function requireUser() {
  const supabase = await getSupabaseServerClient()
  if (!supabase) return { error: NextResponse.json({ error: 'Accounts are not configured.' }, { status: 503 }) }

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    return { error: NextResponse.json({ error: 'Not signed in' }, { status: 401 }) }
  }
  return { supabase, user: data.user }
}

export async function GET(request) {
  const { supabase, user, error } = await requireUser()
  if (error) return error

  const template = new URL(request.url).searchParams.get('template')

  let query = supabase
    .from('saved_searches')
    .select('id, template, search_criteria, alert_frequency, created_at')
    // Redundant with RLS, which already scopes this to the caller. Kept so the
    // query is still correct if the policy is ever loosened.
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (template) query = query.eq('template', template)

  const { data, error: dbError } = await query
  if (dbError) {
    console.error('[saved-searches] GET failed:', dbError.message)
    return NextResponse.json({ error: 'Could not load saved searches.' }, { status: 500 })
  }

  return NextResponse.json({ searches: data ?? [] })
}

export async function POST(request) {
  const { supabase, user, error } = await requireUser()
  if (error) return error

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const template = TEMPLATES.includes(body.template) ? body.template : 'modern-team'
  const criteria = sanitizeCriteria(body.criteria)
  const alertFrequency = ALERT_FREQUENCIES.includes(body.alertFrequency)
    ? body.alertFrequency
    : null

  const { data, error: dbError } = await supabase
    .from('saved_searches')
    .insert({
      user_id:         user.id,
      template,
      search_criteria: criteria,
      alert_frequency: alertFrequency,
    })
    .select('id, template, search_criteria, alert_frequency, created_at')
    .single()

  if (dbError) {
    console.error('[saved-searches] POST failed:', dbError.message)
    return NextResponse.json({ error: 'Could not save this search.' }, { status: 500 })
  }

  return NextResponse.json({ success: true, search: data })
}

export async function DELETE(request) {
  const { supabase, user, error } = await requireUser()
  if (error) return error

  const id = new URL(request.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id.' }, { status: 400 })

  const { error: dbError } = await supabase
    .from('saved_searches')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (dbError) {
    console.error('[saved-searches] DELETE failed:', dbError.message)
    return NextResponse.json({ error: 'Could not delete this search.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
