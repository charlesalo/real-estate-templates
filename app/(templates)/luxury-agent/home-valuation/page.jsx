import HomeValuationClient from './HomeValuationClient'

export const metadata = {
  title: 'Personalized California Home Valuation',
  description: 'Find out what your home is worth. Get a free, no-obligation home valuation from Victoria Sinclair — Beverly Hills luxury real estate specialist.',
}

export default function HomeValuationPage() {
  const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? ''
  return <HomeValuationClient googleMapsKey={googleMapsKey} />
}
