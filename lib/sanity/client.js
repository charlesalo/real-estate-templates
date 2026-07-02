import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // A public, published-only dataset needs no token. Set
  // SANITY_API_READ_TOKEN only if the dataset is private.
  token: process.env.SANITY_API_READ_TOKEN || undefined,
  useCdn: true,
  perspective: 'published',
})
