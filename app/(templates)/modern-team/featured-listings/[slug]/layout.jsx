import { FEATURED_LISTINGS } from '../data'

// page.jsx is a client component, so it can't export metadata itself — without
// this layout all six listing detail pages fell back to the template's generic
// title and description, which made them look like duplicates to Google.
export async function generateMetadata({ params }) {
  const { slug } = await params
  const listing = FEATURED_LISTINGS.find(l => l.slug === slug)
  if (!listing) return {}

  return {
    alternates: { canonical: `/modern-team/featured-listings/${slug}` },
    title: `${listing.address}, ${listing.city} — ${listing.listPrice}`,
    description: `${listing.beds} bed, ${listing.baths} bath ${listing.type.toLowerCase()} in ${listing.neighborhood} — ${listing.sqft} sf, built ${listing.yearBuilt}. Listed at ${listing.listPrice} by The Hargrove Group.`,
  }
}

export default function FeaturedListingLayout({ children }) {
  return children
}
