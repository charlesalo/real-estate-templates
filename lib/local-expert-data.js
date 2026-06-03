// ─── Local Expert Template — Mock NY Data ────────────────────────────────────
// All data is hardcoded for the demo. Replace with Sanity CMS per client.
// Properties are mocked NY listings (bypasses SimplyRETS TX demo restriction).

// ── Agent ─────────────────────────────────────────────────────────────────────

export const AGENT = {
  name: 'Nadia Osei',
  firstName: 'Nadia',
  title: 'Licensed Associate Real Estate Salesperson',
  license: 'NY Lic# 10401315789',
  brokerage: 'Nadia Osei Real Estate LLC',
  brokerageLicense: 'NY Lic# 109802832',
  brokerageAddress: '90 5th Avenue, New York, NY 10011',
  phone: '(212) 555-0194',
  email: 'nadia@nadiaosei.com',
  tagline: 'I don\'t sell apartments. I introduce people to blocks.',
  bio: [
    'I moved here from Chicago in 2010 with two suitcases and a subletter I found online. Fourteen years later I\'ve lived in three boroughs, walked every block of the grid, and helped 240 families find not just a home but a neighborhood they love.',
    'The right home in New York is a feeling: where you\'ll get your coffee tomorrow, the park you\'ll circle every Sunday, the corner you\'ll pass daily for years. That\'s what I help people find.',
    'I\'m not the agent who sends you thirty listings. I\'m the agent who walks you through one block and asks, "Does this feel like you?"',
  ],
  photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80',
  socialLinks: {
    instagram: '#',
    facebook: '#',
    linkedin: '#',
  },
  areas: ['West Village', 'Tribeca', 'SoHo', 'Chelsea', 'Upper East Side', 'Brooklyn Heights', 'DUMBO', 'Park Slope', 'Cobble Hill'],
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export const HERO_STATS = [
  { label: 'Listing Volume', value: '$184M' },
  { label: 'Days on Market', value: '31 avg' },
  { label: 'Local Since', value: '2010' },
]

export const AGENT_STATS = [
  { numericValue: 240, suffix: '+', label: 'Families Placed' },
  { numericValue: 184, prefix: '$', suffix: 'M', label: 'Total Sales Volume' },
  { numericValue: 14, suffix: ' yrs', label: 'In New York' },
  { numericValue: 31, label: 'Avg. Days on Market' },
]

// ── Neighborhoods ─────────────────────────────────────────────────────────────

export const NEIGHBORHOODS = [
  {
    slug: 'west-village',
    name: 'West Village',
    borough: 'Manhattan',
    tagline: 'Cobblestone streets, corner cafes, and the city\'s most coveted townhouses.',
    description:
      'The West Village is New York\'s most romantic neighborhood — a winding maze of pre-grid streets, Federal-era townhouses, and a village feel that survives everything the city throws at it. Carrie Bradshaw, Jimi Hendrix, and Bob Dylan all lived here. You\'d understand why.',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
    medianPrice: '$3.8M',
    activeListings: 24,
    geo: { lat: 40.7358, lng: -74.0059 },
    highlights: ['Jane Street', 'Bleecker Street', 'High Line access', 'Hudson River Park'],
  },
  {
    slug: 'tribeca',
    name: 'Tribeca',
    borough: 'Manhattan',
    tagline: 'Cast-iron lofts, Michelin restaurants, and a school system parents move for.',
    description:
      'Tribeca (Triangle Below Canal) is Manhattan\'s most expensive zip code — and not by accident. Converted industrial lofts with 12-foot ceilings, cobblestone streets, and a downtown quietness that\'s rare in this city. The Tribeca Film Festival happens here. So does a surprisingly excellent brunch.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    medianPrice: '$4.1M',
    activeListings: 18,
    geo: { lat: 40.7163, lng: -74.0086 },
    highlights: ['Duane Park', 'Washington Market Park', 'Tribeca Film Center', 'Ferry access'],
  },
  {
    slug: 'upper-east-side',
    name: 'Upper East Side',
    borough: 'Manhattan',
    tagline: 'Museum Mile, classic prewar co-ops, and park-view living at its finest.',
    description:
      'The Upper East Side is classic Manhattan — white-glove doormen, prewar co-ops along Park Avenue, and the finest concentration of world-class museums on earth. It\'s quieter than downtown. Intentionally so. Families come for the schools; they stay for everything else.',
    image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=800&q=80',
    medianPrice: '$2.2M',
    activeListings: 41,
    geo: { lat: 40.7736, lng: -73.9566 },
    highlights: ['The Met', 'Central Park', 'Museum Mile', 'Madison Avenue'],
  },
  {
    slug: 'brooklyn-heights',
    name: 'Brooklyn Heights',
    borough: 'Brooklyn',
    tagline: 'NYC\'s first landmarked district — brownstones, the Promenade, and the best views in the city.',
    description:
      'Brooklyn Heights is where New York started keeping things. America\'s first historic district, it has the brownstones you picture when you picture Brooklyn — Federal, Greek Revival, Italianate — lining streets that feel unchanged for a century. The Promenade gives you an unobstructed panorama of the Manhattan skyline and Brooklyn Bridge that no photograph has ever done justice.',
    image: 'https://images.unsplash.com/photo-1611324023056-c223a0f9a856?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    medianPrice: '$2.9M',
    activeListings: 16,
    geo: { lat: 40.6961, lng: -73.9936 },
    highlights: ['Brooklyn Promenade', 'Brooklyn Bridge', 'Montague Street', 'Clark Street'],
  },
  {
    slug: 'dumbo',
    name: 'DUMBO',
    borough: 'Brooklyn',
    tagline: 'Brooklyn Bridge views, cobblestones, and a creative tech scene that actually built something.',
    description:
      'DUMBO (Down Under the Manhattan Bridge Overpass) has the most photogenic street in New York: Washington Street, where the Manhattan Bridge frames perfectly between two buildings. The neighborhood attracted artists first, then tech companies, then the condos followed. What\'s left is a neighborhood that\'s still actually interesting.',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    medianPrice: '$1.85M',
    activeListings: 29,
    geo: { lat: 40.7033, lng: -73.9881 },
    highlights: ['Brooklyn Bridge Park', 'Time Out Market', 'Jane\'s Carousel', 'Empire Stores'],
  },
  {
    slug: 'park-slope',
    name: 'Park Slope',
    borough: 'Brooklyn',
    tagline: 'Prospect Park on your doorstep, a farmers market on weekends, and good public schools.',
    description:
      'Park Slope is the neighborhood Brooklyn parents move to when they decide to stay in New York. Prospect Park — Frederick Law Olmsted\'s favorite project, better than Central Park by his own account — runs its entire eastern edge. The main strip on 5th and 7th Avenues has every restaurant, coffee shop, and bookstore you\'d need. The school district is legitimately good.',
    image: 'https://images.unsplash.com/photo-1569144157591-c60f3f82f137?w=800&q=80',
    medianPrice: '$2.4M',
    activeListings: 33,
    geo: { lat: 40.6681, lng: -73.9807 },
    highlights: ['Prospect Park', 'Grand Army Plaza', '7th Avenue', 'Brooklyn Public Library'],
  },
  {
    slug: 'soho',
    name: 'SoHo',
    borough: 'Manhattan',
    tagline: 'Cast-iron landmarks, cobblestone streets, and the city\'s most coveted loft conversions.',
    description:
      'SoHo — South of Houston — built its identity on artists who couldn\'t afford uptown and left behind the most architecturally distinctive streetscape in Manhattan. The cast-iron facades, the cobblestones, the 12-foot ceilings: they\'re still here. The galleries gave way to boutiques, but the bones of the neighborhood never changed. Living here means living inside a landmark.',
    image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80',
    medianPrice: '$2.8M',
    activeListings: 22,
    geo: { lat: 40.7231, lng: -74.0018 },
    highlights: ['Prince Street', 'Greene Street', 'Broadway boutiques', 'Cast-iron architecture'],
  },
  {
    slug: 'cobble-hill',
    name: 'Cobble Hill',
    borough: 'Brooklyn',
    tagline: 'Quiet tree-lined blocks, an exceptional restaurant strip, and the brownstones Brooklyn does best.',
    description:
      'Cobble Hill is what Brooklyn Heights would be if it were a little less well-known and a little more itself. The brownstones are just as beautiful — Federal row houses, Italianate stoops, gardens tucked behind iron gates — but the streets are quieter. Atlantic Avenue runs the northern edge with some of the best Middle Eastern grocers and Lebanese restaurants in the city. Smith Street handles everything else.',
    image: 'https://images.unsplash.com/photo-1527359443443-84a48aec73d2?w=800&q=80',
    medianPrice: '$1.9M',
    activeListings: 19,
    geo: { lat: 40.6867, lng: -73.9959 },
    highlights: ['Atlantic Avenue', 'Smith Street', 'Cobble Hill Park', 'Clinton Street'],
  },
  {
    slug: 'chelsea',
    name: 'Chelsea',
    borough: 'Manhattan',
    tagline: 'The High Line, the gallery district, and a co-op market that rewards patient buyers.',
    description:
      'Chelsea runs from 14th to 30th, river to Sixth Avenue, and manages to contain more art per block than most cities manage in total. The gallery district between Tenth and Eleventh Avenues is the reason serious collectors live here. The High Line turned an abandoned rail line into a 1.45-mile park that changed how New York thinks about its infrastructure — and its real estate.',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80',
    medianPrice: '$2.1M',
    activeListings: 31,
    geo: { lat: 40.7465, lng: -74.0014 },
    highlights: ['The High Line', 'Chelsea Market', 'Gallery District', 'Hudson River Park'],
  },
]

// ── Listings (Mocked NY Properties) ──────────────────────────────────────────

export const LISTINGS = [
  {
    id: 'le-1',
    price: 4250000,
    address: '147 Perry Street, Apt 3',
    neighborhood: 'West Village',
    city: 'New York',
    state: 'NY',
    zip: '10014',
    beds: 3,
    baths: 2,
    sqft: 1840,
    type: 'Co-op',
    status: 'Active',
    listingBrokerage: 'Compass Real Estate LLC',
    mlsId: 'REBNY-2024-4721',
    description:
      'A rare double-wide floor-through in a coveted West Village townhouse. Prewar details — original wide-plank floors, tin ceilings, a wood-burning fireplace — are set against a fully renovated kitchen and baths. South-facing parlor floor with garden access.',
    features: ['Wood-Burning Fireplace', 'Garden Access', 'Prewar Details', 'Renovated Kitchen', 'Washer/Dryer'],
    images: [
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
    ],
    geo: { lat: 40.7358, lng: -74.0039 },
  },
  {
    id: 'le-2',
    price: 3895000,
    address: '15 Hubert Street, Loft 4A',
    neighborhood: 'Tribeca',
    city: 'New York',
    state: 'NY',
    zip: '10013',
    beds: 2,
    baths: 2,
    sqft: 2100,
    type: 'Condo',
    status: 'Active',
    listingBrokerage: 'Douglas Elliman Real Estate',
    mlsId: 'REBNY-2024-3892',
    description:
      'A full-floor loft in a landmarked Tribeca cast-iron building, converted from a 19th-century textile warehouse. Soaring 11-foot ceilings, original heavy timber columns, and oversized factory windows. The chef\'s kitchen is the centrepiece of a south-facing great room that holds its light all afternoon.',
    features: ['11-ft Ceilings', 'Original Timber Columns', 'Chef\'s Kitchen', 'Private Storage', 'Doorman'],
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    ],
    geo: { lat: 40.7193, lng: -74.0100 },
  },
  {
    id: 'le-3',
    price: 2950000,
    address: '22 Pierrepont Street, Apt 6',
    neighborhood: 'Brooklyn Heights',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11201',
    beds: 4,
    baths: 3,
    sqft: 2350,
    type: 'Co-op',
    status: 'Active',
    listingBrokerage: 'Brown Harris Stevens Brooklyn LLC',
    mlsId: 'REBNY-2024-5108',
    description:
      'An expansive pre-war cooperative in the heart of the Brooklyn Heights Historic District, one block from the Promenade. Original plaster moldings, hardwood throughout, and four generous bedrooms make this an increasingly rare find in the neighborhood. The building is financially sound with a long-term super.',
    features: ['Pre-War Details', 'Four Bedrooms', 'One Block from Promenade', 'Pet-Friendly', 'Bike Storage'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=1200&q=80',
      'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1200&q=80',
    ],
    geo: { lat: 40.6978, lng: -73.9969 },
  },
  {
    id: 'le-4',
    price: 1850000,
    address: '18 Jay Street, #401',
    neighborhood: 'DUMBO',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11201',
    beds: 2,
    baths: 2,
    sqft: 1280,
    type: 'Condo',
    status: 'Active',
    listingBrokerage: 'Corcoran Group',
    mlsId: 'REBNY-2024-6234',
    description:
      'A bright, modern condo in one of DUMBO\'s most architecturally distinctive buildings. The open living space has direct views of the Manhattan Bridge through floor-to-ceiling windows. Brooklyn Bridge Park — with its lawns, pools, and piers — is two minutes on foot.',
    features: ['Manhattan Bridge Views', 'Floor-to-Ceiling Windows', 'Gym', 'Roof Deck', 'Concierge'],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
    ],
    geo: { lat: 40.7027, lng: -73.9900 },
  },
  {
    id: 'le-5',
    price: 3195000,
    address: '521 8th Avenue',
    neighborhood: 'Park Slope',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11215',
    beds: 4,
    baths: 3,
    sqft: 2680,
    type: 'Townhouse',
    status: 'Active',
    listingBrokerage: 'Compass Real Estate LLC',
    mlsId: 'REBNY-2024-2910',
    description:
      'A four-story limestone brownstone in prime Park Slope, a half block from Prospect Park West. The garden-floor unit serves as an ideal income or au pair suite. Three exposures, a restored parlor floor fireplace, and original mahogany bannisters throughout. The kind of brownstone that makes you want to stop moving.',
    features: ['Garden Suite', 'Parlor Fireplace', 'Private Garden', 'Original Mahogany Details', '4 Stories'],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80',
      'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=1200&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80',
    ],
    geo: { lat: 40.6681, lng: -73.9822 },
  },
  {
    id: 'le-6',
    price: 1625000,
    address: '120 East 87th Street, Apt 8D',
    neighborhood: 'Upper East Side',
    city: 'New York',
    state: 'NY',
    zip: '10128',
    beds: 2,
    baths: 2,
    sqft: 1180,
    type: 'Co-op',
    status: 'Active',
    listingBrokerage: 'Sotheby\'s International Realty',
    mlsId: 'REBNY-2024-7742',
    description:
      'A well-proportioned upper-floor co-op in a full-service postwar building, one block from the park and a short walk from the 4/5/6. Two proper bedrooms, two bathrooms, and an updated kitchen. The building has a live-in super, laundry, and a surprisingly good roof deck.',
    features: ['Full-Service Doorman', 'Roof Deck', 'Laundry in Building', 'Park Access', 'Storage Unit'],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80',
      'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909175-89254fb98d35?w=1200&q=80',
    ],
    geo: { lat: 40.7781, lng: -73.9561 },
  },
]

export const HOMEPAGE_LISTINGS = LISTINGS.slice(0, 3)

// ── Field Notes (Local Favorites) ─────────────────────────────────────────────

export const FIELD_NOTES = [
  {
    id: 'fn-1',
    category: 'Coffee',
    name: 'Joe Coffee Company',
    location: 'West Village',
    address: '141 Waverly Pl',
    blurb: 'A West Village institution. Sitting at the window counter is the closest New York gets to a slow morning.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
    walkMinutes: 3,
  },
  {
    id: 'fn-2',
    category: 'Bookstore',
    name: 'McNally Jackson',
    location: 'Nolita',
    address: '52 Prince St',
    blurb: 'The best independent bookstore in the city. Staff picks that actually earn their shelf space.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    walkMinutes: 12,
  },
  {
    id: 'fn-3',
    category: 'Park',
    name: 'Jefferson Market Garden',
    location: 'West Village',
    address: '425 6th Ave',
    blurb: 'A secret garden behind a Victorian courthouse. One of the few places in Manhattan that feels genuinely quiet.',
    image: 'https://images.unsplash.com/photo-1559593532-f242fad6118d?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    walkMinutes: 5,
  },
  {
    id: 'fn-4',
    category: 'Food',
    name: 'Russ & Daughters',
    location: 'Lower East Side',
    address: '179 E Houston St',
    blurb: 'Since 1914. The smoked fish is the point, but the egg creams stay with you.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    walkMinutes: 20,
  },
  {
    id: 'fn-5',
    category: 'Culture',
    name: 'Film Forum',
    location: 'Greenwich Village',
    address: '209 W Houston St',
    blurb: 'Repertory cinema that takes its programming as seriously as a museum takes its collection.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    walkMinutes: 8,
  },
  {
    id: 'fn-6',
    category: 'Market',
    name: 'Union Square Greenmarket',
    location: 'Union Square',
    address: 'E 17th St & Broadway',
    blurb: 'Monday, Wednesday, Friday, Saturday. The version of New York that makes you want to cook.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80',
    walkMinutes: 18,
  },
]

// ── Testimonial ───────────────────────────────────────────────────────────────

export const TESTIMONIAL = {
  quote:
    'Nadia showed us seven apartments and three coffee shops. We bought one of the apartments. We go to all three coffee shops. That\'s Nadia.',
  author: 'The Cole-Mandela Family',
  location: 'West Village, Manhattan',
}

// ── Blog Posts ─────────────────────────────────────────────────────────────────

export const BLOG_POSTS = [
  {
    slug: 'brooklyn-heights-market-update-2024',
    category: 'Market Report',
    title: 'Brooklyn Heights: Why the Co-op Market Is Moving Again',
    excerpt:
      'After two years of buyer hesitation, cooperative apartments in Brooklyn Heights are seeing competitive offers again. Here\'s what changed.',
    date: '2024-11-14',
    readMinutes: 6,
    image: 'https://plus.unsplash.com/premium_photo-1671811058527-d5e7882c6e4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    slug: 'what-1-8m-buys-in-nyc-2024',
    category: 'Buyer\'s Guide',
    title: 'What $1.8M Gets You in NYC Right Now — Across Six Neighborhoods',
    excerpt:
      'A DUMBO condo. A Park Slope floor-through. An Upper East Side co-op. We compared what a $1.8M budget actually buys across the six neighborhoods I work.',
    date: '2024-10-28',
    readMinutes: 9,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  },
  {
    slug: 'co-op-vs-condo-nyc-explained',
    category: 'New to NYC',
    title: 'Co-op vs. Condo: The Honest Explanation No One Gives You',
    excerpt:
      'Co-ops control who can buy. Condos don\'t. That\'s the start — but there\'s a lot more to unpack before you start writing checks.',
    date: '2024-09-15',
    readMinutes: 7,
    image: 'https://images.unsplash.com/photo-1664353657514-2f3e1b1238f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]
