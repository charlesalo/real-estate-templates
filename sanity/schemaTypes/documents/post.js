import { defineField, defineType } from 'sanity'

// Blog / market report / buyer's guide / journal entry — one type covers
// all three templates' "blog" section, distinguished by `category`.
export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'imageWithAlt' }] }),
    defineField({ name: 'image', title: 'Cover image', type: 'imageWithAlt' }),
    defineField({ name: 'date', title: 'Published date', type: 'date', validation: (Rule) => Rule.required() }),
    defineField({ name: 'readMinutes', title: 'Read time (min)', type: 'number' }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'agent' }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  orderings: [
    { title: 'Date, newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
