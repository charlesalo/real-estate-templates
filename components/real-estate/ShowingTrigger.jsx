'use client'

import { useState } from 'react'
import ScheduleTourModal from '@/components/ui/ScheduleTourModal'

export default function ShowingTrigger({ listing, className, children }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      <ScheduleTourModal
        open={open}
        onClose={() => setOpen(false)}
        propertyImage={listing.image}
        propertyAddress={`${listing.address}, ${listing.city}, ${listing.state}`}
        propertyPrice={listing.price}
        propertyBadge={listing.badge}
      />
    </>
  )
}
