export default function Features() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8" id="services">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-900/80">Service Pillars</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Built to match your training, audit, and compliance priorities.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Upcoming Webinars</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Join live sessions with specialists in HR, legal, and operational compliance.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Recorded Library</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Access a searchable archive of past trainings with downloadable reference assets.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Team Programs</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Launch private cohorts for managers and department leads with outcome tracking.
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-900 text-slate-100" id="about">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">About dev-x100</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">In-house research with real-world implementation support.</h2>
            <p className="mt-4 text-slate-300">
              We translate legal and policy updates into plain-language workshops, manager scripts, and action plans that teams can execute.
            </p>
          </div>

          <ul className="space-y-4 text-sm text-slate-200">
            <li className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">Renowned practitioners and advisors</li>
            <li className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">Regulatory training modules by industry</li>
            <li className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">Practical templates and implementation checklists</li>
            <li className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">Continuous quality and safety improvement focus</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8" id="testimonials">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Client Testimonials</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <blockquote className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-700">
            &ldquo;Strong content and practical examples. Our managers used the templates right away.&rdquo;
            <p className="mt-4 font-semibold text-slate-900">Antony Mick</p>
          </blockquote>
          <blockquote className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-700">
            &ldquo;Support was excellent and we stayed current with policy updates across teams.&rdquo;
            <p className="mt-4 font-semibold text-slate-900">David Simon</p>
          </blockquote>
          <blockquote className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-700">
            &ldquo;A creative training partner for regulatory and workplace risk programs.&rdquo;
            <p className="mt-4 font-semibold text-slate-900">John MK</p>
          </blockquote>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-gradient-to-r from-cyan-50 via-slate-50 to-amber-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-14 text-center md:grid-cols-3 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-4xl font-semibold text-slate-900">1296</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">Happy Customers</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-4xl font-semibold text-slate-900">342</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">Successful Webinars</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-4xl font-semibold text-slate-900">40</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">Industry Awards</p>
          </div>
        </div>
      </section>
    </>
  )
}
