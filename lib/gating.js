import 'server-only'

import { isSupabaseConfigured } from '@/lib/supabase/env'
import { getSessionUser } from '@/lib/auth/session'

// How many results a signed-out visitor may see before the wall.
export const PREVIEW_LIMIT = 6

// How many results a gated request fetches from SimplyRETS before slicing down
// to PREVIEW_LIMIT.
//
// The CTA lives or dies on the number in "see all 248 results", and MLS feeds
// without an X-Total-Count header (the SimplyRETS demo account, among others)
// give us nothing but the page we asked for. Pulling a wider window lets us
// quote a real floor instead of "see all 6 results". The extra rows are dropped
// server-side and never reach the browser.
export const COUNT_PROBE_LIMIT = 60

/**
 * Resolve the gate for the current request.
 *
 * The gate is only active when a Supabase project is wired up — a deployment
 * with no auth backend (this showcase site before setup, or a local checkout)
 * serves the search fully open rather than walling off a door nobody can open.
 */
export async function resolveGate() {
  if (!isSupabaseConfigured) {
    return { gated: false, user: null, previewLimit: PREVIEW_LIMIT }
  }
  const user = await getSessionUser()
  return { gated: user === null, user, previewLimit: PREVIEW_LIMIT }
}

/**
 * Truncate a SimplyRETS result set for signed-out visitors.
 *
 * totalCount is deliberately preserved — the whole point of the wall is the
 * "sign up to see all 248 results" CTA, which needs the real number. Everything
 * past the preview is dropped server-side, so the withheld listings are never
 * serialized into the page or the JSON response.
 */
export function gateSearchResults({ listings = [], totalCount = 0, hasMore = false }, gated) {
  if (!gated) {
    return { listings, totalCount, hasMore, gated: false, hiddenCount: 0, approximate: false }
  }

  const visible = listings.slice(0, PREVIEW_LIMIT)
  const total   = Math.max(totalCount, listings.length)

  // getListings() falls back to the page size when the feed omits
  // X-Total-Count, so a total larger than the rows we got back is the tell that
  // the header was real. Anything else with a next page is a floor, and the UI
  // says "60+" rather than claiming an exact number it doesn't have.
  const exact = totalCount > listings.length

  return {
    listings: visible,
    totalCount: total,
    // Pagination is off behind the wall — page 2 is exactly what we're gating.
    hasMore: false,
    gated: true,
    hiddenCount: Math.max(total - visible.length, 0),
    approximate: !exact && hasMore,
  }
}

/**
 * The teaser a signed-out visitor gets on a listing detail page: enough to know
 * the property is worth registering for, nothing more. Photos beyond the first,
 * remarks, agent/office contacts, tax and school data all stay on the server.
 */
export function previewListing(listing) {
  if (!listing) return null
  return {
    mlsId:   listing.mlsId,
    price:   listing.listPrice,
    address: {
      full:       listing.address?.full,
      city:       listing.address?.city,
      state:      listing.address?.state,
      postalCode: listing.address?.postalCode,
    },
    property: {
      bedrooms:  listing.property?.bedrooms,
      bathsFull: listing.property?.bathsFull,
      area:      listing.property?.area,
      type:      listing.property?.type,
    },
    status: listing.mls?.status ?? 'Active',
    photo:  listing.photos?.[0] ?? null,
  }
}
