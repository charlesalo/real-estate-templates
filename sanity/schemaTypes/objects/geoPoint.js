import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'geoPoint',
  title: 'Coordinates',
  type: 'object',
  fields: [
    defineField({ name: 'lat', title: 'Latitude', type: 'number', validation: (Rule) => Rule.required() }),
    defineField({ name: 'lng', title: 'Longitude', type: 'number', validation: (Rule) => Rule.required() }),
  ],
})
