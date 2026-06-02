'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import 'mapbox-gl/dist/mapbox-gl.css'

let mapboxgl = null

export default function NeighborhoodMap({ neighborhoods }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const [active, setActive] = useState(neighborhoods[0])
  const [ready, setReady] = useState(false)
  const [noToken, setNoToken] = useState(false)

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) { setNoToken(true); return }

    import('mapbox-gl').then(mod => {
      mapboxgl = mod.default
      mapboxgl.accessToken = token

      if (!containerRef.current || mapRef.current) return

      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-73.985, 40.730],
        zoom: 11.5,
      })

      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
      mapRef.current = map
      map.on('load', () => setReady(true))
    })

    return () => {
      markersRef.current.forEach(m => m.remove())
      markersRef.current = []
      mapRef.current?.remove()
      mapRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!ready || !mapRef.current || !mapboxgl) return

    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    neighborhoods.forEach(n => {
      const { lat, lng } = n.geo ?? {}
      if (!lat || !lng) return

      const el = document.createElement('div')
      el.style.cssText = `
        width: 8px; height: 8px;
        background: #1B3B2B; border-radius: 50%;
        border: 2px solid #F8F3EB;
        box-shadow: 0 0 0 2px #1B3B2B;
        cursor: pointer; transition: transform 0.2s;
      `
      el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.6)' })
      el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })

      const popup = new mapboxgl.Popup({
        offset: 16,
        closeButton: false,
        className: 'le-popup',
      }).setHTML(`
        <div style="padding: 10px 14px; min-width: 160px;">
          <div style="font-size: 13px; font-weight: 700; color: #2C1E11; margin-bottom: 2px;">${n.name}</div>
          <div style="font-size: 11px; color: #2C1E11; opacity: 0.5;">${n.borough}</div>
          <div style="font-size: 11px; color: #2C1E11; margin-top: 6px;">${n.activeListings} active · from ${n.medianPrice}</div>
        </div>
      `)

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(mapRef.current)

      el.addEventListener('click', () => setActive(n))
      markersRef.current.push(marker)
    })
  }, [ready, neighborhoods])

  // Fly to active neighborhood
  useEffect(() => {
    if (!ready || !mapRef.current || !active?.geo) return
    mapRef.current.flyTo({
      center: [active.geo.lng, active.geo.lat],
      zoom: 13.5,
      duration: 800,
      essential: true,
    })
  }, [active, ready])

  if (noToken) {
    return <NoTokenFallback neighborhoods={neighborhoods} active={active} setActive={setActive} />
  }

  return (
    <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-[#E5E0D8] shadow-sm" style={{ minHeight: 520 }}>
      {/* Map */}
      <div className="relative lg:w-[58%] h-[300px] lg:h-auto bg-[#E5E0D8]">
        <div ref={containerRef} className="absolute inset-0" />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#E5E0D8]">
            <div className="w-6 h-6 border-2 border-[#1B3B2B]/20 border-t-[#1B3B2B] rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Neighborhood list panel */}
      <SidePanel neighborhoods={neighborhoods} active={active} setActive={setActive} />
    </div>
  )
}

function SidePanel({ neighborhoods, active, setActive }) {
  return (
    <div
      className="lg:w-[42%] overflow-y-auto divide-y"
      style={{ backgroundColor: '#FDFAF6', borderColor: '#E5E0D8', maxHeight: 520 }}
    >
      {neighborhoods.map((n) => {
        const isActive = active?.slug === n.slug
        return (
          <button
            key={n.slug}
            onClick={() => setActive(n)}
            className="w-full text-left"
          >
            <div
              className={cn(
                'flex gap-3 px-5 py-4 transition-colors duration-150',
                isActive ? 'bg-[#1B3B2B]/5' : 'hover:bg-[#1B3B2B]/[0.03]',
              )}
            >
              <img
                src={n.image}
                alt={n.name}
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-[#24180F]/40 uppercase tracking-wider mb-0.5">{n.borough}</p>
                    <p
                      className="text-[15px] font-bold text-[#24180F] leading-snug"
                      style={{ fontFamily: 'var(--font-gelasio, Georgia, serif)' }}
                    >
                      {n.name}
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-[#1B3B2B] flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-[11px] text-[#2C1E11]/50 mt-1 leading-snug line-clamp-2">
                  {n.tagline}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] text-[#2C1E11]/50">From {n.medianPrice}</span>
                  <span className="text-[#2C1E11]/20">·</span>
                  <span className="text-[10px] text-[#2C1E11]/50">{n.activeListings} listings</span>
                </div>
              </div>
            </div>

            {/* Expanded detail when active */}
            {isActive && (
              <div className="px-5 pb-4 bg-[#1B3B2B]/5">
                <p className="text-[12px] text-[#2C1E11]/60 leading-relaxed mb-3">
                  {n.description.slice(0, 120)}…
                </p>
                <Link
                  href={`/local-expert/neighborhoods/${n.slug}`}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2C1E11] hover:opacity-70 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  Open the {n.name} guide <ArrowRight size={11} />
                </Link>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

function NoTokenFallback({ neighborhoods, active, setActive }) {
  return (
    <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-[#E5E0D8] shadow-sm" style={{ minHeight: 520 }}>
      {/* Static map placeholder */}
      <div className="lg:w-[58%] h-[300px] lg:h-auto bg-[#E5E0D8] flex flex-col items-center justify-center gap-3">
        <MapPin size={28} className="text-[#2C1E11]/30" />
        <p className="text-[12px] text-[#2C1E11]/40 text-center px-8">
          Add <code className="font-mono">NEXT_PUBLIC_MAPBOX_TOKEN</code> to .env.local to enable the interactive map.
        </p>
      </div>
      <SidePanel neighborhoods={neighborhoods} active={active} setActive={setActive} />
    </div>
  )
}
