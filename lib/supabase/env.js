export const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Same "you own your data" model as Sanity: one Supabase project per client
// deployment. Deployments without one (or a local checkout with no .env.local)
// must still build and render — every caller checks this flag and degrades to
// the ungated experience rather than throwing.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
