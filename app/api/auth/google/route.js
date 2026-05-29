import { NextResponse } from 'next/server'

export async function POST(req) {
  const { credential } = await req.json()
  if (!credential) return NextResponse.json({ error: 'Missing credential' }, { status: 400 })

  // Verify the token with Google
  const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`)
  if (!res.ok) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const payload = await res.json()

  // Verify the audience matches our client ID
  if (payload.aud !== process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    return NextResponse.json({ error: 'Token audience mismatch' }, { status: 401 })
  }

  const user = {
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
    googleId: payload.sub,
  }

  return NextResponse.json({ ok: true, user })
}
