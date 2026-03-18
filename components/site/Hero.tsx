import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_10%_15%,rgba(8,145,178,0.25),transparent_35%),radial-gradient(circle_at_85%_0%,rgba(245,158,11,0.22),transparent_35%),linear-gradient(135deg,#f8fafc_0%,#ffffff_75%)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-900/80">Live Learning Ecosystem</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
            Practical compliance webinars for modern operations teams.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            Build confident HR, legal, and leadership teams with expert-led sessions, recorded libraries, and implementation resources.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/webinars" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-900">
              Browse Webinars
            </Link>
            <Link href="/contact" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900">
              Talk to an Advisor
            </Link>
          </div>
        </div>

        <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-xl backdrop-blur">
          <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-900/80">Next Session</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">How to Document Employee Behavior</h2>
            <p className="mt-2 text-sm text-slate-600">March 25, 2026 • Suzanne Lucas</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-2xl font-semibold text-slate-900">340+</p>
              <p className="text-xs text-slate-500">Clients</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-2xl font-semibold text-slate-900">1200+</p>
              <p className="text-xs text-slate-500">Webinars</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-2xl font-semibold text-slate-900">96%</p>
              <p className="text-xs text-slate-500">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
