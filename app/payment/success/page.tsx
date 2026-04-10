"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { paymentApi, type Registration, type Webinar } from "@/lib/api";

type SuccessRegistration = Registration & { webinar: Webinar };

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-slate-500">Confirming your payment…</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [registration, setRegistration] = useState<SuccessRegistration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID provided.");
      setLoading(false);
      return;
    }
    paymentApi
      .verifySession(sessionId)
      .then(({ registration }) => setRegistration(registration as SuccessRegistration))
      .catch(() => setError("Could not verify payment. Please check your email or contact support."))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-slate-500">Confirming your payment…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Payment Verification Issue</h1>
          <p className="text-slate-600 text-sm mb-6">{error}</p>
          <Link href="/dashboard" className="inline-block rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const webinar = registration?.webinar;
  const date = webinar ? new Date(webinar.date) : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-slate-50 px-6 py-16">
      <div className="w-full max-w-lg text-center">
        {/* Success icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-slate-900">Payment Confirmed!</h1>
        <p className="mt-3 text-slate-500">
          Your registration is confirmed. Check your email for the Zoom meeting link.
        </p>

        {webinar && (
          <div className="mt-8 rounded-2xl border border-green-200 bg-white p-6 text-left shadow-sm">
            <h2 className="font-semibold text-slate-900 text-lg line-clamp-2">{webinar.title}</h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Speaker</span>
                <span className="font-medium text-slate-800">{webinar.speaker}</span>
              </div>
              {date && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Date</span>
                  <span className="font-medium text-slate-800">
                    {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              )}
              {registration?.amountPaid !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Amount Paid</span>
                  <span className="font-bold text-green-700">${Number(registration.amountPaid).toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* FR-16 — show Zoom join link when paid */}
            {webinar.zoomJoinUrl && (
              <a
                href={webinar.zoomJoinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block w-full rounded-xl bg-[#2D8CFF] py-3 text-center text-sm font-bold text-white hover:bg-blue-600 transition-colors"
              >
                🎥 Join Zoom Webinar
              </a>
            )}
          </div>
        )}

        <div className="mt-6 flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/webinars"
            className="rounded-xl bg-slate-100 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Browse More
          </Link>
        </div>
      </div>
    </div>
  );
}
