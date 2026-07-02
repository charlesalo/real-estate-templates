import { defineField, defineType } from 'sanity'

// Covers both pre-formatted stats (e.g. "$184M") and animated-counter
// stats (numericValue + prefix/suffix), matching the two patterns already
// used across templates (HERO_STATS vs AGENT_STATS in local-expert-data.js).
export default defineType({
  name: 'statItem',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'value', title: 'Pre-formatted value', type: 'string', description: 'e.g. "$184M" — use this or the numeric fields below' }),
    defineField({ name: 'numericValue', title: 'Numeric value', type: 'number', description: 'Use for animated counters, e.g. 240' }),
    defineField({ name: 'prefix', title: 'Prefix', type: 'string', description: 'e.g. "$"' }),
    defineField({ name: 'suffix', title: 'Suffix', type: 'string', description: 'e.g. "+", "M", " yrs"' }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'value' },
  },
})
