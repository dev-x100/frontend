"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { adminApi, type DashboardStats, type User, type Webinar } from "@/lib/api";

export default function AdminDashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [upcomingWebinars, setUpcomingWebinars] = useState<Webinar[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user?.role !== "ADMIN") router.push("/dashboard");
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      adminApi
        .dashboardStats()
        .then(({ stats, recentUsers, upcomingWebinars }) => {
          setStats(stats);
          setRecentUsers(recentUsers);
          setUpcomingWebinars(upcomingWebinars);
        })
        .catch(() => {})
        .finally(() => setFetching(false));
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminShell user={user} onLogout={logout}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Welcome back, {user.name}. Here&apos;s what&apos;s happening.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
          {[
            { label: "Total Users", value: stats?.totalUsers ?? "—", icon: "👥" },
            { label: "Total Webinars", value: stats?.totalWebinars ?? "—", icon: "🎓" },
            { label: "Total Registrations", value: stats?.totalRegistrations ?? "—", icon: "📋" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{s.label}</p>
                <span className="text-2xl">{s.icon}</span>
              </div>
              <p className="mt-3 text-4xl font-bold text-amber-400">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Upcoming webinars */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white">Upcoming Webinars</h2>
              <Link href="/admin/webinars" className="text-xs text-amber-400 hover:underline">
                View all →
              </Link>
            </div>
            {fetching ? (
              <p className="text-slate-500 text-sm">Loading…</p>
            ) : upcomingWebinars.length === 0 ? (
              <p className="text-slate-500 text-sm">No upcoming webinars.</p>
            ) : (
              <ul className="space-y-3">
                {upcomingWebinars.map((w) => (
                  <li key={w.id} className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{w.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {new Date(w.date).toLocaleDateString()} · {w.speaker}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-slate-400">
                      {(w._count?.registrations ?? 0)}/{w.seats}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent users */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white">Recent Users</h2>
              <Link href="/admin/users" className="text-xs text-amber-400 hover:underline">
                View all →
              </Link>
            </div>
            {fetching ? (
              <p className="text-slate-500 text-sm">Loading…</p>
            ) : recentUsers.length === 0 ? (
              <p className="text-slate-500 text-sm">No users yet.</p>
            ) : (
              <ul className="space-y-3">
                {recentUsers.map((u) => (
                  <li key={u.id} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-sm font-bold">
                      {u.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{u.name}</p>
                      <p className="text-xs text-slate-400 truncate">{u.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </AdminShell>
    </div>
  );
}

// ─── Shared Admin Shell ───────────────────────────────────────────────────────
export function AdminShell({
  user,
  onLogout,
  children,
}: {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
}) {
  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/admin/webinars", label: "Webinars", icon: "🎓" },
    { href: "/admin/createwebinar", label: "Create Webinar", icon: "➕" },
    { href: "/admin/users", label: "Users", icon: "👥" },
    { href: "/admin/contacts", label: "Messages", icon: "✉️" },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 flex-col border-r border-slate-800 bg-slate-900 lg:flex">
        <div className="px-6 py-6 border-b border-slate-800">
          <Link href="/" className="text-xl font-bold text-white">
            Tunu<span className="text-amber-400">Dada</span>
          </Link>
          <p className="mt-0.5 text-xs text-slate-500">Admin Panel</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <span>{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-800 px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-sm font-bold">
              {user.name[0]}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full rounded-lg bg-slate-800 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4 lg:hidden">
          <Link href="/" className="text-lg font-bold text-white">
            Tunu<span className="text-amber-400">Dada</span>
            <span className="ml-2 text-xs text-slate-500">Admin</span>
          </Link>
          <button
            onClick={onLogout}
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300"
          >
            Sign Out
          </button>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
