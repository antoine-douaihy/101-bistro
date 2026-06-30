// Placeholder login screen — auth UI is built separately. Exists so the
// route is a valid module and the project builds.
export default function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center p-8">
      <div className="w-full max-w-sm text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          101 Bistro
        </p>
        <h1 className="mt-2 text-2xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm text-zinc-500">Login UI coming soon.</p>
      </div>
    </main>
  );
}
