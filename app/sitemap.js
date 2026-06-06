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

  return [...staticEntries, ...neighborhoodEntries, ...blogEntries, ...listingEntries]
}
