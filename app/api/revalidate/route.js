import { revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'

// Sanity Studio → API → Webhooks: POST here on Create/Update/Delete,
// with a GROQ-projected payload of `{ _type }` and the secret below set
// as the webhook's signing secret.
export async function POST(request) {
  try {
    const { isValidSignature, body } = await parseBody(request, process.env.SANITY_REVALIDATE_SECRET)

    if (!isValidSignature) {
      return Response.json({ message: 'Invalid signature' }, { status: 401 })
    }

    if (!body?._type) {
      return Response.json({ message: 'Missing _type in payload' }, { status: 400 })
    }

    revalidateTag(body._type)

    return Response.json({ revalidated: true, type: body._type, now: Date.now() })
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 })
  }
}
