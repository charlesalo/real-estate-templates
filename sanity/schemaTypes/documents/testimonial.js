import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'author', title: 'Author', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo', type: 'imageWithAlt' }),
    defineField({ name: 'agent', title: 'Agent', type: 'reference', to: [{ type: 'agent' }] }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'quote', media: 'photo' },
  },
})
