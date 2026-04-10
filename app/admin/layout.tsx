export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Each admin page renders its own AdminShell (sidebar + header).
  // This layout just passes children through so there is no duplicate sidebar.
  return <>{children}</>;
}
