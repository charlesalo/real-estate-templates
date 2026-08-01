import { notFound } from 'next/navigation'
import PropertyDetail from '../../_components/listings/PropertyDetail'
import { getListingById, getFeaturedListings } from '@/lib/simplyrets'

// Curated luxury interior shots — cohesive neutral palette, same high-end aesthetic.
// Ordered as a logical room walkthrough: living → dining → kitchen → primary bed →
// primary bath → secondary bed → office → outdoor/pool.
// Shown only when the MLS returns fewer than TARGET_PHOTOS photos (demo limitation).
// Real MLS credentials return 20–40 photos and these are never used.
const DEMO_INTERIORS = [
  'https://images.unsplash.com/photo-1617104678098-de229db51175?w=1200&q=80', // dark luxury bedroom
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80', // dark bedroom gold chandelier
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80', // modern kitchen
  'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1200&q=80',    // gray master bedroom
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80', // upscale bedroom
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80', // contemporary exterior night
  'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200&q=80', // resort pool at dusk
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
    const addr = listing.address?.full ?? 'Property'
    return {
      title: addr,
      description: `${addr} — $${listing.listPrice?.toLocaleString()}`,
    }
  } catch {
    return { title: 'Property Detail' }
  }
}

const AGENT = {
  name: 'Victoria Sinclair',
  photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  phone: '(310) 555-0194',
  email: 'victoria@victoriasinclair.com',
}

export default async function PropertyDetailPage({ params }) {
  const { id } = await params

  let listing
  try {
    listing = await getListingById(id)
  } catch {
    notFound()
  }

  let similar = []
  try {
    const raw = await getFeaturedListings(4)
    similar = raw
      .filter(l => l.mlsId !== id)
      .slice(0, 3)
      .map(l => ({
        id: l.mlsId,
        mlsId: l.mlsId,
        price: l.listPrice,
        address: l.address?.full,
        city: l.address?.city,
        beds: l.property?.bedrooms,
        baths: l.property?.bathsFull,
        sqft: l.property?.area,
        status: l.mls?.status ?? 'Active',
        image: l.photos?.[0],
      }))
  } catch { /* non-fatal */ }

  // Supplement MLS photos with curated interiors for demo purposes
  listing.photos = padPhotos(listing.photos ?? [])

  return (
    <div className="pt-20">
      <PropertyDetail
        template="luxury-agent"
        listing={listing}
        similarListings={similar}
        agentName={AGENT.name}
        agentPhoto={AGENT.photo}
        agentPhone={AGENT.phone}
        agentEmail={AGENT.email}
      />
    </div>
  )
}
