import { toPlainText } from '@portabletext/react'

// Falls back to the template's demo data file until a client's Sanity
// dataset has real content for a given type.
export function withFallback(data, fallback) {
  if (Array.isArray(data)) return data.length > 0 ? data : fallback
  return data ?? fallback
}

// Portable Text bodies are arrays of `{ _type: 'block', ... }`. Demo
// fallback data stores the same fields as plain string arrays.
export function isPortableText(value) {
  return Array.isArray(value) && value[0]?._type === 'block'
}

// Flattens a Portable Text field to a plain string excerpt for components
// that don't render rich text (map popovers, card blurbs). Fallback demo
// data already stores these fields as plain strings.
export function toExcerpt(value) {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (isPortableText(value)) return toPlainText(value)
  return ''
}

export function formatCompactPrice(n) {
  if (typeof n !== 'number') return n
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`
  return `$${n.toLocaleString()}`
}
