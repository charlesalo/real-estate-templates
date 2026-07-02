import { client } from './client'

// Matches the fetch/revalidate convention used in lib/simplyrets.js: cache
// CMS reads for 5 minutes, and let app/api/revalidate/route.js bust the
// relevant tag instantly when an editor publishes in Sanity Studio.
const REVALIDATE_SECONDS = 300

function withCache(tags) {
  return { next: { revalidate: REVALIDATE_SECONDS, tags } }
}

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`, {}, withCache(['siteSettings']))
}

export async function getAgent() {
  return client.fetch(`*[_type == "agent"][0]`, {}, withCache(['agent']))
}

// For team rosters (modern-team) — all agents, ordered for display.
// Solo-agent templates should use getAgent() instead.
export async function getAgents() {
  return client.fetch(`*[_type == "agent"] | order(order asc)`, {}, withCache(['agent']))
}

export async function getNeighborhoods() {
  return client.fetch(`*[_type == "neighborhood"] | order(name asc)`, {}, withCache(['neighborhood']))
}

export async function getNeighborhoodSlugs() {
  return client.fetch(`*[_type == "neighborhood"]{ "slug": slug.current }`, {}, withCache(['neighborhood']))
}

export async function getNeighborhoodBySlug(slug) {
  return client.fetch(
    `*[_type == "neighborhood" && slug.current == $slug][0]`,
    { slug },
    withCache(['neighborhood'])
  )
}

export async function getFieldNotes() {
  return client.fetch(`*[_type == "fieldNote"] | order(_createdAt asc)`, {}, withCache(['fieldNote']))
}

export async function getTestimonials() {
  return client.fetch(`*[_type == "testimonial"] | order(_createdAt desc)`, {}, withCache(['testimonial']))
}

export async function getPosts() {
  return client.fetch(
    `*[_type == "post"] | order(date desc){ ..., "author": author->{name, photo} }`,
    {},
    withCache(['post'])
  )
}

export async function getPostSlugs() {
  return client.fetch(`*[_type == "post"]{ "slug": slug.current }`, {}, withCache(['post']))
}

export async function getPostBySlug(slug) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ ..., "author": author->{name, photo} }`,
    { slug },
    withCache(['post'])
  )
}

export async function getCuratedListings() {
  return client.fetch(`*[_type == "curatedListing"] | order(_createdAt desc)`, {}, withCache(['curatedListing']))
}

export async function getFeaturedCuratedListings() {
  return client.fetch(
    `*[_type == "curatedListing" && featured == true] | order(_createdAt desc)`,
    {},
    withCache(['curatedListing'])
  )
}

export async function getCuratedListingBySlug(slug) {
  return client.fetch(
    `*[_type == "curatedListing" && slug.current == $slug][0]`,
    { slug },
    withCache(['curatedListing'])
  )
}

export async function getPastTransactions() {
  return client.fetch(
    `*[_type == "pastTransaction"] | order(soldDate desc){ ..., "agent": agent->{name, photo, title} }`,
    {},
    withCache(['pastTransaction'])
  )
}

export async function getPastTransactionBySlug(slug) {
  return client.fetch(
    `*[_type == "pastTransaction" && slug.current == $slug][0]{ ..., "agent": agent->{name, photo, title} }`,
    { slug },
    withCache(['pastTransaction'])
  )
}
