import Link from "next/link";

import { ProjectListItem } from "@/components/project-list-item";
import { getFeaturedProjects } from "@/lib/projects";
import { site, socials } from "@/lib/site";

export default async function HomePage() {
  const featured = await getFeaturedProjects();

  return (
    <>
      <section>
        <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
          {site.name}
        </h1>
        <p className="mt-2 text-muted">{site.tagline}</p>
        {site.intro && (
          <p className="mt-8 text-pretty text-lg leading-relaxed">{site.intro}</p>
        )}

        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                className="underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                {...(social.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {featured.length > 0 && (
        <section className="mt-20">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Selected work
          </h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {featured.map((project) => (
              <ProjectListItem key={project.slug} project={project} />
            ))}
          </ul>
          <p className="mt-6 text-sm">
            <Link
              href="/projects"
              className="text-muted underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              All projects →
            </Link>
          </p>
        </section>
      )}
    </>
  );
}
