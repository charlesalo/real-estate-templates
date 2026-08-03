import { getSessionUser } from '@/lib/auth/session'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import SavedSearchesClient from './SavedSearchesClient'

export const metadata = {
  title: 'Saved Searches',
  description: 'Your saved Los Angeles property searches with Victoria Sinclair.',
  robots: { index: false, follow: false },
}

export default async function SavedSearchesPage() {
  const user = await getSessionUser()

  let searches = []
  if (user) {
    const supabase = await getSupabaseServerClient()
    const { data, error } = await supabase
      .from('saved_searches')
      .select('id, template, search_criteria, alert_frequency, created_at')
      .eq('user_id', user.id)
      .eq('template', 'luxury-agent')
      .order('created_at', { ascending: false })

    if (error) console.error('[saved-searches] page load failed:', error.message)
    searches = data ?? []
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <SavedSearchesClient signedIn={Boolean(user)} initialSearches={searches} />
    </div>
  )
}
