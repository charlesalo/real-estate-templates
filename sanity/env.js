export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-02'

// Left unset for deployments that don't have a client-specific Sanity
// project yet (e.g. this template's own showcase site) — lib/sanity/client.js
// falls back to demo data instead of hitting the network when these are empty.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || ''

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
