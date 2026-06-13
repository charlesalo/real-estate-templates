import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Bed, Bath, Square, Star, Footprints, TramFront, Bike, Utensils, ShoppingBag, Dumbbell, Scissors, Wine } from 'lucide-react'
import { NEIGHBORHOODS, LISTINGS } from '@/lib/local-expert-data'
import { getCensusData } from '@/lib/census'
import { getWalkScore } from '@/lib/walkscore'
import { getNearbyPlaces } from '@/lib/places'
import { getSchools } from '@/lib/schooldigger'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const n = NEIGHBORHOODS.find((n) => n.slug === slug)
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

const PLACE_ICONS = {
  restaurants: Utensils,
  shopping: ShoppingBag,
  active: Dumbbell,
  beauty: Scissors,
  nightlife: Wine,
}

export default async function NeighborhoodDetailPage({ params }) {
  const { slug } = await params
  const neighborhood = NEIGHBORHOODS.find((n) => n.slug === slug)
  if (!neighborhood) notFound()

  const idx = NEIGHBORHOODS.findIndex((n) => n.slug === slug)
  const prev = NEIGHBORHOODS[idx - 1]
  const next = NEIGHBORHOODS[idx + 1]

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

      {/* ─── Quick stats strip ─── */}
      <section className="py-[22px] border-b border-[#E5E0D8]" style={{ backgroundColor: '#F4F0EA' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-wrap gap-x-10 gap-y-5">
          <StripStat value={neighborhood.medianPrice} label="Median Price" />
          <StripStat value={neighborhood.activeListings} label="Active Listings" />
          {walk?.walk?.score != null && <StripStat value={walk.walk.score} label="Walk Score" />}
          {walk?.transit?.score != null && <StripStat value={walk.transit.score} label="Transit Score" />}
          {census?.population?.medianAge > 0 && <StripStat value={census.population.medianAge} label="Median Age" />}
        </div>
      </section>

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

          <p className="text-[17px] text-[#24180F]/70 leading-relaxed">{neighborhood.description}</p>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mt-12">
              {nearby.categories.map((cat) => {
                const places = nearby.places[cat.key] ?? []
                if (places.length === 0) return null
                const Icon = PLACE_ICONS[cat.key]
                return (
                  <div key={cat.key}>
                    <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#BEB7A9]/60">
                      {Icon && <Icon size={15} style={{ color: cat.color }} />}
                      <h3 className="text-[12px] tracking-[0.22em] uppercase text-[#24180F]/70">{cat.label}</h3>
                    </div>
                    <ul className="space-y-4">
                      {places.slice(0, 5).map((p) => (
                        <li key={p.id} className="flex items-baseline justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[15px] text-[#24180F] leading-snug truncate">{p.name}</p>
                            {p.rating != null && (
                              <p className="text-[12px] text-[#2C1E11]/45 mt-0.5 flex items-center gap-1">
                                <Star size={11} className="fill-[#BA5B3E] text-[#BA5B3E]" />
                                {p.rating}
                                <span className="text-[#2C1E11]/30">({p.reviewCount.toLocaleString()})</span>
                              </p>
                            )}
                          </div>
                          <span className="text-[12px] text-[#2C1E11]/40 whitespace-nowrap flex-shrink-0">{p.distance} mi</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
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
                        Grades {s.gradeRange} · {s.address}
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

      {/* ─── Homes in the neighborhood ─── */}
      {localListings.length > 0 && (
        <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F4F0EA' }}>
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <SectionHeader eyebrow="On The Market" title={`Homes in ${neighborhood.name}`} />
              <Link href={`/local-expert/listings?q=${encodeURIComponent(neighborhood.name)}`} className="text-[13px] font-semibold text-[#24180F]/45 hover:text-[#24180F] transition-colors whitespace-nowrap">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {localListings.map((listing) => (
                <Link key={listing.id} href={`/local-expert/listings/${listing.id}`} className="group block rounded-xl overflow-hidden border border-[#E5E0D8] bg-white hover:shadow-md transition-shadow">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={listing.images[0]} alt={listing.address} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <div className="text-[24px] font-normal text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>{formatPrice(listing.price)}</div>
                    <p className="text-[13px] text-[#24180F]/50 mt-0.5">{listing.address}</p>
                    <div className="flex gap-3 mt-2 text-[12px] text-[#24180F]/40">
                      <span className="flex items-center gap-1"><Bed size={10} /> {listing.beds}</span>
                      <span className="flex items-center gap-1"><Bath size={10} /> {listing.baths}</span>
                      <span className="flex items-center gap-1"><Square size={10} /> {listing.sqft.toLocaleString()}</span>
                    </div>
                    <p className="text-[8.5px] text-[#2C1E11]/25 mt-2">Listing Provided Courtesy of {listing.listingBrokerage}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Prev / Next navigation ─── */}
      <section className="py-[64px] border-t border-[#E5E0D8]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex justify-between">
          {prev ? (
            <Link href={`/local-expert/neighborhoods/${prev.slug}`} className="group flex items-center gap-2 text-[14px] text-[#2C1E11]/50 hover:text-[#2C1E11] transition-colors">
              <ArrowLeft size={14} /> <span>{prev.name}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/local-expert/neighborhoods/${next.slug}`} className="group flex items-center gap-2 text-[14px] text-[#2C1E11]/50 hover:text-[#2C1E11] transition-colors">
              <span>{next.name}</span> <ArrowRight size={14} />
            </Link>
          ) : <div />}
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

function StripStat({ value, label }) {
  return (
    <div>
      <div className="text-[24px] font-normal text-[#24180F]" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>{value}</div>
      <div className="text-[12px] uppercase tracking-wider text-[#24180F]/40 mt-0.5">{label}</div>
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

function StarRating({ value }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={15} className={i <= value ? 'fill-[#BA5B3E] text-[#BA5B3E]' : 'text-[#BEB7A9]'} />
      ))}
    </div>
  )
}
