function BarRow({ label, pct, color = '#C9A96E' }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-xs text-white/55 font-sans">{label}</span>
        <span className="text-xs font-semibold text-white font-sans">{pct}%</span>
      </div>
      <div className="h-px bg-white/[0.08] relative overflow-visible">
        <div
          className="absolute top-0 left-0 h-px"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="bg-[#111111] border border-white/10 p-6">
      <p className="text-[12px] tracking-[0.3em] uppercase text-white/30 font-sans mb-2">{label}</p>
      <p className="font-heading text-3xl font-normal text-white">{value}</p>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-[#111111] border border-white/10 p-6">
      <p className="text-[12px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans mb-6">{title}</p>
      {children}
    </div>
  )
}

export default function NeighborhoodDemographics({ neighborhoodName, demo }) {
  if (!demo) return null

  return (
    <section className="bg-[#0A0A0A] border-t border-white/10 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
          <div>
            <p className="text-[12px] tracking-[0.45em] uppercase text-[#C9A96E] mb-3 font-sans">
              By the Numbers
            </p>
            <h2 className="font-heading text-2xl lg:text-3xl font-normal text-white">
              Community Demographics
            </h2>
            <div className="w-8 h-px bg-[#C9A96E] mt-4" />
          </div>
          <p className="text-[12px] text-white/20 font-sans">
            U.S. Census Bureau · ACS 5-Year Estimates · ZIP {demo.zip}
          </p>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total Population"   value={demo.population.total} />
          <StatCard label="Median Age"         value={demo.population.medianAge} />
          <StatCard label="Median HH Income"   value={demo.income.medianHousehold} />
        </div>

        {/* Row 1: Age + Race */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

          <ChartCard title="Age Distribution">
            <div className="space-y-5">
              {demo.age.map(a => (
                <BarRow key={a.label} label={a.label} pct={a.pct} />
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Race &amp; Ethnicity">
            <div className="space-y-5">
              {demo.race.map(r => (
                <BarRow key={r.label} label={r.label} pct={r.pct} color="rgba(201,169,110,0.6)" />
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Row 2: Education + Employment + Housing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {demo.education && (
            <ChartCard title="Education (Age 25+)">
              <div className="space-y-5">
                {demo.education.map(e => (
                  <BarRow key={e.label} label={e.label} pct={e.pct} />
                ))}
              </div>
            </ChartCard>
          )}

          <ChartCard title="Employment">
            <div className="space-y-5">
              {[
                { label: 'Employment Rate',    value: demo.employment.employmentRate },
                { label: 'Unemployment Rate',  value: demo.employment.unemploymentRate },
                { label: 'Labor Participation', value: demo.employment.laborParticipation },
              ].map((s, i) => (
                <div key={s.label} className={i > 0 ? 'pt-5 border-t border-white/[0.06]' : ''}>
                  <p className="text-[12px] tracking-[0.2em] uppercase text-white/30 font-sans mb-1">{s.label}</p>
                  <p className="font-heading text-2xl font-normal text-white">{s.value}</p>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Housing">
            <div className="space-y-5">
              {[
                { label: 'Total Units',      value: demo.housing.total },
                { label: 'Median Value',     value: demo.housing.medianValue },
                { label: 'Median Rent',      value: demo.housing.medianRent },
              ].map((s, i) => (
                <div key={s.label} className={i > 0 ? 'pt-5 border-t border-white/[0.06]' : ''}>
                  <p className="text-[12px] tracking-[0.2em] uppercase text-white/30 font-sans mb-1">{s.label}</p>
                  <p className="font-heading text-2xl font-normal text-white">{s.value}</p>
                </div>
              ))}

              {/* Owner vs Renter bar */}
              <div className="pt-5 border-t border-white/[0.06]">
                <p className="text-[12px] tracking-[0.2em] uppercase text-white/30 font-sans mb-3">Owner vs. Renter</p>
                <div className="h-1 bg-white/[0.08] overflow-hidden flex">
                  <div className="h-full bg-[#C9A96E]"        style={{ width: `${demo.housing.ownerPct}%` }} />
                  <div className="h-full bg-[#C9A96E]/30"     style={{ width: `${demo.housing.renterPct}%` }} />
                </div>
                <div className="flex justify-between text-[12px] text-white/30 mt-2 font-sans">
                  <span>Owner {demo.housing.ownerPct}%</span>
                  <span>Renter {demo.housing.renterPct}%</span>
                </div>
              </div>
            </div>
          </ChartCard>

        </div>
      </div>
    </section>
  )
}
