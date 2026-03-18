import PageHeader from "@/components/site/PageHeader"

export default function ContactPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <PageHeader
        eyebrow="Contact"
        title="Tell us your goals and we will recommend the right program."
        description="Share your team size, compliance focus, and timeline. We will help you pick a training path that fits your operational priorities."
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Support Information</h2>
          <p className="mt-4 text-sm text-slate-600">Phone: +1 (727) 474-1465</p>
          <p className="text-sm text-slate-600">Email: support@tunudada.com</p>
          <p className="mt-4 text-sm text-slate-600">Hours: Monday - Friday, 9:00 AM to 6:00 PM EST</p>
          <p className="mt-4 text-sm text-slate-600">Locations: Sarasota, FL and Las Vegas, NV</p>
        </div>

        <form className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Send a Message</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-cyan-500 focus:ring" placeholder="Full name" />
            <input className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-cyan-500 focus:ring" placeholder="Work email" type="email" />
            <input className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-cyan-500 focus:ring md:col-span-2" placeholder="Company" />
            <textarea className="min-h-32 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-cyan-500 focus:ring md:col-span-2" placeholder="How can we help?" />
          </div>
          <button type="button" className="mt-6 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-900">
            Submit Inquiry
          </button>
        </form>
      </section>
    </main>
  )
}
