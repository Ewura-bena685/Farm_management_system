import React from 'react'
import { BarChart3, Droplet, ShieldAlert, TrendingUp, MapPin, Wallet, SunMedium, CloudRain, DollarSign } from 'lucide-react'

function OverviewTab({ data }) {
  const mockWeather = {
    rainySeasonOnset: 'May 25, 2026',
    drySpellAlert: 'High dry spell risk: May 20–27',
    trend: [18, 22, 19, 24, 26, 23, 27, 28, 26, 24]
  }

  const mockAlerts = [
    { id: 1, disease: 'PPR', region: 'Bono East', severity: 'medium', badge: 'bg-orange-100 text-orange-900' },
    { id: 2, disease: 'Newcastle', region: 'Northern', severity: 'low', badge: 'bg-amber-100 text-amber-900' }
  ]

  const mockTransactions = [
    { id: 1, provider: 'MTN MoMo', amount: 150.0, status: 'completed', date: 'May 15, 2026', label: 'Feed order', region: 'Accra' },
    { id: 2, provider: 'Vodafone Cash', amount: 250.0, status: 'pending', date: 'May 14, 2026', label: 'Pen supplies', region: 'Kumasi' }
  ]

  return (
    <div className="space-y-8 pb-8">
      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.95fr]">
        <section className="rounded-[32px] border border-slate-200/40 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-900/70">Weather overview</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Climate & poultry readiness</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">A premium climate snapshot tailored for Ghana poultry farms.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-3xl bg-emerald-950/95 px-4 py-3 text-sm text-amber-100 shadow-lg shadow-emerald-900/10">
                <p className="text-slate-200/70">Rainy season onset</p>
                <p className="mt-2 text-xl font-semibold">{mockWeather.rainySeasonOnset}</p>
              </div>
              <div className="rounded-3xl bg-[#f4ebe1] px-4 py-3 text-sm text-slate-900 shadow-lg shadow-amber-200/20">
                <p className="text-slate-500">Dry spell alert</p>
                <p className="mt-2 font-semibold">{mockWeather.drySpellAlert}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
            <div className="rounded-[28px] bg-[#073d36] p-6 text-white shadow-[0_30px_80px_rgba(15,62,54,0.18)]">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-amber-200/80">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-200/20 text-amber-100"><SunMedium className="h-5 w-5" /></span>
                Climate pulse
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-200/70">Humidity</p>
                  <p className="mt-2 text-3xl font-semibold">78%</p>
                </div>
                <div className="rounded-[24px] bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-200/70">Temperature</p>
                  <p className="mt-2 text-3xl font-semibold">27°C</p>
                </div>
              </div>
              <div className="mt-6 rounded-[24px] bg-white/10 p-4">
                <div className="flex items-center justify-between text-sm text-slate-200/70">
                  <span>10-day trend</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-800/70 px-3 py-1 text-xs font-semibold">Stable</span>
                </div>
                <div className="mt-4 flex items-end gap-1">
                  {mockWeather.trend.map((value, index) => (
                    <div key={index} className="w-full rounded-full bg-white/20" style={{ height: `${40 + value}px` }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-[#f7efe0] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-emerald-900/70">Regional climate map</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">Ghana weather zones</h3>
                </div>
                <span className="inline-flex items-center rounded-full bg-amber-200 px-3 py-2 text-sm font-semibold text-emerald-900">Interactive</span>
              </div>
              <div className="mt-6 relative overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-900 to-slate-800 p-6 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_26%)]"></div>
                <div className="relative h-56 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] p-4">
                  <div className="flex h-full flex-col justify-between">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-200/70">Ghana climate</p>
                    <div className="text-5xl font-semibold">GHANA</div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-slate-200/80">
                        <CloudRain className="h-4 w-4" /> 45% rain coverage
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-200/80">
                        <Droplet className="h-4 w-4" /> Moisture alert zones
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200/40 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-900/70">Total poultry</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">{data?.total_livestock ?? 0} birds</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-3xl bg-[#f7efe0] px-4 py-3 text-sm font-semibold text-amber-900">
                <BarChart3 className="h-5 w-5" /> Capacity
              </div>
            </div>
            <div className="mt-6 rounded-[24px] bg-[#fff0e1] p-4">
              <div className="flex items-center justify-between text-sm text-slate-700">
                <span>Current stock</span>
                <span>280 / 500</span>
              </div>
              <div className="mt-3 h-3 rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-amber-500" style={{ width: '56%' }} />
              </div>
              <p className="mt-3 text-sm text-slate-600">Trend up 14% from last week</p>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200/40 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-700">Disease alerts</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">{mockAlerts.length} active threats</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-3xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-900">
                <ShieldAlert className="h-4 w-4" /> Threat level
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {mockAlerts.map(alert => (
                <div key={alert.id} className="rounded-[28px] border border-slate-200/60 bg-slate-50 p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{alert.disease}</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">Region: {alert.region}</p>
                    </div>
                    <span className={`rounded-full px-3 py-2 text-xs font-semibold ${alert.badge}`}>{alert.severity.toUpperCase()}</span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white/95 p-4">
                      <p className="text-xs text-slate-500">Affected zone</p>
                      <p className="mt-2 text-sm text-slate-700">{alert.region}</p>
                    </div>
                    <div className="rounded-3xl bg-white/95 p-4">
                      <p className="text-xs text-slate-500">Recommended action</p>
                      <p className="mt-2 text-sm text-slate-700">Review biosecurity and vaccination plan.</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] border border-slate-200/40 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-700">Recent activity</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">MoMo payments</h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">Activity feed</span>
          </div>
          <div className="mt-6 space-y-4">
            {mockTransactions.map(tx => (
              <div key={tx.id} className="rounded-[28px] border border-slate-200/70 bg-slate-50 p-4 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-3xl bg-white p-3 shadow-sm">
                      <Wallet className="h-5 w-5 text-emerald-950" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{tx.label}</p>
                      <p className="text-sm text-slate-600">{tx.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-900">
                    <span className="font-semibold">GHS {tx.amount.toFixed(2)}</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tx.status === 'completed' ? 'bg-emerald-100 text-emerald-900' : tx.status === 'pending' ? 'bg-amber-100 text-amber-900' : 'bg-red-100 text-red-900'}`}>
                      {tx.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                  <span>{tx.date}</span>
                  <span className="inline-flex items-center gap-2 text-slate-700"><MapPin className="h-4 w-4" /> {tx.region}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200/40 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-700">Quick insight</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">Balance performance</h3>
            </div>
            <div className="rounded-3xl bg-[#f3e5cc] px-4 py-2 text-sm font-semibold text-amber-900">Fast view</div>
          </div>
          <div className="mt-6 space-y-5">
            <div className="rounded-[28px] bg-[#fff5e4] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-600">MoMo balance</p>
                  <p className="mt-2 text-3xl font-semibold text-emerald-950">GHS {data?.momo_balance?.toFixed(2) ?? '0.00'}</p>
                </div>
                <DollarSign className="h-6 w-6 text-amber-800" />
              </div>
              <div className="mt-4 h-2 rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-amber-500" style={{ width: '68%' }} />
              </div>
              <p className="mt-3 text-sm text-slate-600">Balanced against last month’s cash flow.</p>
            </div>
            <div className="rounded-[28px] bg-[#f7efe0] p-5">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-slate-600">
                <TrendingUp className="h-4 w-4 text-emerald-900" /> Growth momentum
              </div>
              <p className="mt-3 text-lg font-semibold text-slate-900">+12% cash flow improvement</p>
              <p className="mt-2 text-sm text-slate-600">Better feed planning and vaccination spend control improved yield.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default OverviewTab

