// Placeholder admin layout — the admin dashboard is built separately.
// Exists so the route is a valid module and the project builds.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-dvh">{children}</section>;
}
