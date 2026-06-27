const HUBSPOT_URL = 'https://api.hubapi.com/crm/v3/objects/contacts'

function splitName(name = '') {
  const parts = name.trim().split(/\s+/)
  const firstname = parts[0] ?? ''
  const lastname = parts.length > 1 ? parts.slice(1).join(' ') : ''
  return { firstname, lastname }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, firstName: rawFirst, lastName: rawLast, email, phone, message } = body

    if (!email) {
      return Response.json({ success: false, error: 'Email is required.' }, { status: 400 })
    }

    let firstname = rawFirst ?? ''
    let lastname = rawLast ?? ''
    if (name && !firstname) {
      ;({ firstname, lastname } = splitName(name))
    }

    const properties = { email, firstname, lastname }
    if (phone) properties.phone = phone

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
    }

    const createRes = await fetch(HUBSPOT_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ properties }),
    })

    if (createRes.ok) {
      return Response.json({ success: true })
    }

    if (createRes.status === 409) {
      // Contact already exists — update by email using idProperty
      const patchRes = await fetch(
        `${HUBSPOT_URL}/${encodeURIComponent(email)}?idProperty=email`,
        { method: 'PATCH', headers, body: JSON.stringify({ properties }) }
      )

      if (patchRes.ok) {
        return Response.json({ success: true })
      }

      console.error('[leads/capture] HubSpot PATCH failed:', patchRes.status, await patchRes.text())
      return Response.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    console.error('[leads/capture] HubSpot POST failed:', createRes.status, await createRes.text())
    return Response.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 })

  } catch (err) {
    console.error('[leads/capture] Unexpected error:', err)
    return Response.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
