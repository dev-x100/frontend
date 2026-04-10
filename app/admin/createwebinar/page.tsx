"use client";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { adminApi } from "@/lib/api";
import { AdminShell } from "@/app/admin/dashboard/page";

const CATEGORIES = [
  "HR & Benefits",
  "HR & Employee Relations",
  "Regulatory & Legal",
  "Operations & Leadership",
  "Finance & Accounting",
  "Healthcare & Safety",
];

export default function CreateWebinarPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    speaker: "",
    speakerBio: "",
    imageUrl: "",
    date: "",
    durationMin: 60,
    category: CATEGORIES[0],
    type: "LIVE" as "LIVE" | "RECORDED",
    price: 0,
    seats: 100,
    isPublished: true,
  });

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user?.role !== "ADMIN") router.push("/dashboard");
  }, [user, loading, router]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await adminApi.createWebinar({
        ...form,
        date: new Date(form.date).toISOString(),
      });
      setSuccess(true);
      setTimeout(() => router.push("/admin/webinars"), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create webinar");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminShell user={user} onLogout={logout}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Create Webinar</h1>
          <p className="mt-1 text-sm text-slate-400">
            Fill in the details to publish a new webinar.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-6"
        >
          {/* Title */}
          <Field label="Title *">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Mastering FMLA Compliance in 2026"
              className={inputClass}
            />
          </Field>

          {/* Description */}
          <Field label="Description">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="What will attendees learn?"
              className={inputClass}
            />
          </Field>

          {/* Speaker */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Speaker Name *">
              <input
                name="speaker"
                value={form.speaker}
                onChange={handleChange}
                required
                placeholder="Jane Smith"
                className={inputClass}
              />
            </Field>
            <Field label="Speaker Bio">
              <input
                name="speakerBio"
                value={form.speakerBio}
                onChange={handleChange}
                placeholder="Short bio"
                className={inputClass}
              />
            </Field>
          </div>

          {/* Image URL */}
          <Field label="Speaker/Webinar Image URL">
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              type="url"
              placeholder="https://example.com/image.jpg"
              className={inputClass}
            />
          </Field>

          {/* Date & Duration */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Date & Time *">
              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                type="datetime-local"
                className={inputClass}
              />
            </Field>
            <Field label="Duration (minutes)">
              <input
                name="durationMin"
                value={form.durationMin}
                onChange={handleChange}
                type="number"
                min={15}
                max={480}
                className={inputClass}
              />
            </Field>
          </div>

          {/* Category, Type */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Category *">
              <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Type *">
              <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
                <option value="LIVE">Live Webinar</option>
                <option value="RECORDED">Recorded / On-Demand</option>
              </select>
            </Field>
          </div>

          {/* Price & Seats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Price (USD)">
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
                min={0}
                step={1}
                className={inputClass}
              />
            </Field>
            <Field label="Seats Available">
              <input
                name="seats"
                value={form.seats}
                onChange={handleChange}
                type="number"
                min={1}
                className={inputClass}
              />
            </Field>
          </div>

          {/* Publish toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isPublished"
              checked={form.isPublished}
              onChange={handleChange}
              className="h-4 w-4 accent-amber-400 rounded"
            />
            <span className="text-sm text-slate-300">Publish immediately</span>
          </label>

          {error && (
            <p className="rounded-lg bg-red-500/15 px-4 py-2.5 text-sm text-red-400 ring-1 ring-red-500/30">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-lg bg-green-500/15 px-4 py-2.5 text-sm text-green-400 ring-1 ring-green-500/30">
              Webinar created! Redirecting…
            </p>
          )}

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={submitting || success}
              className="rounded-lg bg-amber-400 px-8 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-300 active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {submitting ? "Creating…" : "Create Webinar"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/webinars")}
              className="rounded-lg bg-slate-800 px-6 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </AdminShell>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
