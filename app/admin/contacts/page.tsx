"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { adminApi, type Contact } from "@/lib/api";
import { AdminShell } from "@/app/admin/dashboard/page";

export default function AdminContactsPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [fetching, setFetching] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user?.role !== "ADMIN") router.push("/dashboard");
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      adminApi
        .listContacts()
        .then(({ contacts }) => setContacts(contacts))
        .catch(() => {})
        .finally(() => setFetching(false));
    }
  }, [user]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminShell user={user} onLogout={logout}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="mt-1 text-sm text-slate-400">
            Inbound contact form submissions ({contacts.length} total)
          </p>
        </div>

        {fetching ? (
          <p className="text-slate-500">Loading…</p>
        ) : contacts.length === 0 ? (
          <p className="text-slate-500">No messages yet.</p>
        ) : (
          <div className="space-y-3">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-800/40 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-9 w-9 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                      {c.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-white">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.email}{c.company ? ` · ${c.company}` : ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {new Date(c.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-slate-400">{expanded === c.id ? "▲" : "▼"}</span>
                  </div>
                </button>

                {expanded === c.id && (
                  <div className="px-6 pb-5 border-t border-slate-800 pt-4">
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {c.message}
                    </p>
                    <a
                      href={`mailto:${c.email}`}
                      className="mt-4 inline-block rounded-lg bg-amber-400 px-5 py-2 text-xs font-semibold text-slate-900 hover:bg-amber-300 transition-colors"
                    >
                      Reply via Email
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </AdminShell>
    </div>
  );
}
