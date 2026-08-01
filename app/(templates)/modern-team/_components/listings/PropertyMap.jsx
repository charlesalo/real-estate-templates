'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'

let mapboxgl = null

export default function ModernTeamPropertyMap({ lat, lng, address, label }) {
  const containerRef = useRef(null)
  const mapRef       = useRef(null)
  const token        = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  const [coords,    setCoords]   = useState(lat != null && lng != null ? { lat, lng } : null)
  const [geocoding, setGeocoding] = useState(!coords)
  const [error,     setError]    = useState(false)

  // Geocode address when no coordinates are provided
  useEffect(() => {
    if (coords || !address || !token) { setGeocoding(false); return }
    const query = encodeURIComponent(address)
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}&limit=1&types=address,place`)
      .then(r => r.json())
      .then(data => {
        const feature = data.features?.[0]
        if (feature?.center) setCoords({ lng: feature.center[0], lat: feature.center[1] })
        else setError(true)
      })
      .catch(() => setError(true))
      .finally(() => setGeocoding(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Initialise map once coordinates are ready
  useEffect(() => {
    if (!coords || !containerRef.current || !token) return

    import('mapbox-gl').then(mod => {
      mapboxgl = mod.default
      import('mapbox-gl/dist/mapbox-gl.css')

      mapboxgl.accessToken = token

      mapRef.current = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [coords.lng, coords.lat],
        zoom: 15,
        attributionControl: false,
      })

      mapRef.current.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        'bottom-right',
      )
      mapRef.current.addControl(
        new mapboxgl.AttributionControl({ compact: true }),
        'bottom-left',
      )

      // Navy teardrop pin
      const el = document.createElement('div')
      el.style.cssText = 'cursor: pointer; filter: drop-shadow(0 3px 6px rgba(26,45,90,0.35));'
      el.innerHTML = `
        <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.268 0 0 6.268 0 14C0 24.5 14 40 14 40C14 40 28 24.5 28 14C28 6.268 21.732 0 14 0Z" fill="#1A2D5A"/>
          <circle cx="14" cy="14" r="5.5" fill="white"/>
        </svg>
      `

      const popup = new mapboxgl.Popup({
        offset: 14,
        closeButton: false,
        className: 'mt-property-map-popup',
      }).setHTML(`
        <div style="
          background: #ffffff;
          border: 1px solid #D5DBE9;
          border-radius: 8px;
          color: #111827;
          font-size: 11px;
          font-family: system-ui, sans-serif;
          font-weight: 600;
          padding: 7px 12px;
          letter-spacing: 0.03em;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(26,45,90,0.12);
        ">${label || address || 'Property'}</div>
      `)

      new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([coords.lng, coords.lat])
        .setPopup(popup)
        .addTo(mapRef.current)
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [coords, token]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!token) return null

  if (geocoding) {
    return (
      <div className="h-[320px] lg:h-[380px] rounded-xl border border-[#D5DBE9] bg-[#EEF1F7] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#D5DBE9] border-t-[#1A2D5A] rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !coords) {
    return (
      <div className="h-[320px] lg:h-[380px] rounded-xl border border-[#D5DBE9] bg-[#EEF1F7] flex flex-col items-center justify-center gap-3">
        <MapPin size={28} className="text-[#1A2D5A]/30" strokeWidth={1.5} />
        <p className="text-[#9CA3AF] text-xs font-sans tracking-wider uppercase">Map unavailable</p>
      </div>
    )
  }

  return (
    <>
      <style>{`
        .mt-property-map-popup .mapboxgl-popup-content { background: transparent; padding: 0; box-shadow: none; }
        .mt-property-map-popup .mapboxgl-popup-tip { display: none; }
        .mt-property-map-container .mapboxgl-ctrl-group { border: 1px solid #D5DBE9 !important; border-radius: 8px !important; overflow: hidden; }
        .mt-property-map-container .mapboxgl-ctrl-group button { background: white !important; }
        .mt-property-map-container .mapboxgl-ctrl-group button:hover { background: #EEF1F7 !important; }
        .mt-property-map-container .mapboxgl-ctrl-attrib { background: rgba(255,255,255,0.85) !important; border-radius: 4px !important; }
      `}</style>
      <div
        ref={containerRef}
        className="mt-property-map-container h-[320px] lg:h-[380px] rounded-xl overflow-hidden border border-[#D5DBE9]"
      />
    </>
  )
}
