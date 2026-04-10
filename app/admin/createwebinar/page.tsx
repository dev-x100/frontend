"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { adminApi } from "@/lib/api";
import { AdminShell } from "@/app/admin/dashboard/page";
import {
  WebinarForm,
  defaultWebinarFormValues,
  type WebinarFormValues,
} from "@/components/admin/WebinarForm";

export default function CreateWebinarPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user?.role !== "ADMIN") router.push("/dashboard");
  }, [user, loading, router]);

  async function handleSubmit(form: WebinarFormValues) {
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

        <WebinarForm
          initialValues={defaultWebinarFormValues}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/webinars")}
          submitLabel="Create Webinar"
          submitting={submitting}
          success={success}
          successMessage="Webinar created! Redirecting…"
          error={error}
        />
      </AdminShell>
    </div>
  );
}
