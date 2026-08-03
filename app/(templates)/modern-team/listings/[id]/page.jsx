import { notFound } from 'next/navigation'
import PropertyDetail from '../../_components/listings/PropertyDetail'
import GatedListing from '../../_components/listings/GatedListing'
import { getListingById, getFeaturedListings } from '@/lib/simplyrets'
import { previewListing, resolveGate } from '@/lib/gating'

// Light, neutral interior photos — suitable for the modern-team aesthetic
const DEMO_INTERIORS = [
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
  'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1200&q=80',
  'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&q=80',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
]

const TARGET_PHOTOS = 7

function padPhotos(realPhotos = []) {
  if (realPhotos.length >= TARGET_PHOTOS) return realPhotos
  const needed = TARGET_PHOTOS - realPhotos.length
  return [...realPhotos, ...DEMO_INTERIORS.slice(0, needed)]
}

export async function generateMetadata({ params }) {
  const { id } = await params
  try {
    const listing = await getListingById(id)
    const addr    = listing.address?.full ?? 'Property'
    return {
      alternates: { canonical: `/modern-team/listings/${id}` },
      title: addr,
      description: `${addr} — $${listing.listPrice?.toLocaleString()} · The Hargrove Group`,
    }
  } catch {
    return { title: 'Property Detail' }
  }
}

const AGENT = {
  name:      'The Hargrove Group',
  brokerage: 'Realty Associates of Texas',
  photo:     '/images/modern-team/The Hargrove Group Placeholder.png',
  phone:     '(713) 555-0182',
  email:     'hello@hargrovegroup.com',
}

export default async function PropertyDetailPage({ params }) {
  const { id } = await params

  let listing
  try {
    listing = await getListingById(id)
  } catch {
    notFound()
  }

  // Signed-out visitors get the teaser only. generateMetadata above still runs
  // on the full listing, so the page keeps its title/description for search
  // engines and link previews — only the page body is withheld.
  const { gated } = await resolveGate()
  if (gated) {
    return (
      <div className="pt-20">
        <GatedListing listing={previewListing(listing)} teamName={AGENT.name} />
      </div>
    )
  }

  // Pad photos for demo credentials
  if (listing.photos) {
    listing = { ...listing, photos: padPhotos(listing.photos) }
  }

  let similar = []
  try {
    const raw = await getFeaturedListings(4)
    similar = raw
      .filter(l => l.mlsId !== listing.mlsId)
      .slice(0, 3)
      .map(l => ({
        id:      l.mlsId,
        mlsId:   l.mlsId,
        price:   l.listPrice,
        address: l.address?.full,
        city:    l.address?.city,
        state:   l.address?.state,
        beds:    l.property?.bedrooms,
        baths:   l.property?.bathsFull,
        sqft:    l.property?.area,
        status:  l.mls?.status ?? 'Active',
        image:   l.photos?.[0],
      }))
  } catch {}

  return (
    <div className="pt-20">
      <PropertyDetail
        listing={listing}
        similarListings={similar}
        agentName={AGENT.name}
        agentBrokerage={AGENT.brokerage}
        agentPhoto={AGENT.photo}
        agentPhone={AGENT.phone}
        agentEmail={AGENT.email}
      />
    </div>
  )
}
