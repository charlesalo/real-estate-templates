'use client'

import dynamic from 'next/dynamic'

const NeighborhoodMap = dynamic(() => import('./NeighborhoodMap'), { ssr: false })

export default function NeighborhoodMapClient({ neighborhoods }) {
  return <NeighborhoodMap neighborhoods={neighborhoods} />
}
