import { createImageUrlBuilder } from '@sanity/image-url'
import { dataset, projectId } from '@/sanity/env'

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source) {
  return builder.image(source)
}

// Templates render images from two sources during the CMS migration: plain
// URL strings (demo fallback data) and Sanity image objects (CMS content).
// This normalizes either into a `next/image`-ready src.
export function resolveImageSrc(image, width = 1200) {
  if (!image) return null
  if (typeof image === 'string') return image
  return urlFor(image).width(width).auto('format').url()
}
