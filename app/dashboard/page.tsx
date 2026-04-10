"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { webinarApi, type Registration } from "@/lib/api";

export default function UserDashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user?.role === "ADMIN") router.push("/admin/dashboard");
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === "USER") {
      webinarApi
        .myRegistrations()
        .then(({ registrations }) => setRegistrations(registrations))
        .catch(() => {})
        .finally(() => setFetching(false));
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const upcoming = registrations.filter(
    (r) => r.webinar.type === "LIVE" && new Date(r.webinar.date) >= new Date()
  );
  const past = registrations.filter(
    (r) => r.webinar.type === "RECORDED" || new Date(r.webinar.date) < new Date()
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold text-primary">
            Tunu<span className="text-amber-500">Dada</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              Hi, <strong>{user.name}</strong>
            </span>
            <button
              onClick={logout}
              className="rounded-lg bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
          {[
            { label: "Total Registrations", value: registrations.length },
            { label: "Upcoming Webinars", value: upcoming.length },
            { label: "Recorded Sessions", value: past.length },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className="mt-2 text-4xl font-bold text-primary">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">My Webinars</h1>
          <Link
            href="/webinars"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
          >
            Browse Webinars
          </Link>
        </div>

        {fetching ? (
          <p className="text-slate-500">Loading your registrations…</p>
        ) : registrations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
            <p className="text-slate-500 text-lg">You haven't registered for any webinars yet.</p>
            <Link
              href="/webinars"
              className="mt-4 inline-block rounded-lg bg-amber-400 px-6 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-300"
            >
              Explore Webinars
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {upcoming.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-semibold text-slate-700">Upcoming Live Webinars</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((r) => (
                    <WebinarCard key={r.id} registration={r} />
                  ))}
                </div>
              </section>
            )}
            {past.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-semibold text-slate-700">Recorded Sessions</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {past.map((r) => (
                    <WebinarCard key={r.id} registration={r} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function WebinarCard({ registration }: { registration: Registration }) {
  const { webinar } = registration;
  const isLive = webinar.type === "LIVE";
  const date = new Date(webinar.date);
  const isPaid = registration.paymentStatus === "PAID";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          isLive ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"
        }`}>
          {isLive ? "LIVE" : "RECORDED"}
        </span>
        <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${
          isPaid ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"
        }`}>
          {isPaid ? "✓ Paid" : "Pending"}
        </span>
      </div>
      <h3 className="mt-2 font-semibold text-slate-900 leading-snug line-clamp-2">
        {webinar.title}
      </h3>
      <p className="mt-1 text-sm text-slate-500">{webinar.speaker}</p>
      <p className="mt-2 text-xs text-slate-400">
        {isLive
          ? date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
          : "On Demand"}
      </p>
      <span className="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
        {webinar.category}
      </span>

      {/* FR-16 — Zoom links only visible to paid attendees */}
      {isPaid && webinar.zoomJoinUrl && (
        <a
          href={webinar.zoomJoinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#2D8CFF] py-2 text-xs font-bold text-white hover:bg-blue-600 transition-colors"
        >
          🎥 Join Zoom
        </a>
      )}
    </article>
  );
}
