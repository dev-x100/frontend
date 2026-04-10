"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/lib/api";

export default function LoginPage() {
  const { login } = useAuth();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (tab === "login") {
        await login(email, password);
      } else {
        const { token, user } = await authApi.register(name, email, password);
        localStorage.setItem("td_token", token);
        window.location.href = user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard";
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold tracking-tight text-white">
              Tunu<span className="text-amber-400">Dada</span>
            </span>
          </Link>
          <p className="mt-2 text-sm text-slate-400">Professional Webinar Platform</p>
        </div>

        <div className="rounded-2xl bg-white/5 backdrop-blur ring-1 ring-white/10 shadow-2xl">
          {/* Tab switcher */}
          <div className="grid grid-cols-2 rounded-t-2xl overflow-hidden">
            <button
              onClick={() => { setTab("login"); setError(""); }}
              className={`py-3.5 text-sm font-semibold transition-colors ${
                tab === "login"
                  ? "bg-amber-400 text-slate-900"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab("register"); setError(""); }}
              className={`py-3.5 text-sm font-semibold transition-colors ${
                tab === "register"
                  ? "bg-amber-400 text-slate-900"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-8">
            {tab === "register" && (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Jane Doe"
                  className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@company.com"
                className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={tab === "register" ? "Min 8 chars, 1 uppercase, 1 number" : "••••••••"}
                className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/15 px-4 py-2.5 text-sm text-red-400 ring-1 ring-red-500/30">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-amber-400 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-300 active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {loading ? "Please wait…" : tab === "login" ? "Sign In" : "Create Account"}
            </button>

            {tab === "login" && (
              <p className="text-center text-xs text-slate-500">
                <Link href="#" className="text-amber-400 hover:underline">Forgot password?</Link>
              </p>
            )}
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          Admin access?{" "}
          <span className="text-slate-400">Sign in with your admin credentials above.</span>
        </p>
      </div>
    </div>
  );
}
