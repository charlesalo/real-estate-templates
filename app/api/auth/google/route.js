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

  // Notify agent via Web3Forms when a lead signs in with Google 1-tap
  const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
  if (web3Key) {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: web3Key,
        subject: `New Lead via Google Sign-In: ${user.name}`,
        name: user.name,
        email: user.email,
        message: `A new lead signed in with Google 1-tap.\n\nName: ${user.name}\nEmail: ${user.email}`,
        from_name: 'Website Lead Capture',
      }),
    }).catch(() => {})
  }

  return NextResponse.json({ ok: true, user })
}
