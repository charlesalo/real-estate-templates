import { Resend } from 'resend'

const HUBSPOT_URL = 'https://api.hubapi.com/crm/v3/objects/contacts'
const OWNER_ID    = '94414048'

const resend = new Resend(process.env.RESEND_API_KEY)

function splitName(name = '') {
  const parts = name.trim().split(/\s+/)
  return {
    firstname: parts[0] ?? '',
    lastname:  parts.length > 1 ? parts.slice(1).join(' ') : '',
  }
}

async function sendEmailNotification({ firstname, lastname, email, phone, message }) {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone:    'America/Chicago',
    dateStyle:   'full',
    timeStyle:   'short',
  })

  await resend.emails.send({
    from:    'notifications@resend.dev',      // replace with your verified domain once set up
    to:      process.env.AGENT_EMAIL,
    subject: `New Lead: ${firstname} ${lastname}`.trim(),
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111827">
        <h2 style="color:#1A2D5A;margin-bottom:4px">New Contact Form Submission</h2>
        <p style="color:#6B7280;font-size:13px;margin-top:0">Source: Modern Team Contact Form</p>
        <hr style="border:none;border-top:1px solid #E5E7EB;margin:16px 0"/>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#6B7280;width:110px">Name</td><td style="padding:8px 0;font-weight:600">${firstname} ${lastname}</td></tr>
          <tr><td style="padding:8px 0;color:#6B7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#1A2D5A">${email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6B7280">Phone</td><td style="padding:8px 0">${phone || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#6B7280;vertical-align:top">Message</td><td style="padding:8px 0;white-space:pre-wrap">${message || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#6B7280">Timestamp</td><td style="padding:8px 0">${timestamp} CT</td></tr>
        </table>
      </div>
    `,
  })
}

async function upsertHubSpotContact(properties) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization:  `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
  }

  const createRes = await fetch(HUBSPOT_URL, {
    method:  'POST',
    headers,
    body:    JSON.stringify({ properties }),
  })

  if (createRes.ok) return { ok: true }

  if (createRes.status === 409) {
    const patchRes = await fetch(
      `${HUBSPOT_URL}/${encodeURIComponent(properties.email)}?idProperty=email`,
      { method: 'PATCH', headers, body: JSON.stringify({ properties }) }
    )
    if (patchRes.ok) return { ok: true }
    const errText = await patchRes.text()
    console.error('[leads/capture] HubSpot PATCH failed:', patchRes.status, errText)
    return { ok: false }
  }

  const errText = await createRes.text()
  console.error('[leads/capture] HubSpot POST failed:', createRes.status, errText)
  return { ok: false }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, firstName: rawFirst, lastName: rawLast, email, phone, message } = body

    if (!email) {
      return Response.json({ success: false, error: 'Email is required.' }, { status: 400 })
    }

    let firstname = rawFirst ?? ''
    let lastname  = rawLast  ?? ''
    if (name && !firstname) {
      ;({ firstname, lastname } = splitName(name))
    }

    // HubSpot contact properties
    // Internal names: email, firstname, lastname, phone, inquiry_message, hubspot_owner_id
    const properties = {
      email,
      firstname,
      lastname,
      hubspot_owner_id: OWNER_ID,
    }
    if (phone)   properties.phone           = phone
    if (message) properties.inquiry_message = message

    // Run HubSpot upsert and email notification in parallel.
    // Email fires regardless of HubSpot outcome so no lead is ever lost.
    const [hubspotResult, emailResult] = await Promise.allSettled([
      upsertHubSpotContact(properties),
      sendEmailNotification({ firstname, lastname, email, phone, message }),
    ])

    const hubspotOk = hubspotResult.status === 'fulfilled' && hubspotResult.value.ok
    const emailOk   = emailResult.status   === 'fulfilled'

    if (!hubspotOk) {
      console.error('[leads/capture] HubSpot upsert failed — email fallback status:', emailOk)
    }
    if (!emailOk) {
      console.error('[leads/capture] Email notification failed:', emailResult.reason)
    }

    // Succeed as long as at least one channel captured the lead
    if (hubspotOk || emailOk) {
      return Response.json({ success: true })
    }

    return Response.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )

  } catch (err) {
    console.error('[leads/capture] Unexpected error:', err)
    return Response.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
