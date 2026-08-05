'use client'

import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { FALLBACK_BOUNDARIES } from './NeighborhoodMap'

// A focused map for a single neighborhood — draws its NTA boundary (or drops a
// pin when no polygon exists) and frames it. Degrades to a labelled card when
// no Mapbox token is configured.
// NEXT_PUBLIC_ env vars are inlined at build time, so this is a stable constant
// across server and client renders — safe to read during render.
const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export default function NeighborhoodDetailMap({ neighborhood }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const [ready, setReady] = useState(false)

  const boundary = FALLBACK_BOUNDARIES[neighborhood.slug]
  const { lat, lng } = neighborhood.geo

  useEffect(() => {
    if (!TOKEN || !containerRef.current || mapRef.current) return

    mapboxgl.accessToken = TOKEN

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: 13.5,
    })

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
    mapRef.current = map

    map.on('load', () => {
      if (boundary) {
        map.addSource('boundary', {
          type: 'geojson',
          data: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [boundary] } },
        })
        map.addLayer({
          id: 'boundary-fill',
          type: 'fill',
          source: 'boundary',
          paint: { 'fill-color': '#24180F', 'fill-opacity': 0.12 },
        })
        map.addLayer({
          id: 'boundary-line',
          type: 'line',
          source: 'boundary',
          paint: { 'line-color': '#24180F', 'line-width': 2.5, 'line-opacity': 0.9 },
        })

        const bounds = new mapboxgl.LngLatBounds()
        boundary.forEach((c) => bounds.extend(c))
        map.fitBounds(bounds, { padding: 56, duration: 0 })
      } else {
        new mapboxgl.Marker({ color: '#BA5B3E' }).setLngLat([lng, lat]).addTo(map)
      }

      setReady(true)
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!TOKEN) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-[#E5E0D8] shadow-sm h-[340px] lg:h-[460px] bg-[#E5E0D8] flex flex-col items-center justify-center gap-3">
        <MapPin size={28} className="text-[#2C1E11]/30" />
        <p className="text-[13px] text-[#2C1E11]/40 text-center px-8 max-w-sm text-pretty">
          Add <code className="font-mono">NEXT_PUBLIC_MAPBOX_TOKEN</code> to .env.local to enable the interactive {neighborhood.name} map.
        </p>
      </div>
    )
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#E5E0D8] shadow-sm h-[340px] lg:h-[460px] bg-[#E5E0D8]">
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Label chip */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-[#FDFAF6]/95 backdrop-blur px-4 py-2 shadow-sm border border-[#E5E0D8]">
        <MapPin size={14} className="text-[#BA5B3E]" />
        <span className="text-[12px] tracking-[0.18em] uppercase text-[#24180F]/70">
          {neighborhood.name}, {neighborhood.borough}
        </span>
      </div>

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#E5E0D8]">
          <div className="w-6 h-6 border-2 border-[#1B3B2B]/20 border-t-[#1B3B2B] rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
