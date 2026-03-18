type PageHeaderProps = {
  eyebrow: string
  title: string
  description: string
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_15%_20%,rgba(12,74,110,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.2),transparent_40%),linear-gradient(180deg,#f8fafc_0%,#ffffff_65%)]">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-900/80">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          {description}
        </p>
      </div>
    </section>
  )
}
