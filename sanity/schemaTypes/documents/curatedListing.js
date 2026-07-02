import { defineField, defineType } from 'sanity'

// Agent-curated / off-market listings ONLY — not MLS inventory. Active
// MLS listings come live from SimplyRETS (lib/simplyrets.js) and should
// never be duplicated into Sanity.
export default defineType({
  name: 'curatedListing',
  title: 'Curated Listing',
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
    defineField({ name: 'state', title: 'State', type: 'string' }),
    defineField({ name: 'zip', title: 'ZIP code', type: 'string' }),
    defineField({ name: 'price', title: 'Price', type: 'number', validation: (Rule) => Rule.required() }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['For Sale', 'Pending', 'Sold'] } }),
    defineField({ name: 'type', title: 'Property type', type: 'string' }),
    defineField({ name: 'beds', title: 'Beds', type: 'number' }),
    defineField({ name: 'baths', title: 'Baths', type: 'number' }),
    defineField({ name: 'sqft', title: 'Square feet', type: 'number' }),
    defineField({ name: 'lotSize', title: 'Lot size', type: 'string' }),
    defineField({ name: 'yearBuilt', title: 'Year built', type: 'number' }),
    defineField({ name: 'listingBrokerage', title: 'Listing brokerage', type: 'string' }),
    defineField({ name: 'mlsId', title: 'MLS ID', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'amenities', title: 'Amenities', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'imageWithAlt' }] }),
    defineField({ name: 'geo', title: 'Coordinates', type: 'geoPoint' }),
    defineField({ name: 'featured', title: 'Show on homepage', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'address', subtitle: 'neighborhood', media: 'images.0' },
  },
})
