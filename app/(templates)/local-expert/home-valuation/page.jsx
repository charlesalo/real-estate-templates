import HomeValuationClient from './HomeValuationClient'
import { resolveImageSrc } from '@/lib/sanity/image'
import { withFallback } from '@/lib/sanity/utils'
import { getTestimonials, getPastTransactions } from '@/lib/sanity/queries'
import { TESTIMONIAL as TESTIMONIAL_FALLBACK, SOLD_LISTINGS as SOLD_LISTINGS_FALLBACK } from '@/lib/local-expert-data'

function formatSoldDate(value) {
  if (!value) return value
  if (!value.includes('-')) return value // already "May 2026"-style
  return new Date(value).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default async function HomeValuationPage() {
  const [testimonials, pastTransactions] = await Promise.all([getTestimonials(), getPastTransactions()])

  const testimonial = withFallback(testimonials, [TESTIMONIAL_FALLBACK])[0]
  const soldListings = withFallback(pastTransactions, SOLD_LISTINGS_FALLBACK).map((t) => ({
    ...t,
    id: t.id ?? t._id,
    image: resolveImageSrc(t.image ?? t.images?.[0]),
    soldDate: formatSoldDate(t.soldDate),
  }))

  return <HomeValuationClient testimonial={testimonial} soldListings={soldListings} />
}
