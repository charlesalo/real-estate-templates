import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ModalTrigger from '@/components/ui/ModalTrigger'

const POSTS = {
  'houston-real-estate-market-report-2024': {
    title: '2024 Houston Real Estate Market Report',
    category: 'Market Report',
    date: 'October 28, 2024',
    readTime: '8 min read',
    author: { name: 'Sarah Hargrove', title: 'Team Lead · Listing Specialist', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    heroImage: 'https://plus.unsplash.com/premium_photo-1734545294120-3aa935de792d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    excerpt: "A deep dive into Houston home prices, inventory, days on market, and what buyers and sellers can expect heading into 2025.",
    content: [
      {
        type: 'paragraph',
        text: "After two years of historically low inventory and rapidly rising prices, Houston's real estate market has entered a new phase in 2024: stabilization. Inventory has climbed to pre-pandemic levels across most submarkets, days on market have extended, and price growth — while still positive — has moderated significantly.",
      },
      {
        type: 'heading',
        text: 'Key Market Statistics — Greater Houston, 2024',
      },
      {
        type: 'stats',
        items: [
          { label: 'Median Home Price', value: '$358,000', change: '+3.2% YoY' },
          { label: 'Active Inventory', value: '14,200 homes', change: '+28% YoY' },
          { label: 'Avg. Days on Market', value: '32 days', change: '+8 days YoY' },
          { label: 'Months of Supply', value: '3.4 months', change: 'Up from 2.1' },
        ],
      },
      {
        type: 'paragraph',
        text: "The most significant development in 2024 has been the return of negotiating power to buyers. Homes that were routinely receiving 5–10 competing offers in 2021–2022 are now selling with one or two offers, and price reductions — almost unheard of during the pandemic frenzy — have reappeared as a tool for sellers who overpriced their homes at launch.",
      },
      {
        type: 'heading',
        text: 'Inner Loop vs. Suburbs: A Tale of Two Markets',
      },
      {
        type: 'paragraph',
        text: "The Houston metro is not a single market — and 2024 has made that clearer than ever. Inner Loop neighborhoods like the Heights, Montrose, and Midtown continue to see strong demand and faster absorption, driven by limited land for new construction and persistent buyer interest in walkability and proximity to employment centers.",
      },
      {
        type: 'paragraph',
        text: "Suburban markets — particularly those with new construction inventory — have seen the most price softening. Builders have responded to rising buyer hesitation with rate buydowns, closing cost incentives, and price adjustments that resale sellers can't easily match. Buyers in Katy, Pearland, and parts of The Woodlands are finding the most favorable conditions since 2019.",
      },
      {
        type: 'heading',
        text: 'What to Expect in 2025',
      },
      {
        type: 'paragraph',
        text: "The outlook for 2025 depends heavily on mortgage rate movement. If rates decline meaningfully — analysts are watching for a range of 5.5–6.25% — Houston is likely to see a significant demand surge from buyers who have been sitting on the sidelines. The inventory pipeline in many Inner Loop markets is thin, which means price pressure could return quickly.",
      },
      {
        type: 'paragraph',
        text: "For sellers, the 2025 opportunity will belong to those who price correctly from day one. Homes that launch at or slightly below market value are still selling in under two weeks with strong terms. Homes that test the market at aspirational pricing are sitting — sometimes for months — and eventually selling at or below where they would have launched.",
      },
    ],
    relatedSlugs: ['heights-vs-montrose-guide', 'sell-houston-home-fast'],
  },
  'heights-vs-montrose-guide': {
    title: 'The Heights vs. Montrose: Which Neighborhood Fits Your Life?',
    category: 'Neighborhood Guide',
    date: 'September 14, 2024',
    readTime: '6 min read',
    author: { name: 'Michael Hargrove', title: "Co-Founder · Buyer's Specialist", photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    heroImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1400&q=80',
    excerpt: "Two of Houston's most beloved Inner Loop neighborhoods compared on price, walkability, architecture, schools, and lifestyle.",
    content: [
      {
        type: 'paragraph',
        text: "If you're relocating to Houston's Inner Loop or moving up from a suburb, two neighborhoods inevitably rise to the top of the list: the Heights and Montrose. They sit adjacent to each other geographically, appeal to overlapping buyer profiles, and are frequently the subject of heated debate at dinner tables across the city. So which one is right for you?",
      },
      {
        type: 'heading',
        text: 'The Heights: Community, Character, and Craftsman Architecture',
      },
      {
        type: 'paragraph',
        text: "The Heights is Houston's oldest surviving residential neighborhood — established in 1891 as a streetcar suburb and still defined by its elevated topography, 1920s bungalows, and walkable 19th Street corridor. It has the strongest neighborhood identity in the city, with an active civic organization, regular community events, and a sense of place that most Houston neighborhoods simply can't replicate.",
      },
      {
        type: 'paragraph',
        text: "Heights buyers tend to value historic character above all else. If you want a craftsman bungalow with original hardwood floors, a front porch, and a yard with a century-old oak — the Heights is your neighborhood. Prices here run $350K on the low end for smaller cottages to well over $1M for renovated or custom-built homes on full lots.",
      },
      {
        type: 'heading',
        text: 'Montrose: Culture, Walkability, and Urban Energy',
      },
      {
        type: 'paragraph',
        text: "Montrose is Houston's most walkable and culturally rich neighborhood. The presence of the Menil Collection, the Rothko Chapel, Westheimer's restaurant corridor, and a density of independent coffee shops, bars, and galleries creates an urban environment unlike anything else in the city. If the Heights has 'neighborhood,' Montrose has 'scene.'",
      },
      {
        type: 'paragraph',
        text: "Montrose buyers tend to prioritize lifestyle access — the ability to walk to dinner, bike to a gallery opening, or work remotely from a coffee shop with character. The housing stock is diverse: bungalows mix with new construction townhomes, converted duplexes, and mid-century apartment buildings, giving buyers at various price points access to the neighborhood.",
      },
      {
        type: 'heading',
        text: 'The Bottom Line',
      },
      {
        type: 'paragraph',
        text: "Choose the Heights if: you want a strong community identity, historic architecture, more yard space, and a family-friendly feel with a genuine neighborhood block-party culture.\n\nChoose Montrose if: you prioritize walkability, cultural access, nightlife, and a more eclectic, urban energy — and you're comfortable with less yard and more density.",
      },
    ],
    relatedSlugs: ['houston-real-estate-market-report-2024', 'first-time-buyer-houston-guide'],
  },
  'first-time-buyer-houston-guide': {
    title: "A First-Time Buyer's Complete Guide to Houston",
    category: "Buyer's Guide",
    date: 'August 5, 2024',
    readTime: '10 min read',
    author: { name: 'Jessica Chen', title: "Senior Buyer's Agent · Relocation Specialist", photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    heroImage: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1400&q=80',
    excerpt: 'From pre-approval to closing day — everything you need to know before purchasing your first Houston home.',
    content: [
      {
        type: 'paragraph',
        text: "Buying your first home in Houston is an exciting milestone — and a process that rewards preparation. Texas has some specific rules, costs, and quirks that differ from other states, and Houston's diverse market means the right strategy varies significantly depending on which area you're targeting.",
      },
      {
        type: 'heading',
        text: 'Step 1: Get Pre-Approved Before You Shop',
      },
      {
        type: 'paragraph',
        text: "In Houston's current market, pre-approval is not optional — it's a prerequisite. Sellers won't take your offer seriously without it, and the pre-approval process often reveals important information about your budget that changes which neighborhoods or property types you should be considering.",
      },
      {
        type: 'heading',
        text: 'Understanding Texas Property Taxes',
      },
      {
        type: 'paragraph',
        text: "Texas has no state income tax, but it compensates with some of the highest property tax rates in the nation. In Harris County, effective rates typically run 2.0–2.5% of assessed value annually. On a $400,000 home, that means $8,000–$10,000 in annual property taxes. This is a critically important number that many out-of-state buyers underestimate when calculating affordability.",
      },
      {
        type: 'paragraph',
        text: "The good news: Texas offers a Homestead Exemption that reduces your taxable value by $100,000 for school district taxes, and caps the annual increase in your appraised value at 10% once you've filed. Apply within your first year of ownership — it saves real money.",
      },
      {
        type: 'heading',
        text: 'Choosing Between a Neighborhood and the Suburbs',
      },
      {
        type: 'paragraph',
        text: "One of the most common first-time buyer dilemmas in Houston is the trade-off between inner-loop character and suburban value. For the price of a modest Heights bungalow, you could get a spacious four-bedroom new-construction home in Sugar Land or The Woodlands with significantly better schools.",
      },
      {
        type: 'paragraph',
        text: "There is no universally right answer — it depends on your commute, lifestyle priorities, and whether you plan to start a family. What we recommend: spend a weekend in both environments before deciding. The difference in daily lifestyle feel is significant, and the 'right' choice usually becomes clear quickly.",
      },
    ],
    relatedSlugs: ['houston-real-estate-market-report-2024', 'houston-suburbs-compared-2024'],
  },
  'houston-suburbs-compared-2024': {
    title: 'Sugar Land vs. The Woodlands vs. Katy: Which Suburb Is Right for You?',
    category: 'Neighborhood Guide',
    date: 'July 18, 2024',
    readTime: '7 min read',
    author: { name: 'Jessica Chen', title: "Senior Buyer's Agent · Relocation Specialist", photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80',
    excerpt: "Houston's three most popular suburbs compared side-by-side on schools, commute, price, and community feel.",
    content: [
      {
        type: 'paragraph',
        text: "If you're moving to the Houston area and considering a suburb, three communities consistently dominate the conversation: Sugar Land, The Woodlands, and Katy. All three are exceptional — but they appeal to very different buyer profiles. Here's how to choose.",
      },
      {
        type: 'stats',
        items: [
          { label: 'Sugar Land Median', value: '$395K', change: 'Fort Bend County' },
          { label: 'Woodlands Median', value: '$465K', change: 'Montgomery County' },
          { label: 'Katy Median', value: '$340K', change: 'Harris/Fort Bend/Waller' },
          { label: 'All Rank Top 10', value: 'TX Schools', change: 'State rankings' },
        ],
      },
      {
        type: 'heading',
        text: 'Sugar Land: Best For Families, Best Schools, Most Urban Feel',
      },
      {
        type: 'paragraph',
        text: "Sugar Land wins for buyers who want the best school district in the region (Fort Bend ISD), the most urban suburban experience (Sugar Land Town Square), and a shorter commute to both the Medical Center and downtown. If you're choosing between these three communities primarily based on schools and lifestyle access, Sugar Land is the safest pick.",
      },
      {
        type: 'heading',
        text: 'The Woodlands: Best for Nature, Quality of Life, and Planned Living',
      },
      {
        type: 'paragraph',
        text: "The Woodlands wins for buyers who prioritize quality of life above all else. The trail system, the Town Center, the dense tree canopy, and the sheer quality of planning make it unlike any other Houston suburb. The trade-off is distance: the commute to downtown can be 45–55 minutes in traffic.",
      },
      {
        type: 'heading',
        text: 'Katy: Best Value and Best for Energy Corridor Commuters',
      },
      {
        type: 'paragraph',
        text: "Katy wins on value. For the same budget, buyers get meaningfully more space and newer construction than in Sugar Land or The Woodlands. Katy ISD is among the best in Texas, and the Energy Corridor commute is genuinely short — 20–25 minutes without traffic. For buyers who work in the energy sector and have families, Katy is often the clear winner.",
      },
    ],
    relatedSlugs: ['first-time-buyer-houston-guide', 'houston-real-estate-market-report-2024'],
  },
  'sell-houston-home-fast': {
    title: '7 Proven Strategies to Sell Your Houston Home Faster and for More Money',
    category: "Seller's Guide",
    date: 'June 3, 2024',
    readTime: '5 min read',
    author: { name: 'Sarah Hargrove', title: 'Team Lead · Listing Specialist', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    heroImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=80',
    excerpt: 'Pricing strategy, staging, marketing, and timing — the exact playbook that helped our sellers close $18K over asking on average last year.',
    content: [
      {
        type: 'paragraph',
        text: "Our sellers closed at an average of $18,000 over asking price last year — in a market that many described as 'returning to normal.' The difference isn't luck or market timing. It's preparation, pricing strategy, and execution. Here's what actually works.",
      },
      {
        type: 'heading',
        text: '1. Price Below Psychological Resistance',
      },
      {
        type: 'paragraph',
        text: "The single most impactful decision you'll make is your launch price. In Houston's current market, the listings that generate multiple offers are consistently priced just under key psychological thresholds — $499K instead of $505K, $749K instead of $760K. The goal is to appear in more buyer searches and create competition, not to 'test' the market at your most optimistic number.",
      },
      {
        type: 'heading',
        text: '2. Stage for the Buyer Who Lives There — Not the One Who Visits',
      },
      {
        type: 'paragraph',
        text: "Houston buyers in 2024 are buying a lifestyle, not just a structure. Staging should create an emotional response — buyers should be able to picture themselves hosting Thanksgiving or putting kids to bed. This means depersonalizing, decluttering, and investing in a few key furniture pieces or rentals that make rooms feel larger and more functional.",
      },
      {
        type: 'heading',
        text: '3. Invest in Professional Photography — Including Video',
      },
      {
        type: 'paragraph',
        text: "Over 95% of Houston buyers begin their search online, and your listing photos are your first (and sometimes only) chance to generate a showing. Professional photography with a wide-angle lens, HDR processing, and natural light exposure isn't optional — it's the minimum. For homes over $500K, a professional walkthrough video and 3D tour are essential.",
      },
    ],
    relatedSlugs: ['houston-real-estate-market-report-2024', 'houston-property-taxes-explained'],
  },
  'houston-property-taxes-explained': {
    title: 'Houston Property Taxes: What Every Buyer Needs to Know',
    category: 'Finance',
    date: 'May 12, 2024',
    readTime: '6 min read',
    author: { name: 'Michael Hargrove', title: "Co-Founder · Buyer's Specialist", photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1400&q=80',
    excerpt: "Texas has no state income tax — but property taxes are among the highest in the nation. Here's what every Houston buyer needs to know.",
    content: [
      {
        type: 'paragraph',
        text: "One of the biggest surprises for buyers relocating to Houston from other states is the property tax bill. Texas has no state income tax — a genuine financial advantage — but it funds state and local government primarily through property taxes, which run among the highest effective rates in the nation.",
      },
      {
        type: 'heading',
        text: 'How Houston Property Taxes Are Calculated',
      },
      {
        type: 'paragraph',
        text: "Property taxes in Texas are calculated by multiplying your home's assessed value (set by the county appraisal district) by the combined tax rate for all applicable taxing entities — which typically includes a city, county, school district, and various special districts.",
      },
      {
        type: 'stats',
        items: [
          { label: 'Harris County Effective Rate', value: '~2.09%', change: 'Including all entities' },
          { label: 'Fort Bend County Rate', value: '~2.23%', change: 'Sugar Land area' },
          { label: 'Montgomery County Rate', value: '~1.74%', change: 'The Woodlands area' },
          { label: 'Homestead Exemption', value: '$100K off', change: 'School district taxes' },
        ],
      },
      {
        type: 'heading',
        text: "The Homestead Exemption — File It in Your First Year",
      },
      {
        type: 'paragraph',
        text: "Texas offers a Homestead Exemption that reduces your assessed value by $100,000 for school district tax purposes, and caps your annual appraisal increase at 10% once filed. On a $400,000 home, this saves roughly $2,000–$2,500 per year in school taxes. File with your county appraisal district in January or February of the year after you purchase — it applies to that full tax year.",
      },
    ],
    relatedSlugs: ['first-time-buyer-houston-guide', 'houston-real-estate-market-report-2024'],
  },
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) notFound()

  const related = (post.relatedSlugs ?? [])
    .map(s => POSTS[s])
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* Hero */}
      <div className="relative h-[45vh] min-h-[340px] pt-20">
        <Image src={post.heroImage} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E3E]/90 via-[#1A2D5A]/75 to-[#1A2D5A]/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 max-w-4xl mx-auto">
          <Link href="/modern-team/blog" className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors font-sans mb-4 group w-fit">
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Blog
          </Link>
          <span className="inline-block px-3 py-1 bg-[#1A2D5A]/80 backdrop-blur-sm text-white text-[12px] tracking-[0.15em] uppercase rounded font-sans mb-3">
            {post.category}
          </span>
          <h1
            className="text-3xl lg:text-4xl font-bold text-white leading-tight"
            style={{ fontFamily: 'var(--font-inter, system-ui)' }}
          >
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">

        {/* Byline */}
        <div className="flex items-center gap-4 pb-8 mb-10 border-b border-[#D5DBE9]">
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={post.author.photo}
              alt={post.author.name}
              fill
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="font-semibold text-[#111827] text-sm">{post.author.name}</p>
            <p className="text-xs text-[#9CA3AF] font-sans">{post.author.title}</p>
          </div>
          <div className="ml-auto text-xs text-[#9CA3AF] font-sans text-right">
            <p>{post.date}</p>
            <p>{post.readTime}</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-7">
          {post.content.map((block, i) => {
            if (block.type === 'paragraph') {
              return (
                <p key={i} className="text-[#374151] text-base leading-relaxed font-sans whitespace-pre-line">
                  {block.text}
                </p>
              )
            }
            if (block.type === 'heading') {
              return (
                <h2
                  key={i}
                  className="text-xl lg:text-2xl font-bold text-[#111827] pt-4"
                  style={{ fontFamily: 'var(--font-inter, system-ui)' }}
                >
                  {block.text}
                </h2>
              )
            }
            if (block.type === 'stats') {
              return (
                <div key={i} className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                  {block.items.map((stat, j) => (
                    <div key={j} className="bg-white border border-[#D5DBE9] rounded-lg p-4 text-center">
                      <div className="text-xl font-bold text-[#1A2D5A]">{stat.value}</div>
                      <div className="text-[12px] text-[#9CA3AF] mt-1 font-sans uppercase tracking-wide">{stat.label}</div>
                      <div className="text-xs text-[#4B6090] mt-0.5 font-sans">{stat.change}</div>
                    </div>
                  ))}
                </div>
              )
            }
            return null
          })}
        </div>

        {/* Author CTA */}
        <div className="mt-14 p-6 lg:p-8 bg-[#EEF1F7] border border-[#D5DBE9] rounded-xl flex flex-col sm:flex-row gap-5 items-start">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={post.author.photo}
              alt={post.author.name}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[#111827]">{post.author.name}</p>
            <p className="text-sm text-[#4B6090] font-sans">{post.author.title} · The Hargrove Group</p>
            <p className="text-sm text-[#6B7280] mt-2 font-sans leading-relaxed">
              Have a question about Houston real estate? Our team is happy to help — no pressure, no obligation.
            </p>
          </div>
          <ModalTrigger className="px-6 py-3 bg-[#1A2D5A] text-white text-sm font-semibold rounded-lg hover:bg-[#243870] transition-colors flex-shrink-0 cursor-pointer">
            Get in Touch
          </ModalTrigger>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-14">
            <h3 className="text-lg font-bold text-[#111827] mb-6" style={{ fontFamily: 'var(--font-inter, system-ui)' }}>
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map(r => (
                <Link
                  key={r.title}
                  href={`/modern-team/blog/${post.relatedSlugs[related.indexOf(r)]}`}
                  className="group flex gap-4 bg-white border border-[#D5DBE9] rounded-lg overflow-hidden hover:border-[#1A2D5A]/30 hover:shadow-sm transition-all"
                >
                  <div className="relative w-24 flex-shrink-0 aspect-square overflow-hidden">
                    <Image src={r.heroImage} alt={r.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="py-4 pr-4 flex flex-col justify-center">
                    <span className="text-[12px] uppercase tracking-wide text-[#4B6090] font-sans">{r.category}</span>
                    <h4 className="text-sm font-semibold text-[#111827] leading-snug mt-1 group-hover:text-[#1A2D5A] transition-colors line-clamp-2">
                      {r.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
