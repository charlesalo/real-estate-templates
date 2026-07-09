import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const isSanityConfigured = Boolean(projectId && dataset)

// Deployments without a client-specific Sanity project (e.g. this template's
// own showcase site) get a stub client that resolves to null instead of
// hitting the network — callers already fall back to demo data via
// lib/sanity/utils.js's withFallback().
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // A public, published-only dataset needs no token. Set
      // SANITY_API_READ_TOKEN only if the dataset is private.
      token: process.env.SANITY_API_READ_TOKEN || undefined,
      useCdn: true,
      perspective: 'published',
    })
  : { fetch: async () => null }
