import PageHeader from "@/components/site/PageHeader"

const trainingTracks = [
  {
    name: "HR and Employee Relations",
    bullets: ["Policy drafting and documentation", "Investigations and corrective action", "Manager communication scripts"],
  },
  {
    name: "Regulatory and Legal",
    bullets: ["Regulatory update briefings", "Risk and audit readiness", "Cross-team compliance workflows"],
  },
  {
    name: "Operations and Leadership",
    bullets: ["Process change adoption", "Performance accountability frameworks", "Team coaching for execution"],
  },
]

export default function TrainingPage() {
  return (
    <main className="bg-white text-slate-900">
      <PageHeader
        eyebrow="Training"
        title="Training programs built for implementation, not just information."
        description="Choose targeted learning tracks for your teams, with workshop materials and follow-up support to ensure execution."
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {trainingTracks.map((track) => (
          <article key={track.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{track.name}</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {track.bullets.map((bullet) => (
                <li key={bullet} className="rounded-md bg-white px-3 py-2 border border-slate-100">
                  {bullet}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  )
}
