import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="text-2xl font-semibold tracking-tight">dev-x<span className="text-amber-400">100</span></p>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Compliance-focused webinars and advisory programs designed for execution, not theory.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            <li><Link href="/about" className="transition hover:text-amber-300">About Us</Link></li>
            <li><Link href="/webinars" className="transition hover:text-amber-300">Upcoming Webinars</Link></li>
            <li><Link href="/training" className="transition hover:text-amber-300">Training Tracks</Link></li>
            <li><Link href="/contact" className="transition hover:text-amber-300">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Support</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            <li>Phone: +1 (727) 474-1465</li>
            <li>Email: support@dev-x100.com</li>
            <li>Sarasota, FL</li>
            <li>Las Vegas, NV</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Get Updates</h3>
          <p className="mt-4 text-sm text-slate-300">Receive webinar alerts and regulatory insights once a week.</p>
          <form className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="Work email"
              className="w-full rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 outline-none ring-amber-400 placeholder:text-slate-500 focus:ring"
            />
            <button
              type="button"
              className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-5 text-xs text-slate-400 md:flex-row lg:px-8">
          <p>Copyright © 2026 dev-x100. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition hover:text-slate-100">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-slate-100">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
