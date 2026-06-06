'use client'

import { useState } from 'react'
import ScheduleTourModal from '@/components/ui/ScheduleTourModal'

export default function ListingActions({ propertyImage, propertyAddress, propertyPrice, propertyBadge }) {
  const [tourOpen, setTourOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setTourOpen(true)}
        className="w-full block text-center py-4 bg-[#C9A96E] text-[#0A0A0A] text-[12px] tracking-[0.2em] uppercase font-semibold font-sans hover:bg-[#b8935a] transition-colors mb-3"
      >
        Request a Private Showing
      </button>

      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent('contact:open'))}
        className="w-full block text-center py-3.5 border border-white/15 text-white/50 text-[12px] tracking-[0.2em] uppercase font-sans hover:border-white/40 hover:text-white transition-all"
      >
        Ask a Question
      </button>

      <ScheduleTourModal
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        propertyImage={propertyImage}
        propertyAddress={propertyAddress}
        propertyPrice={propertyPrice}
        propertyBadge={propertyBadge}
      />
    </>
  )
}
