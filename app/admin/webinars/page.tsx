"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { adminApi, type Webinar } from "@/lib/api";
import { AdminShell } from "@/app/admin/dashboard/page";

export default function AdminWebinarsPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [fetching, setFetching] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user?.role !== "ADMIN") router.push("/dashboard");
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      adminApi
        .listWebinars()
        .then(({ webinars }) => setWebinars(webinars))
        .catch(() => {})
        .finally(() => setFetching(false));
    }
  }, [user]);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await adminApi.deleteWebinar(id);
      setWebinars((prev) => prev.filter((w) => w.id !== id));
    } catch {
      alert("Failed to delete webinar.");
    } finally {
      setDeleting(null);
    }
  }

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminShell user={user} onLogout={logout}>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Webinars</h1>
            <p className="mt-1 text-sm text-slate-400">Manage all webinars on the platform.</p>
          </div>
          <Link
            href="/admin/createwebinar"
            className="rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-300 transition-colors"
          >
            + Create Webinar
          </Link>
        </div>

        {fetching ? (
          <p className="text-slate-500">Loading…</p>
        ) : webinars.length === 0 ? (
          <p className="text-slate-500">No webinars yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60">
                  {["Title", "Speaker", "Category", "Type", "Date", "Price", "Seats", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {webinars.map((w) => (
                  <tr
                    key={w.id}
                    className="border-b border-slate-800 bg-slate-900 hover:bg-slate-800/60 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-white max-w-xs">
                      <span className="line-clamp-2">{w.title}</span>
                      {!w.isPublished && (
                        <span className="ml-2 inline-block rounded-full bg-yellow-400/20 px-2 py-0.5 text-xs text-yellow-400">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-300">{w.speaker}</td>
                    <td className="px-5 py-4 text-slate-400">{w.category}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                          w.type === "LIVE"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-purple-500/20 text-purple-400"
                        }`}
                      >
                        {w.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 whitespace-nowrap">
                      {new Date(w.date).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      ${Number(w.price).toFixed(0)}
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {(w._count?.registrations ?? 0)}/{w.seats}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/webinars/${w.id}/edit`}
                          className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(w.id, w.title)}
                          disabled={deleting === w.id}
                          className="rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50"
                        >
                          {deleting === w.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
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
