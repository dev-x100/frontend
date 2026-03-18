import Link from "next/link"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="text-2xl font-bold tracking-tight text-slate-900">
            TunuDada
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
            <Link href="/" className="transition hover:text-cyan-900">Home</Link>
            <Link href="/about" className="transition hover:text-cyan-900">About</Link>
            <Link href="/webinars" className="transition hover:text-cyan-900">Webinars</Link>
            <Link href="/training" className="transition hover:text-cyan-900">Training</Link>
            <Link href="/contact" className="transition hover:text-cyan-900">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              Login
            </Link>
            <Link
              href="/admin/dashboard"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-900"
            >
              Admin
            </Link>
          </div>
        </div>

        <div className="mt-4 flex gap-4 overflow-x-auto pb-1 text-sm font-medium text-slate-600 lg:hidden">
          <Link href="/" className="whitespace-nowrap rounded-full border border-slate-200 px-3 py-1.5">Home</Link>
          <Link href="/about" className="whitespace-nowrap rounded-full border border-slate-200 px-3 py-1.5">About</Link>
          <Link href="/webinars" className="whitespace-nowrap rounded-full border border-slate-200 px-3 py-1.5">Webinars</Link>
          <Link href="/training" className="whitespace-nowrap rounded-full border border-slate-200 px-3 py-1.5">Training</Link>
          <Link href="/contact" className="whitespace-nowrap rounded-full border border-slate-200 px-3 py-1.5">Contact</Link>
        </div>
      </nav>
    </header>
  )
}
