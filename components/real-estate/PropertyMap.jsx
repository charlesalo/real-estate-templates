'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'

let mapboxgl = null

export default function PropertyMap({ lat, lng, address, label }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  const [coords, setCoords] = useState(
    lat != null && lng != null ? { lat, lng } : null
  )
  const [geocoding, setGeocoding] = useState(!coords)
  const [error, setError] = useState(false)

  // Geocode address when no coordinates are provided
  useEffect(() => {
    if (coords || !address || !token) {
      setGeocoding(false)
      return
    }
    const query = encodeURIComponent(address)
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}&limit=1&types=address,place`)
      .then(r => r.json())
      .then(data => {
        const feature = data.features?.[0]
        if (feature?.center) {
          setCoords({ lng: feature.center[0], lat: feature.center[1] })
        } else {
          setError(true)
        }
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
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [coords.lng, coords.lat],
        zoom: 15,
        attributionControl: false,
      })

      mapRef.current.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        'bottom-right'
      )
      mapRef.current.addControl(
        new mapboxgl.AttributionControl({ compact: true }),
        'bottom-left'
      )

      // Gold teardrop pin
      const el = document.createElement('div')
      el.style.cssText = 'cursor: pointer; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.5));'
      el.innerHTML = `
        <svg width="28" height="40" viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.268 0 0 6.268 0 14C0 24.5 14 40 14 40C14 40 28 24.5 28 14C28 6.268 21.732 0 14 0Z" fill="#C9A96E"/>
          <circle cx="14" cy="14" r="5.5" fill="white"/>
        </svg>
      `

      const popup = new mapboxgl.Popup({
        offset: 14,
        closeButton: false,
        className: 'property-map-popup',
      }).setHTML(`
        <div style="
          background: #0D0D0D;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
          font-size: 11px;
          font-family: system-ui, sans-serif;
          padding: 7px 11px;
          letter-spacing: 0.05em;
          white-space: nowrap;
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

  // Loading state
  if (geocoding) {
    return (
      <div className="h-[320px] lg:h-[380px] border border-white/[0.07] bg-[#0D0D0D] flex items-center justify-center">
        <div className="w-6 h-6 border border-[#C9A96E]/30 border-t-[#C9A96E] rounded-full animate-spin" />
      </div>
    )
  }

  // Error / no coords
  if (error || !coords) {
    return (
      <div className="h-[320px] lg:h-[380px] border border-white/[0.07] bg-[#0D0D0D] flex flex-col items-center justify-center gap-3">
        <MapPin size={28} className="text-white/15" strokeWidth={1} />
        <p className="text-white/20 text-xs font-sans tracking-wider uppercase">
          Map unavailable
        </p>
      </div>
    )
  }

  return (
    <>
      <style>{`
        .property-map-popup .mapboxgl-popup-content { background: transparent; padding: 0; box-shadow: none; }
        .property-map-popup .mapboxgl-popup-tip { display: none; }
        .property-map-container .mapboxgl-ctrl-group,
        .property-map-container .mapboxgl-ctrl-attrib { z-index: 1 !important; }
      `}</style>
      <div
        ref={containerRef}
        className="property-map-container h-[320px] lg:h-[380px] border border-white/[0.07]"
      />
    </>
  )
}
