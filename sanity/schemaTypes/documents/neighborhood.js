import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'neighborhood',
  title: 'Neighborhood',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'region', title: 'Borough / region', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'quote', title: 'Editorial quote', type: 'text', rows: 2 }),
    defineField({ name: 'image', title: 'Image', type: 'imageWithAlt' }),
    defineField({ name: 'medianPrice', title: 'Median price', type: 'number' }),
    defineField({ name: 'activeListings', title: 'Active listings', type: 'number' }),
    defineField({ name: 'walkScore', title: 'Walk score', type: 'number' }),
    defineField({ name: 'guideMinutes', title: 'Guide read time (min)', type: 'number' }),
    defineField({ name: 'vibes', title: 'Vibes', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'highlights', title: 'Highlights', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'amenities', title: 'Amenities', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'schools',
      title: 'Schools',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'school',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'rating', title: 'Rating', type: 'string' },
            { name: 'type', title: 'Type', type: 'string' },
          ],
        },
      ],
    }),
    defineField({ name: 'demographics', title: 'Demographics', type: 'array', of: [{ type: 'statItem' }] }),
    defineField({ name: 'geo', title: 'Coordinates', type: 'geoPoint' }),
    defineField({ name: 'zip', title: 'ZIP code', type: 'string' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'region', media: 'image' },
  },
})
