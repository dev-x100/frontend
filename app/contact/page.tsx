"use client";
import { useState, FormEvent } from "react";
import PageHeader from "@/components/site/PageHeader";
import { contactApi } from "@/lib/api";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await contactApi.submit({ name, email, company: company || undefined, message });
      setSuccess(true);
      setName(""); setEmail(""); setCompany(""); setMessage("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none ring-cyan-500 focus:ring";

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

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-slate-900">Send a Message</h2>

          {success && (
            <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700 ring-1 ring-green-200">
              ✓ Message sent! We will get back to you within one business day.
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 ring-1 ring-red-200">
              {error}
            </div>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              className={inputClass}
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className={inputClass}
              placeholder="Work email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={`${inputClass} md:col-span-2`}
              placeholder="Company (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <textarea
              className={`${inputClass} min-h-32 md:col-span-2`}
              placeholder="How can we help?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-900 disabled:opacity-60"
          >
            {loading ? "Sending…" : "Submit Inquiry"}
          </button>
        </form>
      </section>
    </main>
  );
}
