"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { adminApi, type AdminRegistration } from "@/lib/api";
import { AdminShell } from "@/app/admin/dashboard/page";

export default function AdminRegistrationsPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [registrations, setRegistrations] = useState<AdminRegistration[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user?.role !== "ADMIN") router.push("/dashboard");
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      adminApi
        .listRegistrations()
        .then(({ registrations }) => setRegistrations(registrations))
        .catch(() => {})
        .finally(() => setFetching(false));
    }
  }, [user]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminShell user={user} onLogout={logout}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Registrations</h1>
          <p className="mt-1 text-sm text-slate-400">
            Track webinar attendees, payment status, and registration activity.
          </p>
        </div>

        {fetching ? (
          <p className="text-slate-500">Loading…</p>
        ) : registrations.length === 0 ? (
          <p className="text-slate-500">No registrations found.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60">
                  {["Attendee", "Webinar", "Payment", "Amount", "Registered", "Event Date"].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {registrations.map((registration) => (
                  <tr
                    key={registration.id}
                    className="border-b border-slate-800 bg-slate-900 hover:bg-slate-800/60 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">{registration.user.name}</p>
                      <p className="text-xs text-slate-400">{registration.user.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">{registration.webinar.title}</p>
                      <p className="text-xs text-slate-400">#{registration.webinar.id.slice(0, 8)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${paymentStatusClass(
                          registration.paymentStatus ?? "PENDING"
                        )}`}
                      >
                        {registration.paymentStatus ?? "PENDING"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      ${Number(registration.amountPaid ?? 0).toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-slate-400 whitespace-nowrap">
                      {formatDate(registration.registeredAt)}
                    </td>
                    <td className="px-5 py-4 text-slate-400 whitespace-nowrap">
                      {formatDate(registration.webinar.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminShell>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function paymentStatusClass(status: "PENDING" | "PAID" | "FAILED" | "REFUNDED") {
  switch (status) {
    case "PAID":
      return "bg-emerald-500/20 text-emerald-400";
    case "FAILED":
      return "bg-red-500/20 text-red-400";
    case "REFUNDED":
      return "bg-slate-500/20 text-slate-300";
    default:
      return "bg-yellow-500/20 text-yellow-400";
  }
}