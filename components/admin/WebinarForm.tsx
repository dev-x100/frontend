"use client";

import { useEffect, useState, type FormEvent } from "react";

export const WEBINAR_CATEGORIES = [
  "HR & Benefits",
  "HR & Employee Relations",
  "Regulatory & Legal",
  "Operations & Leadership",
  "Finance & Accounting",
  "Healthcare & Safety",
];

export interface WebinarFormValues {
  title: string;
  description: string;
  speaker: string;
  speakerBio: string;
  imageUrl: string;
  date: string;
  durationMin: number;
  category: string;
  type: "LIVE" | "RECORDED";
  price: number;
  seats: number;
  isPublished: boolean;
}

interface WebinarFormProps {
  initialValues: WebinarFormValues;
  onSubmit: (values: WebinarFormValues) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  submitting: boolean;
  success: boolean;
  successMessage: string;
  error: string;
}

export const defaultWebinarFormValues: WebinarFormValues = {
  title: "",
  description: "",
  speaker: "",
  speakerBio: "",
  imageUrl: "",
  date: "",
  durationMin: 60,
  category: WEBINAR_CATEGORIES[0],
  type: "LIVE",
  price: 0,
  seats: 100,
  isPublished: true,
};

export function WebinarForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  submitting,
  success,
  successMessage,
  error,
}: WebinarFormProps) {
  const [form, setForm] = useState<WebinarFormValues>(initialValues);

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

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
    await onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 p-8 space-y-6"
    >
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Date & Time *">
          <input
            title="Date and time"
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
            title="Duration in minutes"
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Category *">
          <select title="Category" name="category" value={form.category} onChange={handleChange} className={inputClass}>
            {WEBINAR_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Type *">
          <select title="Webinar type" name="type" value={form.type} onChange={handleChange} className={inputClass}>
            <option value="LIVE">Live Webinar</option>
            <option value="RECORDED">Recorded / On-Demand</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Price (USD)">
          <input
            title="Price in US dollars"
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
            title="Seats available"
            name="seats"
            value={form.seats}
            onChange={handleChange}
            type="number"
            min={1}
            className={inputClass}
          />
        </Field>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          title="Publish immediately"
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
          {successMessage}
        </p>
      )}

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={submitting || success}
          className="rounded-lg bg-amber-400 px-8 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-300 active:scale-[0.98] transition-all disabled:opacity-60"
        >
          {submitting ? `${submitLabel}…` : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg bg-slate-800 px-6 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
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