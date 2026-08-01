'use client'

import dynamic from 'next/dynamic'

const NeighborhoodDetailMap = dynamic(() => import('./NeighborhoodDetailMap'), { ssr: false })

export default function NeighborhoodDetailMapClient({ neighborhood }) {
  return <NeighborhoodDetailMap neighborhood={neighborhood} />
}
