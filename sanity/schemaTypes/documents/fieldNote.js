import { defineField, defineType } from 'sanity'

// A local favorite spot (coffee shop, park, bookstore...) — local-expert's
// "Field Notes" section.
export default defineType({
  name: 'fieldNote',
  title: 'Field Note',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'string' }),
    defineField({ name: 'blurb', title: 'Blurb', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Image', type: 'imageWithAlt' }),
    defineField({ name: 'walkMinutes', title: 'Walk time (min)', type: 'number' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' },
  },
})
