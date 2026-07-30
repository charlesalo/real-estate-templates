'use client'

import { createBrowserClient } from '@supabase/ssr'
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from './env'

let browserClient

// Singleton — createBrowserClient sets up an auth listener and a storage
// adapter, so re-creating it on every render would leak subscriptions.
export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured) return null
  if (!browserClient) {
    browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey)
  }
  return browserClient
}
