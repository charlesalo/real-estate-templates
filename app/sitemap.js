import { FEATURED_LISTINGS } from '@/lib/featured-listings'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://re-templates.chavbuilds.com'

const STATIC_ROUTES = [
  { path: '/luxury-agent',                   changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/luxury-agent/about',             changeFrequency: 'monthly', priority: 0.8 },
  { path: '/luxury-agent/featured-listings', changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/luxury-agent/listings',          changeFrequency: 'daily',   priority: 0.9 },
  { path: '/luxury-agent/neighborhoods',     changeFrequency: 'monthly', priority: 0.8 },
  { path: '/luxury-agent/home-valuation',    changeFrequency: 'monthly', priority: 0.8 },
  { path: '/luxury-agent/blog',              changeFrequency: 'weekly',  priority: 0.7 },
  { path: '/luxury-agent/past-transactions', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/luxury-agent/testimonials',      changeFrequency: 'monthly', priority: 0.6 },
  { path: '/luxury-agent/contact',           changeFrequency: 'yearly',  priority: 0.6 },
]

const NEIGHBORHOOD_SLUGS = [
  'beverly-hills',
  'bel-air',
  'holmby-hills',
  'pacific-palisades',
]

const BLOG_SLUGS = [
  'beverly-hills-market-report-2024',
  'buying-luxury-home-los-angeles',
  'bel-air-vs-holmby-hills',
]

const MODERN_TEAM_STATIC_ROUTES = [
  { path: '/modern-team',                   changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/modern-team/about',             changeFrequency: 'monthly', priority: 0.8 },
  { path: '/modern-team/featured-listings', changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/modern-team/listings',          changeFrequency: 'daily',   priority: 0.9 },
  { path: '/modern-team/neighborhoods',     changeFrequency: 'monthly', priority: 0.8 },
  { path: '/modern-team/home-valuation',    changeFrequency: 'monthly', priority: 0.8 },
  { path: '/modern-team/blog',              changeFrequency: 'weekly',  priority: 0.7 },
  { path: '/modern-team/past-transactions', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/modern-team/testimonials',      changeFrequency: 'monthly', priority: 0.6 },
  { path: '/modern-team/contact',           changeFrequency: 'yearly',  priority: 0.6 },
]

const MODERN_TEAM_NEIGHBORHOOD_SLUGS = [
  'the-heights',
  'river-oaks',
  'montrose',
  'memorial',
  'sugar-land',
  'the-woodlands',
  'katy',
  'midtown',
  'downtown-houston',
]

const MODERN_TEAM_BLOG_SLUGS = [
  'houston-real-estate-market-report-2024',
  'heights-vs-montrose-guide',
  'first-time-buyer-houston-guide',
  'houston-suburbs-compared-2024',
  'sell-houston-home-fast',
  'houston-property-taxes-explained',
]

const MODERN_TEAM_AGENT_SLUGS = [
  'sarah-hargrove',
  'michael-hargrove',
  'jessica-chen',
  'carlos-rivera',
]

const MODERN_TEAM_FEATURED_LISTING_SLUGS = [
  '2814-wroxton-rd',
  '408-avondale-st',
  '1011-tulane-st',
  '5510-fairdale-ln',
  '22-greenbay-st',
  '3703-inker-st',
]

const MODERN_TEAM_PAST_TRANSACTION_SLUGS = [
  '3412-roseland-st',
  '1827-kirby-dr-1402',
  '526-w-24th-st',
  '14-briar-hollow-ln',
  '2209-dunlavy-st',
  '9802-emerald-glen-dr',
  '4430-merwin-st',
  '17-grand-regency-cir',
  '6118-chevy-chase-dr',
]

const LOCAL_EXPERT_STATIC_ROUTES = [
  { path: '/local-expert',                  changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/local-expert/about',            changeFrequency: 'monthly', priority: 0.8 },
  { path: '/local-expert/listings',         changeFrequency: 'daily',   priority: 0.9 },
  { path: '/local-expert/neighborhoods',    changeFrequency: 'monthly', priority: 0.8 },
  { path: '/local-expert/blog',             changeFrequency: 'weekly',  priority: 0.7 },
  { path: '/local-expert/field-notes',      changeFrequency: 'monthly', priority: 0.7 },
  { path: '/local-expert/contact',          changeFrequency: 'yearly',  priority: 0.6 },
  { path: '/local-expert/home-valuation',   changeFrequency: 'monthly', priority: 0.8 },
]

const LOCAL_EXPERT_NEIGHBORHOOD_SLUGS = [
  'west-village',
  'tribeca',
  'upper-east-side',
  'brooklyn-heights',
  'dumbo',
  'park-slope',
  'soho',
  'cobble-hill',
  'chelsea',
]

const LOCAL_EXPERT_LISTING_IDS = [
  'le-1',
  'le-2',
  'le-3',
  'le-4',
  'le-5',
  'le-6',
]

const LOCAL_EXPERT_SOLD_LISTING_IDS = [
  'sl-1',
  'sl-2',
  'sl-3',
  'sl-4',
]

const LOCAL_EXPERT_BLOG_SLUGS = [
  'brooklyn-heights-market-update-2024',
  'what-1-8m-buys-in-nyc-2024',
  'co-op-vs-condo-nyc-explained',
]

const LOCAL_EXPERT_FIELD_NOTE_IDS = [
  'fn-1',
  'fn-2',
  'fn-3',
  'fn-4',
  'fn-5',
  'fn-6',
]

export default function sitemap() {
  const now = new Date()

  const staticEntries = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const neighborhoodEntries = NEIGHBORHOOD_SLUGS.map(slug => ({
    url: `${BASE_URL}/luxury-agent/neighborhoods/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogEntries = BLOG_SLUGS.map(slug => ({
    url: `${BASE_URL}/luxury-agent/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const listingEntries = FEATURED_LISTINGS.map(listing => ({
    url: `${BASE_URL}/luxury-agent/featured-listings/${listing.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const modernTeamStaticEntries = MODERN_TEAM_STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const modernTeamNeighborhoodEntries = MODERN_TEAM_NEIGHBORHOOD_SLUGS.map(slug => ({
    url: `${BASE_URL}/modern-team/neighborhoods/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const modernTeamBlogEntries = MODERN_TEAM_BLOG_SLUGS.map(slug => ({
    url: `${BASE_URL}/modern-team/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const modernTeamAgentEntries = MODERN_TEAM_AGENT_SLUGS.map(slug => ({
    url: `${BASE_URL}/modern-team/agents/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const modernTeamFeaturedListingEntries = MODERN_TEAM_FEATURED_LISTING_SLUGS.map(slug => ({
    url: `${BASE_URL}/modern-team/featured-listings/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const modernTeamPastTransactionEntries = MODERN_TEAM_PAST_TRANSACTION_SLUGS.map(slug => ({
    url: `${BASE_URL}/modern-team/past-transactions/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const localExpertStaticEntries = LOCAL_EXPERT_STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const localExpertNeighborhoodEntries = LOCAL_EXPERT_NEIGHBORHOOD_SLUGS.map(slug => ({
    url: `${BASE_URL}/local-expert/neighborhoods/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const localExpertListingEntries = LOCAL_EXPERT_LISTING_IDS.map(id => ({
    url: `${BASE_URL}/local-expert/listings/${id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const localExpertSoldListingEntries = LOCAL_EXPERT_SOLD_LISTING_IDS.map(id => ({
    url: `${BASE_URL}/local-expert/sold/${id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const localExpertBlogEntries = LOCAL_EXPERT_BLOG_SLUGS.map(slug => ({
    url: `${BASE_URL}/local-expert/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const localExpertFieldNoteEntries = LOCAL_EXPERT_FIELD_NOTE_IDS.map(id => ({
    url: `${BASE_URL}/local-expert/field-notes/${id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    ...staticEntries,
    ...neighborhoodEntries,
    ...blogEntries,
    ...listingEntries,
    ...modernTeamStaticEntries,
    ...modernTeamNeighborhoodEntries,
    ...modernTeamBlogEntries,
    ...modernTeamAgentEntries,
    ...modernTeamFeaturedListingEntries,
    ...modernTeamPastTransactionEntries,
    ...localExpertStaticEntries,
    ...localExpertNeighborhoodEntries,
    ...localExpertListingEntries,
    ...localExpertSoldListingEntries,
    ...localExpertBlogEntries,
    ...localExpertFieldNoteEntries,
  ]
}
