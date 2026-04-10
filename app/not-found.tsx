import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <p className="text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Page Not Found</h1>
      <p className="mt-2 text-slate-500 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/webinars"
          className="rounded-lg bg-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-300 transition-colors"
        >
          Browse Webinars
        </Link>
      </div>
    </main>
  );
}
