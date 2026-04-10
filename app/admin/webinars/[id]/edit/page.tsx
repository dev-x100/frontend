"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { adminApi, type Webinar } from "@/lib/api";
import { AdminShell } from "@/app/admin/dashboard/page";
import {
  WebinarForm,
  defaultWebinarFormValues,
  type WebinarFormValues,
} from "@/components/admin/WebinarForm";

export default function EditWebinarPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const webinarId = params?.id;

  const [formValues, setFormValues] = useState<WebinarFormValues>(defaultWebinarFormValues);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user?.role !== "ADMIN") router.push("/dashboard");
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === "ADMIN" && webinarId) {
      adminApi
        .getWebinar(webinarId)
        .then(({ webinar }) => setFormValues(mapWebinarToForm(webinar)))
        .catch((err: unknown) => {
          setError(err instanceof Error ? err.message : "Failed to load webinar");
        })
        .finally(() => setFetching(false));
    }
  }, [user, webinarId]);

  async function handleSubmit(values: WebinarFormValues) {
    if (!webinarId) return;

    setError("");
    setSubmitting(true);

    try {
      await adminApi.updateWebinar(webinarId, {
        ...values,
        date: new Date(values.date).toISOString(),
      });
      setSuccess(true);
      setTimeout(() => router.push("/admin/webinars"), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update webinar");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminShell user={user} onLogout={logout}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Edit Webinar</h1>
          <p className="mt-1 text-sm text-slate-400">
            Update webinar details, publication status, pricing, and attendance settings.
          </p>
        </div>

        {fetching ? (
          <p className="text-slate-500">Loading webinar…</p>
        ) : (
          <WebinarForm
            initialValues={formValues}
            onSubmit={handleSubmit}
            onCancel={() => router.push("/admin/webinars")}
            submitLabel="Save Changes"
            submitting={submitting}
            success={success}
            successMessage="Webinar updated! Redirecting…"
            error={error}
          />
        )}
      </AdminShell>
    </div>
  );
}

function mapWebinarToForm(webinar: Webinar): WebinarFormValues {
  return {
    title: webinar.title,
    description: webinar.description ?? "",
    speaker: webinar.speaker,
    speakerBio: webinar.speakerBio ?? "",
    imageUrl: webinar.imageUrl ?? "",
    date: toDateTimeLocal(webinar.date),
    durationMin: webinar.durationMin ?? 60,
    category: webinar.category,
    type: webinar.type,
    price: Number(webinar.price ?? 0),
    seats: webinar.seats,
    isPublished: webinar.isPublished ?? true,
  };
}

function toDateTimeLocal(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const normalized = new Date(date.getTime() - offset * 60 * 1000);
  return normalized.toISOString().slice(0, 16);
}