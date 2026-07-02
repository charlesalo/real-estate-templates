import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'brokerage',
  title: 'Brokerage',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'license', title: 'License #', type: 'string' }),
  ],
})
