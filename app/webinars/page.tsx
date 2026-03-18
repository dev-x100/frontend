import PageHeader from "@/components/site/PageHeader"

const upcoming = [
  {
    title: "PTO vs. Sick Leave Policy: Choosing the Right Structure",
    speaker: "Bob McKenzie",
    date: "March 24, 2026",
    category: "HR Compliance",
  },
  {
    title: "How to Document Employee Behavior Without Bias",
    speaker: "Suzanne Lucas",
    date: "March 25, 2026",
    category: "Employee Relations",
  },
  {
    title: "Smart Start Onboarding for 2026",
    speaker: "Marcia Zidle",
    date: "March 29, 2026",
    category: "Talent Development",
  },
]

const recorded = [
  "Retaliation and Whistleblower Claims: Litigation Prevention",
  "Cannabis in the Workplace: Policy Updates and Risk Controls",
  "Linking Pay to Performance for Better Engagement",
]

export default function WebinarsPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <PageHeader
        eyebrow="Webinars"
        title="Live expert sessions and an on-demand training library."
        description="Browse upcoming webinars and recorded briefings designed for HR, legal, quality, and operations teams."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Upcoming Live Webinars</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-900/70">{item.category}</p>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-600">Speaker: {item.speaker}</p>
              <p className="text-sm text-slate-500">Date: {item.date}</p>
              <button className="mt-5 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-900">
                Reserve Seat
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Recorded Sessions</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Catch up at any time with a growing archive of practical webinars, downloadable resources, and implementation templates.
          </p>
          <ul className="mt-8 space-y-4">
            {recorded.map((title) => (
              <li key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                {title}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
