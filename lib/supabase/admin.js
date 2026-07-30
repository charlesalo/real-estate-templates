import 'server-only'

import { createClient } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabaseUrl } from './env'

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let adminClient

// Bypasses RLS — never import this from anything that reaches the browser.
// Only needed for backfilling a profile row when the DB trigger couldn't
// (e.g. a user created before the migration ran).
export function getSupabaseAdminClient() {
  if (!isSupabaseConfigured || !serviceRoleKey) return null
  if (!adminClient) {
    adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  }
  return adminClient
}
