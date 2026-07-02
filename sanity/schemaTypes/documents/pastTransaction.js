import { defineField, defineType } from 'sanity'

// Closed-deal case studies used for marketing ("Past Transactions" /
// "Recent Sales") — editorial content, not a live MLS sold-comps feed.
export default defineType({
  name: 'pastTransaction',
  title: 'Past Transaction',
  type: 'document',
  fields: [
    defineField({ name: 'address', title: 'Address', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'address' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'neighborhood', title: 'Neighborhood', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'type', title: 'Property type', type: 'string' }),
    defineField({ name: 'beds', title: 'Beds', type: 'number' }),
    defineField({ name: 'baths', title: 'Baths', type: 'number' }),
    defineField({ name: 'sqft', title: 'Square feet', type: 'number' }),
    defineField({ name: 'lotSize', title: 'Lot size', type: 'string' }),
    defineField({ name: 'yearBuilt', title: 'Year built', type: 'number' }),
    defineField({ name: 'listPrice', title: 'List price', type: 'number' }),
    defineField({ name: 'soldPrice', title: 'Sold price', type: 'number' }),
    defineField({ name: 'soldDate', title: 'Sold date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({ name: 'daysOnMarket', title: 'Days on market', type: 'number' }),
    defineField({ name: 'role', title: 'Agent role', type: 'string', description: 'e.g. "Represented Seller"' }),
    defineField({ name: 'overAsk', title: 'Sold over asking', type: 'boolean', initialValue: false }),
    defineField({ name: 'listingBrokerage', title: 'Listing brokerage', type: 'string' }),
    defineField({ name: 'mlsId', title: 'MLS ID', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'amenities', title: 'Amenities', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'imageWithAlt' }] }),
    defineField({ name: 'agent', title: 'Agent', type: 'reference', to: [{ type: 'agent' }] }),
  ],
  orderings: [
    { title: 'Sold date, newest first', name: 'soldDateDesc', by: [{ field: 'soldDate', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'address', subtitle: 'neighborhood', media: 'images.0' },
  },
})
