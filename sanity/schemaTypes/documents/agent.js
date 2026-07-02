import { defineField, defineType } from 'sanity'

// One agent. Works for both a solo-agent site (local-expert, luxury-agent —
// just one Agent document) and a team roster (modern-team — several Agent
// documents ordered by `order`).
export default defineType({
  name: 'agent',
  title: 'Agent',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'firstName', title: 'First name', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'license', title: 'License #', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'address', title: 'Office address', type: 'text', rows: 2 }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'photo', title: 'Photo', type: 'imageWithAlt' }),
    defineField({ name: 'socialLinks', title: 'Social links', type: 'socialLinks' }),
    defineField({ name: 'areas', title: 'Areas served', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'specialties', title: 'Specialties', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'credentials', title: 'Credentials', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'heroStats',
      title: 'Hero stats',
      description: 'Headline numbers shown in the hero (e.g. Listing Volume, Closed Sales)',
      type: 'array',
      of: [{ type: 'statItem' }],
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      description: 'Animated-counter stats shown on the About page',
      type: 'array',
      of: [{ type: 'statItem' }],
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      description: 'Only matters when there are multiple agents (team rosters). Lower numbers appear first — e.g. team lead = 0.',
      type: 'number',
    }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
})
