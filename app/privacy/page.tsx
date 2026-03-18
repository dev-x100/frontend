import PageHeader from "@/components/site/PageHeader"

export default function PrivacyPage() {
  return (
    <main className="bg-white text-slate-900">
      <PageHeader
        eyebrow="Privacy Policy"
        title="How we collect and use information"
        description="This page outlines the basic data handling practices for webinar registrations, communications, and support interactions."
      />

      <section className="mx-auto max-w-4xl space-y-6 px-6 py-14 text-sm leading-7 text-slate-700 lg:px-8">
        <p>We collect contact and registration information to deliver webinar access, event reminders, and training resources.</p>
        <p>We do not sell personal information. Data is used to improve service quality, support client requests, and maintain platform security.</p>
        <p>You may request updates or deletion of your personal details by contacting support@tunudada.com.</p>
      </section>
    </main>
  )
}
