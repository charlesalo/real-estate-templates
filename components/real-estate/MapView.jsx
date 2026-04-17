'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

// Dynamically import mapbox-gl only on client to avoid SSR errors
let mapboxgl = null

export default function MapView({
  listings = [],
  center,
  zoom = 11,
  template = 'luxury-agent',
  className,
}) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const [ready, setReady] = useState(false)
  const [noToken, setNoToken] = useState(false)
  const isLuxury = template === 'luxury-agent'

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) { setNoToken(true); return }

    import('mapbox-gl').then(mod => {
      mapboxgl = mod.default
      import('mapbox-gl/dist/mapbox-gl.css')
      mapboxgl.accessToken = token

      if (!containerRef.current || mapRef.current) return

      const defaultCenter = center ?? deriveCenter(listings)

      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: isLuxury ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/light-v11',
        center: defaultCenter,
        zoom,
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

  // Add/update markers when listings or map readiness changes
  useEffect(() => {
    if (!ready || !mapRef.current || !mapboxgl) return

    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    listings.forEach(listing => {
      const { lat, lng } = listing.geo ?? {}
      if (!lat || !lng) return

      const el = document.createElement('div')
      el.className = 'mapbox-marker'
      el.style.cssText = `
        background: #C9A96E;
        color: #0A0A0A;
        font-size: 11px;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 2px;
        white-space: nowrap;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      `
      el.textContent = listing.price
        ? `$${(listing.price / 1000000).toFixed(1)}M`
        : '—'

      const popup = new mapboxgl.Popup({ offset: 12, closeButton: false })
        .setHTML(`
          <div style="font-family:system-ui;padding:4px">
            <div style="font-size:14px;font-weight:600;margin-bottom:2px">$${listing.price?.toLocaleString()}</div>
            <div style="font-size:12px;color:#666">${listing.address ?? ''}</div>
            <div style="font-size:11px;color:#999;margin-top:4px">${listing.beds ?? '—'} bd · ${listing.baths ?? '—'} ba · ${listing.sqft?.toLocaleString() ?? '—'} sqft</div>
          </div>
        `)

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(mapRef.current)

      el.addEventListener('click', () => {
        if (listing.mlsId) window.location.href = `/${template}/listings/${listing.mlsId}`
      })

      markersRef.current.push(marker)
    })
  }, [ready, listings, template])

  if (noToken) {
    return (
      <div className={cn(
        'flex flex-col items-center justify-center gap-3 rounded',
        isLuxury ? 'bg-[#1A1A1A] text-white/40' : 'bg-template-surface text-template-fg/40',
        className ?? 'h-full min-h-[400px]',
      )}>
        <MapPin size={32} strokeWidth={1} />
        <p className="text-sm text-center max-w-xs leading-relaxed">
          Map view requires a Mapbox token.<br />
          Add <code className="text-xs">NEXT_PUBLIC_MAPBOX_TOKEN</code> to <code className="text-xs">.env.local</code>
        </p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative rounded overflow-hidden', className ?? 'h-full min-h-[400px]')}
    />
  )
}

function deriveCenter(listings) {
  const withGeo = listings.filter(l => l.geo?.lat && l.geo?.lng)
  if (!withGeo.length) return [-118.4, 34.07] // Default: Beverly Hills
  const lat = withGeo.reduce((s, l) => s + l.geo.lat, 0) / withGeo.length
  const lng = withGeo.reduce((s, l) => s + l.geo.lng, 0) / withGeo.length
  return [lng, lat]
}
