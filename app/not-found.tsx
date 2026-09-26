import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-3 text-muted">
        The link may be out of date, or the page may have moved.
      </p>
      <p className="mt-8 text-sm">
        <Link
          href="/"
          className="underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          ← Back home
        </Link>
      </p>
    </section>
  );
}
