import { PortableText as PortableTextReact } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

const components = {
  types: {
    imageWithAlt: ({ value }) => (
      <div className="relative aspect-[16/9] my-6 rounded-xl overflow-hidden">
        <Image
          src={urlFor(value).width(1600).url()}
          alt={value.alt || ''}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
}

// Renders Sanity Portable Text (agent bios, post bodies, neighborhood
// descriptions). Callers apply their own `.prose`-style wrapper for typography.
export default function PortableText({ value }) {
  if (!value) return null
  return <PortableTextReact value={value} components={components} />
}
