"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { webinarApi, paymentApi, type Webinar } from "@/lib/api";

export default function WebinarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [webinar, setWebinar] = useState<Webinar | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const cancelled = searchParams.get("payment") === "cancelled";

  useEffect(() => {
    webinarApi
      .get(id)
      .then(({ webinar }) => setWebinar(webinar))
      .catch(() => router.push("/webinars"))
      .finally(() => setLoading(false));
  }, [id, router]);

  async function handleRegister() {
    if (!user) {
      router.push("/login");
      return;
    }
    setPaying(true);
    setError("");
    try {
      const result = await paymentApi.checkout(id);
      if (result.free) {
        router.push("/dashboard?registered=1");
      } else if (result.url) {
        window.location.href = result.url; // Redirect to Stripe
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!webinar) return null;

  const date = new Date(webinar.date);
  const isLive = webinar.type === "LIVE";
  const isFuture = date > new Date();
  const spotsLeft = webinar.seats - (webinar._count?.registrations ?? 0);
  const price = Number(webinar.price);

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <Link href="/webinars" className="text-sm text-slate-400 hover:text-white mb-6 inline-block">
            ← Back to Webinars
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isLive ? "bg-green-500/20 text-green-400" : "bg-purple-500/20 text-purple-400"
            }`}>
              {isLive ? "LIVE WEBINAR" : "RECORDED · ON DEMAND"}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
              {webinar.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold lg:text-4xl max-w-3xl leading-tight">
            {webinar.title}
          </h1>
          <p className="mt-4 text-slate-400 text-lg">
            with <span className="font-semibold text-amber-400">{webinar.speaker}</span>
          </p>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Description */}
          <div className="lg:col-span-2 space-y-6">
            {webinar.description && (
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">About this Webinar</h2>
                <p className="text-slate-600 leading-relaxed">{webinar.description}</p>
              </section>
            )}

            {webinar.speakerBio && (
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">About the Speaker</h2>
                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 border border-slate-100">
                  <div className="h-12 w-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {webinar.speaker[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{webinar.speaker}</p>
                    <p className="mt-1 text-sm text-slate-600">{webinar.speakerBio}</p>
                  </div>
                </div>
              </section>
            )}

            {/* SRS FR-16 — attendees join through Zoom link, only if paid */}
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">How to Attend</h3>
              <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
                <li>Register and complete payment below</li>
                <li>You&apos;ll receive a payment confirmation email with your Zoom link</li>
                <li>A reminder email will be sent 24 hours and 1 hour before the webinar</li>
                <li>Click the Zoom link in your email to join on the day</li>
              </ol>
            </section>
          </div>

          {/* Registration Card */}
          <div>
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
              <div className="space-y-3 mb-6">
                {isLive && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-lg">📅</span>
                    <span>
                      {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {isLive && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-lg">🕐</span>
                    <span>
                      {date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      {webinar.durationMin ? ` · ${webinar.durationMin} min` : ""}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-lg">🎓</span>
                  <span>{webinar.category}</span>
                </div>
                {isLive && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">💺</span>
                    <span className={spotsLeft < 20 ? "text-red-600 font-medium" : "text-slate-600"}>
                      {spotsLeft > 0 ? `${spotsLeft} spots remaining` : "Fully booked"}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-5 mb-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-slate-500 text-sm">Price</span>
                  <span className="text-3xl font-bold text-slate-900">
                    {price === 0 ? "FREE" : `$${price}`}
                  </span>
                </div>
              </div>

              {cancelled && (
                <p className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
                  Payment was cancelled. You can try again below.
                </p>
              )}
              {error && (
                <p className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              {spotsLeft > 0 && (!isLive || isFuture) ? (
                <button
                  onClick={handleRegister}
                  disabled={paying}
                  className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-white hover:bg-blue-800 active:scale-[0.98] transition-all disabled:opacity-60"
                >
                  {paying
                    ? "Redirecting…"
                    : price === 0
                    ? "Register for Free"
                    : `Register · $${price}`}
                </button>
              ) : (
                <div className="w-full rounded-xl bg-slate-100 py-3.5 text-center text-sm font-semibold text-slate-400">
                  {!isFuture && isLive ? "This webinar has ended" : "Fully booked"}
                </div>
              )}

              {!user && (
                <p className="mt-3 text-center text-xs text-slate-400">
                  You&apos;ll need to{" "}
                  <Link href="/login" className="text-primary hover:underline">sign in</Link>{" "}
                  to register.
                </p>
              )}

              <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2">
                <span className="text-green-600 text-sm">🔒</span>
                <span className="text-xs text-green-700">Secure payment via Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
