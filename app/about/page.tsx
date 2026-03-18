import PageHeader from "@/components/site/PageHeader"

const capabilities = [
  {
    title: "Regulatory Training",
    copy: "Live and on-demand sessions that simplify dense compliance updates into practical playbooks for people teams and legal leaders.",
  },
  {
    title: "In-House Research",
    copy: "Analyst-backed briefs and checklists translated from current rulings, policy changes, and workforce trends.",
  },
  {
    title: "Operational Advisory",
    copy: "Hands-on support to turn webinar learnings into repeatable internal processes, templates, and manager training.",
  },
]

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">
      <PageHeader
        eyebrow="About Us"
        title="We help organizations train faster, stay compliant, and lead with confidence."
        description="Our team combines legal, HR, and operations expertise to create practical learning experiences that reduce risk and improve decision quality."
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3 lg:px-8">
        {capabilities.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="border-y border-slate-200 bg-slate-900 text-slate-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">What makes us different</h2>
            <p className="mt-4 text-slate-300">
              We build every program around implementation. Participants leave with scripts, templates, and action plans they can use immediately.
            </p>
          </div>
          <ul className="space-y-4 text-sm text-slate-200">
            <li className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">Expert-led curriculum updated for current legal and workplace standards.</li>
            <li className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">Flexible delivery: live webinars, recorded courses, and private team cohorts.</li>
            <li className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">Dedicated client success support for rollout planning and adoption.</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
