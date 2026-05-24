const HOST = 'schooldigger-k-12-school-data-api.p.rapidapi.com'

function formatGrade(g) {
  if (!g) return ''
  if (g === 'PK') return 'PreK'
  if (g === 'KG') return 'K'
  const n = parseInt(g)
  if (isNaN(n)) return g
  if (n === 1) return '1st'
  if (n === 2) return '2nd'
  if (n === 3) return '3rd'
  return `${n}th`
}

function getLevel(school) {
  const level = (school.schoolLevel ?? '').toLowerCase()
  if (level === 'elementary') return 'elementary'
  if (level === 'middle')     return 'middle'
  if (level === 'high')       return 'high'
  return 'mixed'
}

export async function getSchools(zipCode, state = 'TX') {
  const key = process.env.RAPIDAPI_KEY
  if (!key) return null

  try {
    const params = new URLSearchParams({
      zip:     zipCode,
      st:      state,
      perPage: '50',
      page:    '1',
    })

    const res = await fetch(
      `https://${HOST}/v2.0/schools?${params}`,
      {
        headers: {
          'X-RapidAPI-Host': HOST,
          'X-RapidAPI-Key':  key,
        },
        next: { revalidate: 86400 },
      },
    )
    if (!res.ok) return null

    const data = await res.json()
    const list = data.schoolList ?? []

    return list.map(s => ({
      id:         s.schoolid,
      name:       s.schoolName,
      address:    [s.address?.street, s.address?.city, s.address?.state, s.address?.zip]
                    .filter(Boolean).join(', '),
      isPrivate:  s.isPrivate ?? false,
      isCharter:  s.isCharterSchool === 'Yes',
      isMagnet:   s.isMagnetSchool === 'Yes',
      gradeRange: `${formatGrade(s.lowGrade)} – ${formatGrade(s.highGrade)}`,
      level:      getLevel(s),
      rating:     s.rankHistory?.[0]?.rankStars ?? null,
      url:        s.url ?? null,
    }))
  } catch {
    return null
  }
}
