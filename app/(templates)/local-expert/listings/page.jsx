import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Bed, Bath, Square } from 'lucide-react'
import { LISTINGS, SOLD_LISTINGS as SOLD_LISTINGS_FALLBACK } from '@/lib/local-expert-data'
import { resolveImageSrc } from '@/lib/sanity/image'
import { withFallback } from '@/lib/sanity/utils'
import { getPastTransactions } from '@/lib/sanity/queries'

function formatSoldDate(value) {
  if (!value) return value
  if (!value.includes('-')) return value // already "May 2026"-style
  return new Date(value).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export const metadata = {
  title: { absolute: 'New York Homes for Sale & Real Estate Listings | Nadia Osei' },
  description: 'Browse curated homes for sale across Manhattan and Brooklyn. Find co-ops, condos, and townhouses in West Village, Tribeca, Brooklyn Heights, and more.',
}

const PER_PAGE = 3

function formatPrice(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`
  return `$${n.toLocaleString()}`
}

function clampPage(value, totalPages) {
  const n = parseInt(Array.isArray(value) ? value[0] : value, 10)
  if (!Number.isFinite(n) || n < 1) return 1
  return Math.min(n, totalPages)
}

function buildHref(sp, overrides) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(sp || {})) {
    const v = Array.isArray(value) ? value[0] : value
    if (v) params.set(key, v)
  }
  for (const [key, value] of Object.entries(overrides)) {
    if (value) params.set(key, String(value))
    else params.delete(key)
  }
  const qs = params.toString()
  return `/local-expert/listings${qs ? `?${qs}` : ''}`
}

export default async function ListingsPage({ searchParams }) {
  const sp = await searchParams
  const rawQ = sp?.q ?? ''
  const q = rawQ.toLowerCase()
  const filtered = q
    ? LISTINGS.filter(
        (l) =>
          l.neighborhood.toLowerCase().includes(q) ||
          l.address.toLowerCase().includes(q) ||
          l.type.toLowerCase().includes(q),
      )
    : LISTINGS

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const page = clampPage(sp?.page, totalPages)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const pastTransactions = await getPastTransactions()
  const SOLD_LISTINGS = withFallback(pastTransactions, SOLD_LISTINGS_FALLBACK).map((t) => ({
    ...t,
    id: t.id ?? t._id,
    image: resolveImageSrc(t.image ?? t.images?.[0]),
    soldDate: formatSoldDate(t.soldDate),
  }))

  const soldTotalPages = Math.max(1, Math.ceil(SOLD_LISTINGS.length / PER_PAGE))
  const soldPage = clampPage(sp?.soldPage, soldTotalPages)
  const paginatedSold = SOLD_LISTINGS.slice((soldPage - 1) * PER_PAGE, soldPage * PER_PAGE)

  return (
    <>
      <section className="pt-[112px] pb-[96px] lg:pt-[144px] lg:pb-[128px]" style={{ backgroundColor: '#F8F3EB' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          {/* Header */}
          <div className="mb-10">
            <p className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-3">Chapter Three</p>
            <h1
              className="text-[43px] lg:text-[58px] font-normal text-[#24180F] leading-[1.05] mb-4"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              Curated Local Homes
            </h1>
            <p className="text-[16px] text-[#2C1E11]/50 max-w-xl">
              {filtered.length} active listing{filtered.length !== 1 ? 's' : ''} in neighborhoods I know block by block.
              {q && ` Showing results for "${rawQ}".`}
            </p>
          </div>

          {/* Listings — alternating image/details rows */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[#2C1E11]/40">No listings match your search. <Link href="/local-expert/listings" className="underline">Clear filters</Link></p>
            </div>
          ) : (
            <div key={page} className="le-page-enter">
              <div className="space-y-16 lg:space-y-24">
                {paginated.map((listing, i) => (
                  <ListingRow key={listing.id} listing={listing} reverse={i % 2 === 1} priority={page === 1 && i === 0} />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} param="page" sp={sp} />
            </div>
          )}
        </div>
      </section>

      {/* ─── RECENT SALES — color-blocked to set it apart from active listings ── */}
      <section className="py-[96px] lg:py-[128px]" style={{ backgroundColor: '#F2ECE1' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="mb-10">
            <p className="text-[12px] tracking-[0.4em] uppercase text-[#BA5B3E] mb-3">Proven Track Record</p>
            <h2
              className="text-[34px] lg:text-[45px] font-normal text-[#24180F] leading-tight mb-4"
              style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
            >
              Recent Sales
            </h2>
            <p className="text-[16px] text-[#2C1E11]/50 max-w-xl">
              Fourteen years and 240 closings in these blocks — the same comps I&apos;d point to if a
              buyer asked why the price made sense.
            </p>
          </div>

          <div key={soldPage} className="le-page-enter">
            <div className="space-y-16 lg:space-y-24">
              {paginatedSold.map((sale, i) => (
                <SoldRow key={sale.id} sale={sale} reverse={i % 2 === 1} />
              ))}
            </div>
            <Pagination page={soldPage} totalPages={soldTotalPages} param="soldPage" sp={sp} />
          </div>
        </div>
      </section>
    </>
  )
}

function Pagination({ page, totalPages, param, sp }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-14">
      {page > 1 ? (
        <Link
          href={buildHref(sp, { [param]: page - 1 })}
          scroll={false}
          className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-[#2C1E11]/60 hover:text-[#BA5B3E] transition-colors"
        >
          <ArrowLeft size={13} /> Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-[#2C1E11]/25">
          <ArrowLeft size={13} /> Prev
        </span>
      )}

      <div className="flex items-center gap-1.5">
        {pages.map((p) => (
          <Link
            key={p}
            href={buildHref(sp, { [param]: p })}
            scroll={false}
            aria-current={p === page ? 'page' : undefined}
            className={`flex items-center justify-center w-9 h-9 rounded-full text-[13px] font-semibold transition-colors ${
              p === page ? 'bg-[#1B3B2B] text-[#F8F3EB]' : 'text-[#2C1E11]/55 hover:bg-[#E5E0D8]'
            }`}
          >
            {p}
          </Link>
        ))}
      </div>

      {page < totalPages ? (
        <Link
          href={buildHref(sp, { [param]: page + 1 })}
          scroll={false}
          className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-[#2C1E11]/60 hover:text-[#BA5B3E] transition-colors"
        >
          Next <ArrowRight size={13} />
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-[#2C1E11]/25">
          Next <ArrowRight size={13} />
        </span>
      )}
    </nav>
  )
}

function ListingRow({ listing, reverse = false, priority = false }) {
  return (
    <Link href={`/local-expert/listings/${listing.id}`} className="group block">
      <div className={`grid grid-cols-1 gap-8 lg:gap-12 items-center ${reverse ? 'lg:grid-cols-[1fr_640px]' : 'lg:grid-cols-[640px_1fr]'}`}>
        <div className={`relative aspect-[3/2] w-full max-w-[640px] rounded-2xl overflow-hidden lg:row-start-1 ${reverse ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
          <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-[#24180F] text-[#F8F3EB]">
            {listing.status}
          </span>
          <Image
            src={listing.images[0]}
            alt={listing.address}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className={`lg:row-start-1 ${reverse ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#BA5B3E] mb-3">{listing.status} · {listing.type}</p>
          <div
            className="text-[44px] lg:text-[52px] font-normal text-[#24180F] leading-none transition-colors group-hover:text-[#BA5B3E]"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            {formatPrice(listing.price)}
          </div>
          <p className="text-[18px] text-[#24180F]/70 mt-4" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
            {listing.address}
          </p>
          <p className="text-[14px] text-[#24180F]/45 mt-1">{listing.neighborhood}, {listing.city} {listing.zip}</p>
          <div className="flex items-center justify-between gap-6 mt-6 pt-6 border-t border-[#BEB7A9]/50 text-[12px] tracking-[0.16em] uppercase text-[#24180F]/55">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5"><Bed size={13} /> {listing.beds} bd</span>
              <span className="flex items-center gap-1.5"><Bath size={13} /> {listing.baths} ba</span>
              <span className="flex items-center gap-1.5"><Square size={13} /> {listing.sqft.toLocaleString()} sqft</span>
            </div>
            <Image
              src="/images/RLS at REBNY.png"
              alt="RLS at REBNY"
              width={40}
              height={24}
              className="h-6 w-auto flex-shrink-0"
            />
          </div>
          <p className="text-[9px] text-[#2C1E11]/25 mt-4">
            Listing Provided Courtesy of {listing.listingBrokerage} · {listing.mlsId}
          </p>
        </div>
      </div>
    </Link>
  )
}

function SoldRow({ sale, reverse = false }) {
  return (
    <div className="group block">
      <div className={`grid grid-cols-1 gap-8 lg:gap-12 items-center ${reverse ? 'lg:grid-cols-[1fr_640px]' : 'lg:grid-cols-[640px_1fr]'}`}>
        <div className={`relative aspect-[3/2] w-full max-w-[640px] rounded-2xl overflow-hidden lg:row-start-1 ${reverse ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
          <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full bg-[#24180F] text-[#F8F3EB]">
            Sold
          </span>
          <Image
            src={sale.image}
            alt={sale.address}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className={`lg:row-start-1 ${reverse ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#BA5B3E] mb-3">Sold · {sale.type}</p>
          <div
            className="text-[44px] lg:text-[52px] font-normal text-[#24180F] leading-none"
            style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
          >
            {formatPrice(sale.soldPrice)}
          </div>
          <p className="text-[18px] text-[#24180F]/70 mt-4" style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}>
            {sale.address}
          </p>
          <p className="text-[14px] text-[#24180F]/45 mt-1">{sale.neighborhood}, {sale.city} · Closed {sale.soldDate}</p>
          <div className="flex items-center justify-between gap-6 mt-6 pt-6 border-t border-[#BEB7A9]/50 text-[12px] tracking-[0.16em] uppercase text-[#24180F]/55">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5"><Bed size={13} /> {sale.beds} bd</span>
              <span className="flex items-center gap-1.5"><Bath size={13} /> {sale.baths} ba</span>
              <span className="flex items-center gap-1.5"><Square size={13} /> {sale.sqft.toLocaleString()} sqft</span>
            </div>
            <Image
              src="/images/RLS at REBNY.png"
              alt="RLS at REBNY"
              width={40}
              height={24}
              className="h-6 w-auto flex-shrink-0"
            />
          </div>
          <p className="text-[9px] text-[#2C1E11]/25 mt-4">
            Listing Provided Courtesy of {sale.listingBrokerage} · {sale.mlsId}
          </p>
        </div>
      </div>
    </div>
  )
}
