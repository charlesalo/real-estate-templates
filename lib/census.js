const BASE = 'https://api.census.gov/data/2023/acs/acs5'
const KEY = process.env.CENSUS_API_KEY ? `&key=${process.env.CENSUS_API_KEY}` : ''

// Census returns special negative codes for suppressed/missing data
function parse(val) {
  const n = parseInt(val)
  return !isNaN(n) && n >= 0 ? n : 0
}

function pct(n, d) {
  return d > 0 ? Math.round((n / d) * 100) : 0
}

function fmtNum(n) {
  return n > 0 ? n.toLocaleString() : 'N/A'
}

function fmtMoney(n) {
  return n > 0 ? `$${n.toLocaleString()}` : 'N/A'
}

async function fetchACS(vars, zcta) {
  const url = `${BASE}?get=${vars.join(',')}&for=zip%20code%20tabulation%20area:${zcta}${KEY}`
  const res = await fetch(url, { next: { revalidate: 86400 } })
  if (!res.ok) return null
  const json = await res.json()
  if (!Array.isArray(json) || json.length < 2) return null
  const headers = json[0]
  const row = json[1]
  const get = (key) => parse(row[headers.indexOf(key)])
  return get
}

// Call 1: overview + education + employment + race  (28 variables)
const VARS_A = [
  'B01003_001E', 'B01002_001E', 'B19013_001E',
  'B25001_001E', 'B25003_001E', 'B25003_002E', 'B25003_003E', 'B25077_001E', 'B25064_001E',
  'B15003_001E', 'B15003_017E', 'B15003_018E', 'B15003_019E', 'B15003_020E',
  'B15003_021E', 'B15003_022E', 'B15003_023E', 'B15003_024E', 'B15003_025E',
  'B23025_002E', 'B23025_004E', 'B23025_005E', 'B23025_007E',
  'B03002_001E', 'B03002_003E', 'B03002_004E', 'B03002_006E', 'B03002_012E',
]

// Call 2: age distribution from B01001 (46 variables)
const VARS_B = [
  'B01001_003E','B01001_004E','B01001_005E','B01001_006E',
  'B01001_007E','B01001_008E','B01001_009E','B01001_010E','B01001_011E','B01001_012E',
  'B01001_013E','B01001_014E','B01001_015E','B01001_016E','B01001_017E','B01001_018E','B01001_019E',
  'B01001_020E','B01001_021E','B01001_022E','B01001_023E','B01001_024E','B01001_025E',
  'B01001_027E','B01001_028E','B01001_029E','B01001_030E',
  'B01001_031E','B01001_032E','B01001_033E','B01001_034E','B01001_035E','B01001_036E',
  'B01001_037E','B01001_038E','B01001_039E','B01001_040E','B01001_041E','B01001_042E','B01001_043E',
  'B01001_044E','B01001_045E','B01001_046E','B01001_047E','B01001_048E','B01001_049E',
]

export async function getCensusData(zipCode) {
  try {
    const [getA, getB] = await Promise.all([
      fetchACS(VARS_A, zipCode),
      fetchACS(VARS_B, zipCode),
    ])
    if (!getA || !getB) return null

    const pop = getA('B01003_001E')
    const medianAge = getA('B01002_001E')
    const medianIncome = getA('B19013_001E')

    // Housing
    const totalHousing = getA('B25001_001E')
    const occupiedTotal = getA('B25003_001E')
    const ownerOcc = getA('B25003_002E')
    const renterOcc = getA('B25003_003E')
    const medianHomeValue = getA('B25077_001E')
    const medianRent = getA('B25064_001E')

    // Education
    const edu25Plus = getA('B15003_001E')
    const hsGED = getA('B15003_017E') + getA('B15003_018E')
    const someCollege = getA('B15003_019E') + getA('B15003_020E') + getA('B15003_021E')
    const bachelors = getA('B15003_022E')
    const graduate = getA('B15003_023E') + getA('B15003_024E') + getA('B15003_025E')
    const bachelorsPlus = bachelors + graduate
    const lessThanHS = Math.max(0, edu25Plus - hsGED - someCollege - bachelorsPlus)

    // Employment
    const inLaborForce = getA('B23025_002E')
    const employed = getA('B23025_004E')
    const unemployed = getA('B23025_005E')
    const notInLaborForce = getA('B23025_007E')

    // Race
    const totalRace = getA('B03002_001E')
    const white = getA('B03002_003E')
    const black = getA('B03002_004E')
    const asian = getA('B03002_006E')
    const hispanic = getA('B03002_012E')
    const other = Math.max(0, totalRace - white - black - asian - hispanic)

    // Age
    const sum = (...keys) => keys.reduce((s, k) => s + getB(k), 0)
    const under18 = sum(
      'B01001_003E','B01001_004E','B01001_005E','B01001_006E',
      'B01001_027E','B01001_028E','B01001_029E','B01001_030E',
    )
    const age1834 = sum(
      'B01001_007E','B01001_008E','B01001_009E','B01001_010E','B01001_011E','B01001_012E',
      'B01001_031E','B01001_032E','B01001_033E','B01001_034E','B01001_035E','B01001_036E',
    )
    const age3564 = sum(
      'B01001_013E','B01001_014E','B01001_015E','B01001_016E','B01001_017E','B01001_018E','B01001_019E',
      'B01001_037E','B01001_038E','B01001_039E','B01001_040E','B01001_041E','B01001_042E','B01001_043E',
    )
    const age65plus = sum(
      'B01001_020E','B01001_021E','B01001_022E','B01001_023E','B01001_024E','B01001_025E',
      'B01001_044E','B01001_045E','B01001_046E','B01001_047E','B01001_048E','B01001_049E',
    )

    return {
      zip: zipCode,
      population: { total: fmtNum(pop), medianAge },
      income: { medianHousehold: fmtMoney(medianIncome) },
      age: [
        { label: 'Under 18',  pct: pct(under18, pop) },
        { label: '18 – 34',   pct: pct(age1834, pop) },
        { label: '35 – 64',   pct: pct(age3564, pop) },
        { label: '65+',        pct: pct(age65plus, pop) },
      ],
      education: edu25Plus > 0 ? [
        { label: "Bachelor's or Higher", pct: pct(bachelorsPlus, edu25Plus) },
        { label: 'Some College / Associate\'s', pct: pct(someCollege, edu25Plus) },
        { label: 'High School / GED',  pct: pct(hsGED, edu25Plus) },
        { label: 'Less than High School', pct: pct(lessThanHS, edu25Plus) },
      ] : null,
      employment: {
        employmentRate: inLaborForce > 0 ? `${pct(employed, inLaborForce)}%` : 'N/A',
        unemploymentRate: inLaborForce > 0 ? `${pct(unemployed, inLaborForce)}%` : 'N/A',
        laborParticipation: (inLaborForce + notInLaborForce) > 0
          ? `${pct(inLaborForce, inLaborForce + notInLaborForce)}%`
          : 'N/A',
        notInLaborForce: fmtNum(notInLaborForce),
      },
      housing: {
        total: fmtNum(totalHousing),
        medianValue: fmtMoney(medianHomeValue),
        medianRent: fmtMoney(medianRent),
        ownerPct: pct(ownerOcc, occupiedTotal),
        renterPct: pct(renterOcc, occupiedTotal),
      },
      race: [
        { label: 'White',               pct: pct(white, totalRace) },
        { label: 'Hispanic / Latino',   pct: pct(hispanic, totalRace) },
        { label: 'Black / African Am.', pct: pct(black, totalRace) },
        { label: 'Asian',               pct: pct(asian, totalRace) },
        { label: 'Other',               pct: pct(other, totalRace) },
      ].filter(r => r.pct > 0).sort((a, b) => b.pct - a.pct),
    }
  } catch {
    return null
  }
}
