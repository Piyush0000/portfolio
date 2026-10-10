import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container grid min-h-[100svh] content-center gap-6 pt-[var(--nav-h)]">
      <p className="eyebrow text-cyan">Error 404</p>
      <h1 className="font-display text-display-xl font-bold">
        Lost in <span className="text-gradient">orbit.</span>
      </h1>
      <p className="max-w-lg text-lg text-muted">That page drifted out of range. Head back to base.</p>
      <Link href="/" className="btn-primary w-fit">
        Back home
      </Link>
    </main>
  );
}
