'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import 'mapbox-gl/dist/mapbox-gl.css'

// Dynamically import mapbox-gl only on client to avoid SSR errors
let mapboxgl = null

/**
 * Neutral fallback so the map renders standalone. Templates pass their own
 * palette via `theme` — see each template's _components/listings/mapTheme.js.
 * Deliberately brand-free: this file is shared, so it must not know what any
 * particular template looks like.
 */
const DEFAULT_THEME = {
  mapStyle:         'mapbox://styles/mapbox/light-v11',
  markerBg:         '#374151',
  markerText:       '#FFFFFF',
  popupBg:          '#111827',
  popupText:        '#FFFFFF',
  popupMuted:       'rgba(255,255,255,0.65)',
  placeholderClass: 'bg-neutral-100 text-neutral-500',
}

export default function MapView({
  listings = [],
  center,
  zoom = 11,
  template,
  theme,
  className,
}) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const [ready, setReady] = useState(false)
  const [noToken, setNoToken] = useState(false)

  // Destructured to primitives: the marker effect depends on these, and a
  // merged object would be a new reference every render.
  const {
    mapStyle, markerBg, markerText, popupBg, popupText, popupMuted, placeholderClass,
  } = { ...DEFAULT_THEME, ...theme }

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) { setNoToken(true); return }

    import('mapbox-gl').then(mod => {
      mapboxgl = mod.default
      mapboxgl.accessToken = token

      if (!containerRef.current || mapRef.current) return

      const defaultCenter = center ?? deriveCenter(listings)

      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: mapStyle,
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
        background: ${markerBg};
        color: ${markerText};
        font-size: 11px;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 4px;
        white-space: nowrap;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      `
      el.textContent = listing.price
        ? `$${(listing.price / 1000000).toFixed(1)}M`
        : '—'

      const popup = new mapboxgl.Popup({ offset: 12, closeButton: false })
        .setHTML(`
          <div style="font-family:system-ui;padding:4px;background:${popupBg};border-radius:6px;min-width:160px">
            <div style="font-size:14px;font-weight:700;color:${popupText};margin-bottom:3px">$${listing.price?.toLocaleString()}</div>
            <div style="font-size:12px;color:${popupMuted}">${listing.address ?? ''}</div>
            <div style="font-size:11px;color:${popupMuted};margin-top:4px">${listing.beds ?? '—'} bd · ${listing.baths ?? '—'} ba · ${listing.sqft?.toLocaleString() ?? '—'} sqft</div>
          </div>
        `)

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(mapRef.current)

      el.addEventListener('click', () => {
        // `template` names the route segment to link into; the owning template
        // passes it. No default — this file must not name a specific template.
        if (listing.mlsId && template) {
          window.location.href = `/${template}/listings/${listing.mlsId}`
        }
      })

      markersRef.current.push(marker)
    })
  }, [ready, listings, template, markerBg, markerText, popupBg, popupText, popupMuted])

  if (noToken) {
    return (
      <div className={cn(
        'flex flex-col items-center justify-center gap-3 rounded',
        placeholderClass,
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
