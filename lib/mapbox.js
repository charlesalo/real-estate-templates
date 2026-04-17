export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export const MAP_STYLES = {
  light: 'mapbox://styles/mapbox/light-v11',
  dark: 'mapbox://styles/mapbox/dark-v11',
}

export function listingsToGeoJSON(listings) {
  return {
    type: 'FeatureCollection',
    features: listings
      .filter(l => l.geo?.lat && l.geo?.lng)
      .map(l => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [l.geo.lng, l.geo.lat] },
        properties: { id: l.mlsId, price: l.listPrice, address: l.address?.full },
      })),
  }
}
