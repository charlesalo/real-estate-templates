import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Bed, Bath, Square, Star, Footprints, TramFront, Bike } from 'lucide-react'
import { NEIGHBORHOODS as NEIGHBORHOODS_FALLBACK, LISTINGS } from '@/lib/local-expert-data'
import { getCensusData } from '@/lib/census'
import { getWalkScore } from '@/lib/walkscore'
import { getNearbyPlaces } from '@/lib/places'
import { getSchools } from '@/lib/schooldigger'
import { notFound } from 'next/navigation'
import NeighborhoodNearby from './NeighborhoodNearby'
import NeighborhoodDetailMapClient from '../../NeighborhoodDetailMapClient'
import PortableText from '@/components/sanity/PortableText'
import { resolveImageSrc } from '@/lib/sanity/image'
import { withFallback, isPortableText } from '@/lib/sanity/utils'
import { getNeighborhoods } from '@/lib/sanity/queries'

// Normalizes a Sanity `neighborhood` doc (or fallback demo data) to the
// plain shape this page's presentational helpers already render.
function normalizeNeighborhood(n) {
  if (!n) return n
  return {
    ...n,
    slug: n.slug?.current ?? n.slug,
    borough: n.borough ?? n.region,
    image: resolveImageSrc(n.image),
  }
}

async function getAllNeighborhoods() {
  const neighborhoods = await getNeighborhoods()
  return withFallback(neighborhoods, NEIGHBORHOODS_FALLBACK).map(normalizeNeighborhood)
}

export async function generateStaticParams() {
  const neighborhoods = await getAllNeighborhoods()
  return neighborhoods.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const neighborhoods = await getAllNeighborhoods()
  const n = neighborhoods.find((n) => n.slug === slug)
  if (!n) return {}
  return {
    title: `${n.name} — NYC Neighborhood Guide`,
    description: n.tagline,
  }
}

function formatPrice(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`
  return `$${n.toLocaleString()}`
}

export default async function NeighborhoodDetailPage({ params }) {
  const { slug } = await params
  const NEIGHBORHOODS = await getAllNeighborhoods()
  const neighborhood = NEIGHBORHOODS.find((n) => n.slug === slug)
  if (!neighborhood) notFound()

  const idx = NEIGHBORHOODS.findIndex((n) => n.slug === slug)
  const prev = NEIGHBORHOODS[idx - 1]
  const next = NEIGHBORHOODS[idx + 1]

  // Two neighborhood cards for the editorial CTA. Prefer the adjacent guides;
  // backfill from the rest of the list at the edges so we always show a pair.
  const otherNeighborhoods = [prev, next].filter(Boolean)
  for (const n of NEIGHBORHOODS) {
    if (otherNeighborhoods.length >= 2) break
    if (n.slug === slug || otherNeighborhoods.some((o) => o.slug === n.slug)) continue
    otherNeighborhoods.push(n)
  }

  const localListings = LISTINGS.filter((l) => l.neighborhood === neighborhood.name).slice(0, 3)

  const { lat, lng } = neighborhood.geo
  const addressLabel = `${neighborhood.name}, NY ${neighborhood.zip}`

  // Live data — pulled in parallel. Each helper returns null on failure or a
  // missing key, so every section below degrades gracefully on its own.
  const [census, walk, nearby, schools] = await Promise.all([
    getCensusData(neighborhood.zip),
    getWalkScore(lat, lng, addressLabel),
    getNearbyPlaces(lat, lng),
    getSchools(neighborhood.zip, 'NY'),
  ])

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="relative h-[55vh] min-h-[400px]">
          <Image src={neighborhood.image} alt={neighborhood.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B3B2B]/85 via-[#1B3B2B]/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-7xl mx-auto px-5 lg:px-8 pb-9 lg:pb-12">
              <Link href="/local-expert/neighborhoods" className="inline-flex items-center gap-1.5 text-[12px] text-white/55 hover:text-white transition-colors mb-5">
                <ArrowLeft size={12} /> All Neighborhoods
              </Link>
              <p className="text-[12px] tracking-[0.4em] uppercase text-white/50 mb-2">
                {[neighborhood.borough, ...neighborhood.vibes].join(' · ')}
              </p>
              <h1 className="text-[52px] lg:text-[68px] font-normal text-white leading-[1.0]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                {neighborhood.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured properties ─── */}
      {localListings.length > 0 && (
        <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F4F0EA' }}>
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <SectionHeader eyebrow="On The Market" title={`Featured in ${neighborhood.name}`} />
              <Link href={`/local-expert/listings?q=${encodeURIComponent(neighborhood.name)}`} className="text-[13px] font-semibold text-[#24180F]/55 hover:text-[#BA5B3E] transition-colors whitespace-nowrap">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {localListings.map((listing) => (
                <Link key={listing.id} href={`/local-expert/listings/${listing.id}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5">
                    <Image src={listing.images[0]} alt={listing.address} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="text-[28px] font-normal text-[#24180F] leading-none transition-colors group-hover:text-[#BA5B3E]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                    {formatPrice(listing.price)}
                  </div>
                  <p className="text-[14px] text-[#24180F]/55 mt-2">{listing.address}</p>
                  <div className="flex gap-5 mt-4 pt-4 border-t border-[#BEB7A9]/50 text-[11px] tracking-[0.16em] uppercase text-[#24180F]/50">
                    <span className="flex items-center gap-1.5"><Bed size={12} /> {listing.beds} bd</span>
                    <span className="flex items-center gap-1.5"><Bath size={12} /> {listing.baths} ba</span>
                    <span className="flex items-center gap-1.5"><Square size={12} /> {listing.sqft.toLocaleString()} sqft</span>
                  </div>
                  <p className="text-[9px] text-[#2C1E11]/25 mt-3">Listing Provided Courtesy of {listing.listingBrokerage}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Editorial intro ─── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-4 mb-7">
            <span className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] whitespace-nowrap">The Guide</span>
            <div className="h-px flex-1 bg-[#BEB7A9]" />
          </div>

          <blockquote className="border-l-2 border-[#BA5B3E] pl-5 mb-9">
            <p className="text-[22px] lg:text-[26px] italic text-[#24180F] leading-snug" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
              &ldquo;{neighborhood.quote}&rdquo;
            </p>
          </blockquote>

          <div className="text-[17px] text-[#24180F]/70 leading-relaxed [&_p]:mb-4 last:[&_p]:mb-0">
            {isPortableText(neighborhood.description) ? (
              <PortableText value={neighborhood.description} />
            ) : (
              <p>{neighborhood.description}</p>
            )}
          </div>

          <div className="mt-12">
            <h2 className="text-[20px] font-normal text-[#24180F] mb-5" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
              What to know
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
              {neighborhood.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-[16px] text-[#24180F]/65">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B9E8B] flex-shrink-0" />{h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Getting around — Walk Score ─── */}
      {walk && (
        <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F2ECE1' }}>
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <SectionHeader eyebrow="On Foot & On Rails" title="Getting around" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">
              <ScoreCard icon={Footprints} score={walk.walk?.score} label="Walk Score" description={walk.walk?.description} />
              <ScoreCard icon={TramFront} score={walk.transit?.score} label="Transit Score" description={walk.transit?.description} />
              <ScoreCard icon={Bike} score={walk.bike?.score} label="Bike Score" description={walk.bike?.description} />
            </div>
            <p className="text-[11px] text-[#2C1E11]/35 mt-8">Walkability, transit and bike data via Walk Score®.</p>
          </div>
        </section>
      )}

      {/* ─── By the numbers — Census ─── */}
      {census && (
        <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <SectionHeader eyebrow="Who Lives Here" title="By the numbers" />

            {/* Headline figures */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-12 mb-16 border-y border-[#BEB7A9]/60 py-10">
              <FigureStat value={census.population?.total} label="Residents" />
              <FigureStat value={census.income?.medianHousehold} label="Median Household Income" />
              <FigureStat value={census.housing?.medianValue} label="Median Home Value" />
              <FigureStat value={census.housing?.medianRent} label="Median Rent" />
            </div>

            {/* Distributions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-14">
              {census.age && <BarList title="Age distribution" rows={census.age} />}
              {census.education && <BarList title="Educational attainment" rows={census.education} />}
              {census.race && <BarList title="Race & ethnicity" rows={census.race} />}
              {census.housing && (
                <BarList
                  title="Housing tenure"
                  rows={[
                    { label: 'Owner-occupied', pct: census.housing.ownerPct },
                    { label: 'Renter-occupied', pct: census.housing.renterPct },
                  ]}
                />
              )}
            </div>
            <p className="text-[11px] text-[#2C1E11]/35 mt-12">
              Source: U.S. Census Bureau, American Community Survey (5-year) for ZIP {census.zip}.
            </p>
          </div>
        </section>
      )}

      {/* ─── Around the block — Google Places ─── */}
      {nearby && (
        <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F4F0EA' }}>
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <SectionHeader eyebrow="The Field Guide" title="Around the block" />
            <NeighborhoodNearby categories={nearby.categories} places={nearby.places} />
            <p className="text-[11px] text-[#2C1E11]/35 mt-12">Nearby places within roughly two miles, via Google Places.</p>
          </div>
        </section>
      )}

      {/* ─── Schools — SchoolDigger ─── */}
      {schools && schools.length > 0 && (
        <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <SectionHeader eyebrow="For The Families" title="Schools nearby" />
            <div className="mt-12 border-t border-[#BEB7A9]/60">
              {schools
                .slice()
                .sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1))
                .slice(0, 6)
                .map((s) => (
                  <div
                    key={s.id}
                    className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-3 lg:gap-10 py-6 border-b border-[#BEB7A9]/40"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="text-[19px] font-normal text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
                          {s.url ? (
                            <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#BA5B3E] transition-colors">
                              {s.name}
                            </a>
                          ) : s.name}
                        </h3>
                        {s.isPrivate && <SchoolTag>Private</SchoolTag>}
                        {s.isCharter && <SchoolTag>Charter</SchoolTag>}
                        {s.isMagnet && <SchoolTag>Magnet</SchoolTag>}
                      </div>
                      <p className="text-[13px] text-[#2C1E11]/50">
                        Grades {s.gradeRange}
                        {s.address && (
                          <>
                            {' · '}
                            <a href={s.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#BA5B3E] transition-colors">
                              {s.address}
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                    {s.rating != null && <StarRating value={s.rating} />}
                  </div>
                ))}
            </div>
            <p className="text-[11px] text-[#2C1E11]/35 mt-8">School ratings via SchoolDigger. Always verify enrollment zoning directly.</p>
          </div>
        </section>
      )}

      {/* ─── On the map ─── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F4F0EA' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader eyebrow="On The Map" title={`Where ${neighborhood.name} sits`} />
          <div className="mt-12">
            <NeighborhoodDetailMapClient neighborhood={neighborhood} />
          </div>
          <p className="text-[11px] text-[#2C1E11]/35 mt-8">
            Boundary approximate, from NYC Open Data (2020 Neighborhood Tabulation Areas). Map © Mapbox © OpenStreetMap.
          </p>
        </div>
      </section>

      {/* ─── Explore nearby neighborhoods — editorial CTA ─── */}
      <section className="py-[96px] lg:py-[128px] border-t border-[#E5E0D8]" style={{ backgroundColor: '#F2ECE1' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHeader eyebrow="Keep Wandering" title="Explore nearby neighborhoods" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
            {otherNeighborhoods.map((n) => (
              <Link
                key={n.slug}
                href={`/local-expert/neighborhoods/${n.slug}`}
                className="group relative block aspect-[16/10] lg:aspect-[3/2] rounded-2xl overflow-hidden"
              >
                <Image
                  src={n.image}
                  alt={n.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3B2B]/90 via-[#1B3B2B]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <p className="text-[11px] tracking-[0.28em] uppercase text-white/55 mb-2">
                    {[n.borough, ...n.vibes].join(' · ')}
                  </p>
                  <div className="flex items-end justify-between gap-4">
                    <h3
                      className="text-[30px] lg:text-[34px] font-normal text-white leading-none"
                      style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                    >
                      {n.name}
                    </h3>
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/40 text-white transition-colors group-hover:bg-white group-hover:text-[#1B3B2B] group-hover:border-white">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/local-expert/neighborhoods"
            className="inline-flex items-center gap-1.5 mt-10 text-[13px] font-semibold text-[#2C1E11] hover:text-[#BA5B3E] transition-colors"
          >
            View all neighborhood guides <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ─── CONTACT TEASER ───────────────────────────────────────────── */}
      <section className="relative py-[120px] lg:py-[168px] overflow-hidden">
        {/* Full-bleed background */}
        <Image
          src="https://images.unsplash.com/photo-1440613905118-99b921706b5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Dumbo Manhattan Bridge"
          fill
          className="object-cover object-center"
        />
        {/* Dark green overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.38)' }} />

        {/* Content */}
        <div className="relative max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <p className="text-[12px] tracking-[0.4em] uppercase text-white mb-4">Let&apos;s Work Together</p>
          <h2
            className="text-[34px] lg:text-[45px] font-normal text-[#F8F3EB] leading-tight mb-5"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            The right home<br className="sm:hidden" /> is a feeling.<br />I know how to find it.
          </h2>
          <p className="text-[16px] text-white/80 mb-8 max-w-md mx-auto leading-relaxed">
            Not sure where to start? Tell me what you&apos;re looking for — or what you&apos;re running from.
            I know this city. I&apos;ll help.
          </p>
          <Link
            href="/local-expert/contact"
            className="inline-flex items-center px-8 py-3.5 text-[14px] font-bold rounded-full bg-[#F8F3EB] text-[#1B3B2B] hover:bg-white transition-colors"
          >
            Start the conversation
          </Link>
        </div>
      </section>

    </>
  )
}

// ─── Presentational helpers ────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title }) {
  return (
    <div>
      <p className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-3">{eyebrow}</p>
      <h2 className="text-[34px] lg:text-[45px] font-normal text-[#24180F] leading-tight" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
        {title}
      </h2>
    </div>
  )
}

function FigureStat({ value, label }) {
  return (
    <div>
      <div className="text-[40px] lg:text-[46px] font-normal text-[#1B3B2B] leading-none" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
        {value ?? 'N/A'}
      </div>
      <div className="text-[12px] uppercase tracking-[0.16em] text-[#24180F]/45 mt-3">{label}</div>
    </div>
  )
}

function ScoreCard({ icon: Icon, score, label, description }) {
  if (score == null) return null
  return (
    <div className="rounded-2xl border border-[#E5E0D8] bg-[#FDFAF6] p-7">
      <div className="flex items-center gap-2.5 mb-5">
        <Icon size={16} className="text-[#1B3B2B]" />
        <span className="text-[12px] tracking-[0.22em] uppercase text-[#24180F]/55">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-[58px] leading-none font-normal text-[#1B3B2B]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>{score}</span>
        <span className="text-[15px] text-[#2C1E11]/35">/ 100</span>
      </div>
      {description && <p className="text-[14px] text-[#24180F]/60 mt-4 leading-relaxed">{description}</p>}
    </div>
  )
}

function BarList({ title, rows }) {
  return (
    <div>
      <h3 className="text-[20px] font-normal text-[#24180F] mb-6" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>{title}</h3>
      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-[14px] text-[#24180F]/70">{r.label}</span>
              <span className="text-[14px] tabular-nums text-[#1B3B2B]">{r.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#BEB7A9]/30 overflow-hidden">
              <div className="h-full rounded-full bg-[#1B3B2B]/75" style={{ width: `${Math.min(r.pct, 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SchoolTag({ children }) {
  return (
    <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border border-[#BEB7A9]/70 text-[#2C1E11]/55">
      {children}
    </span>
  )
}

function StarRating({ value, size = 15 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= value ? 'fill-[#BA5B3E] text-[#BA5B3E]' : 'fill-[#BEB7A9]/30 text-[#BEB7A9]'} />
      ))}
    </div>
  )
}
