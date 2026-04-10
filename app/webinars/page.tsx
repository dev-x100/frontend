"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import { webinarApi, type Webinar } from "@/lib/api";

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "LIVE" | "RECORDED">("ALL");

  useEffect(() => {
    webinarApi
      .list({ page: 1 })
      .then(({ webinars }) => setWebinars(webinars))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const live = webinars.filter(
    (w) => w.type === "LIVE" && (filter === "ALL" || filter === "LIVE")
  );
  const recorded = webinars.filter(
    (w) => w.type === "RECORDED" && (filter === "ALL" || filter === "RECORDED")
  );

  return (
    <main className="bg-slate-50 text-slate-900">
      <PageHeader
        eyebrow="Webinars"
        title="Live expert sessions and an on-demand training library."
        description="Browse upcoming webinars and recorded briefings designed for HR, legal, quality, and operations teams."
      />

      {/* Filter tabs */}
      <div className="mx-auto max-w-6xl px-6 pt-10 lg:px-8">
        <div className="inline-flex rounded-xl bg-slate-200 p-1 gap-1">
          {(["ALL", "LIVE", "RECORDED"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                filter === f
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {f === "ALL" ? "All" : f === "LIVE" ? "Live Webinars" : "Recorded"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <>
          {/* Live webinars */}
          {(filter === "ALL" || filter === "LIVE") && live.length > 0 && (
            <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-8">
                Upcoming Live Webinars
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {live.map((w) => (
                  <WebinarCard key={w.id} webinar={w} />
                ))}
              </div>
            </section>
          )}

          {/* Recorded */}
          {(filter === "ALL" || filter === "RECORDED") && recorded.length > 0 && (
            <section className="border-t border-slate-200 bg-white">
              <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-3">
                  Recorded Sessions
                </h2>
                <p className="text-slate-600 mb-8">
                  Watch on your schedule — all recorded webinars include templates and resources.
                </p>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {recorded.map((w) => (
                    <WebinarCard key={w.id} webinar={w} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {webinars.length === 0 && (
            <div className="py-24 text-center text-slate-500">
              No webinars available at the moment.
            </div>
          )}
        </>
      )}
    </main>
  );
}

function WebinarCard({ webinar }: { webinar: Webinar }) {
  const isLive = webinar.type === "LIVE";
  const date = new Date(webinar.date);
  const price = Number(webinar.price);
  const spotsLeft = webinar.seats - (webinar._count?.registrations ?? 0);

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          isLive ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"
        }`}>
          {isLive ? "LIVE" : "RECORDED"}
        </span>
        <span className="text-xs text-slate-400">{webinar.category}</span>
      </div>

      <h3 className="text-base font-semibold text-slate-900 leading-snug line-clamp-2 flex-1">
        {webinar.title}
      </h3>

      <div className="mt-3 space-y-1">
        <p className="text-sm text-slate-600">🎙 {webinar.speaker}</p>
        {isLive && (
          <p className="text-sm text-slate-500">
            📅 {date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        )}
        {isLive && spotsLeft < 30 && spotsLeft > 0 && (
          <p className="text-xs text-red-500 font-medium">Only {spotsLeft} spots left!</p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-bold text-primary">
          {price === 0 ? "Free" : `$${price}`}
        </span>
        <Link
          href={`/webinars/${webinar.id}`}
          className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          {isLive ? "Reserve Seat →" : "Watch Now →"}
        </Link>
      </div>
    </article>
  );
}
