export async function POST(request) {
  const data = await request.json()
  console.log('Contact form submission:', data)
  return Response.json({ success: true })
}
