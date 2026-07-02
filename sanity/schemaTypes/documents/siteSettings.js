import { defineField, defineType } from 'sanity'

// Singleton — one per client deployment (one project+dataset per client).
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'template',
      title: 'Template',
      type: 'string',
      options: {
        list: [
          { title: 'Local Expert', value: 'local-expert' },
          { title: 'Luxury Agent', value: 'luxury-agent' },
          { title: 'Modern Team', value: 'modern-team' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'businessName', title: 'Business / team name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'disclaimer', title: 'Legal disclaimer', type: 'text', rows: 3 }),
    defineField({ name: 'agentLicense', title: 'Agent license #', type: 'string' }),
    defineField({ name: 'brokerage', title: 'Brokerage', type: 'brokerage' }),
    defineField({ name: 'brokerageAddress', title: 'Brokerage address', type: 'string' }),
    defineField({ name: 'managingBroker', title: 'Managing broker', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'address', title: 'Office address', type: 'text', rows: 2 }),
    defineField({ name: 'socialLinks', title: 'Social links', type: 'socialLinks' }),
    defineField({
      name: 'seo',
      title: 'Homepage SEO',
      description: 'Only affects the homepage. Every other page (About, Neighborhoods, Blog, individual listings, etc.) generates its own SEO title and description automatically.',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'businessName', subtitle: 'template' },
  },
})
