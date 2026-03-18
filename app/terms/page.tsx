import PageHeader from "@/components/site/PageHeader"

export default function TermsPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <PageHeader
        eyebrow="Terms"
        title="Platform terms and conditions"
        description="These terms describe usage rules for webinar registrations, recorded content access, and account security responsibilities."
      />

      <section className="mx-auto max-w-4xl space-y-6 px-6 py-14 text-sm leading-7 text-slate-700 lg:px-8">
        <p>All webinar and course materials are intended for internal educational use unless otherwise stated.</p>
        <p>Users are responsible for maintaining account credentials and reporting unauthorized account activity.</p>
        <p>By using this platform, you agree to comply with applicable laws and organizational policies.</p>
      </section>
    </main>
  )
}
