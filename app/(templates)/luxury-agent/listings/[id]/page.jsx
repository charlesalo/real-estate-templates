import { notFound } from 'next/navigation'
import PropertyDetail from '@/components/real-estate/PropertyDetail'
import { getListingById, getFeaturedListings } from '@/lib/simplyrets'

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
