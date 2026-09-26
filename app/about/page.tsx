import type { Metadata } from "next";

import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}.`,
};

export default function AboutPage() {
  return (
    <article>
      <h1 className="font-display text-4xl font-medium tracking-tight">About</h1>

      {/* Replace this copy with your own. */}
      <div className="prose prose-neutral mt-10 max-w-none">
        {site.intro && <p className="lead">{site.intro}</p>}

        <p>
          I started out building small tools for people around me — a scheduling
          app for a research group, a dashboard for a friend&apos;s shop — and
          never really stopped. The through-line in my work is caring about the
          seam between the interface and the system underneath it, because
          that&apos;s usually where products get slow, confusing, or both.
        </p>

        <p>
          These days I work mostly in TypeScript and React, with enough backend
          and infrastructure to be dangerous. I care about performance budgets,
          accessible defaults, and codebases that a new engineer can navigate on
          their first day.
        </p>

        <h2>What I&apos;m working on</h2>

        <p>
          Currently focused on developer tooling and data-heavy interfaces —
          the kind where a table of 50,000 rows still has to feel instant. On
          the side I write about rendering performance and build small
          utilities that solve problems I keep running into.
        </p>

        <h2>Elsewhere</h2>

        <p>
          The fastest way to reach me is{" "}
          <a href={`mailto:${site.email}`}>email</a>. You can also find me on{" "}
          {socials
            .filter((social) => social.href.startsWith("http"))
            .map((social, index, list) => (
              <span key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
                {index < list.length - 1 ? " and " : "."}
              </span>
            ))}
        </p>
      </div>
    </article>
  );
}
