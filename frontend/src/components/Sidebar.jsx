import React from 'react'
import { Home, Layers, Activity, ShieldCheck, DollarSign, User, LogOut, Wifi } from 'lucide-react'

function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'pens', label: 'Pens', icon: Layers },
    { id: 'livestock', label: 'Livestock', icon: Activity },
    { id: 'health', label: 'Health', icon: ShieldCheck },
    { id: 'financials', label: 'Financials', icon: DollarSign }
  ]

  return (
    <aside className="w-full md:w-72 min-h-screen bg-[#0f3d36] text-slate-100 shadow-[0_30px_80px_rgba(15,62,54,0.24)] overflow-hidden">
      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#0f3d36_0%,#1a5a4b_100%)] p-6">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,rgba(245,185,56,0.28),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]"></div>
        <div className="relative rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-[0_24px_48px_rgba(15,62,54,0.18)]">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-200/85">Ghana Farm</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Poultry Command</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-200/80">Smart poultry operations with real-time clarity.</p>
        </div>
      </div>

      <nav className="mt-8 px-4 space-y-2">
        {navItems.map(item => {
          const Icon = item.icon
          const active = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group flex w-full items-center gap-4 rounded-[24px] px-5 py-4 text-left transition-all ${
                active
                  ? 'bg-amber-200 text-emerald-950 shadow-[0_14px_40px_rgba(255,191,64,0.18)]'
                  : 'text-slate-200 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${active ? 'bg-emerald-950 text-amber-200' : 'bg-white/5 text-slate-200 group-hover:bg-white/10 group-hover:text-white'}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-10 px-4 pb-8">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-[0_24px_44px_rgba(15,62,54,0.14)]">
          <div className="flex items-center justify-between text-sm text-slate-200/80">
            <div>
              <p className="uppercase tracking-[0.28em] text-amber-200/90">Status</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.14)]"></span>
                <span className="font-medium text-white">Connected</span>
              </div>
            </div>
            <Wifi className="h-5 w-5 text-amber-200" />
          </div>
          <div className="mt-5 space-y-3 text-sm text-slate-200/80">
            <div className="flex items-center justify-between rounded-3xl bg-white/5 px-3 py-3">
              <span>Live feed</span>
              <span className="font-semibold text-white">Online</span>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-white/5 px-3 py-3">
              <span>Last sync</span>
              <span className="font-semibold text-white">Just now</span>
            </div>
          </div>
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-200 px-4 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-amber-300">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
