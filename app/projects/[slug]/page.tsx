import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProject, getProjectSlugs } from "@/lib/projects";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProject(slug);

  if (!project) return {};

  return {
    title: project.meta.title,
    description: project.meta.summary,
    openGraph: {
      title: project.meta.title,
      description: project.meta.summary,
      type: "article",
      url: `/projects/${slug}`,
    },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = await getProject(slug);

  if (!project) notFound();

  const { meta, content } = project;
  const links: { href: string; label: string }[] = [];
  if (meta.live) links.push({ href: meta.live, label: "Live site" });
  if (meta.repo) links.push({ href: meta.repo, label: "Source" });

  return (
    <article>
      <Link
        href="/projects"
        className="font-mono text-xs text-muted transition-colors hover:text-accent"
      >
        ← Projects
      </Link>

      <header className="mt-6 border-b border-border pb-8">
        <h1 className="font-display text-4xl font-medium tracking-tight text-pretty">
          {meta.title}
        </h1>
        <p className="mt-3 text-pretty text-lg leading-relaxed text-muted">
          {meta.summary}
        </p>

        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs">
          <div>
            <dt className="text-muted">Year</dt>
            <dd className="mt-1 tabular-nums">{meta.year}</dd>
          </div>

          {meta.role && (
            <div>
              <dt className="text-muted">Role</dt>
              <dd className="mt-1">{meta.role}</dd>
            </div>
          )}

          {meta.tags.length > 0 && (
            <div>
              <dt className="text-muted">Built with</dt>
              <dd className="mt-1">{meta.tags.join(" · ")}</dd>
            </div>
          )}
        </dl>

        {links.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="prose prose-neutral mt-10 max-w-none">{content}</div>
    </article>
  );
}
