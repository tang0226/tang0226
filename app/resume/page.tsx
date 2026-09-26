import type { Metadata } from "next";

import { education, experience, skills, summary } from "@/lib/resume";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Experience, education, and skills for ${site.name}.`,
};

export default function ResumePage() {
  return (
    <article>
      <header className="flex flex-wrap items-start justify-between gap-6 border-b border-border pb-8">
        <div>
          <h1 className="font-display text-4xl font-medium tracking-tight">Resume</h1>
          <p className="mt-3 max-w-prose text-pretty leading-relaxed text-muted">
            {summary}
          </p>
        </div>

        <a
          href="/resume.pdf"
          download
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border px-3 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          </svg>
          Download PDF
        </a>
      </header>

      <Section title="Experience">
        <ol className="space-y-10">
          {experience.map((role) => (
            <li key={`${role.company}-${role.start}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-medium tracking-tight">
                  {role.title}
                </h3>
                <span className="font-mono text-xs text-muted tabular-nums">
                  {role.start} — {role.end ?? "Present"}
                </span>
              </div>

              <p className="mt-1 text-sm text-muted">
                {role.company}
                {role.location ? ` · ${role.location}` : ""}
              </p>

              <ul className="mt-3 space-y-2">
                {role.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="relative pl-5 text-pretty text-sm leading-relaxed before:absolute before:left-0 before:top-2.5 before:size-1 before:rounded-full before:bg-border"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Education">
        <ol className="space-y-6">
          {education.map((entry) => (
            <li key={entry.institution}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-medium tracking-tight">
                  {entry.credential}
                </h3>
                <span className="font-mono text-xs text-muted tabular-nums">
                  {entry.start} — {entry.end}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">{entry.institution}</p>
              {entry.detail && (
                <p className="mt-2 text-pretty text-sm leading-relaxed">
                  {entry.detail}
                </p>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Skills">
        <dl className="space-y-4">
          {skills.map((group) => (
            <div key={group.label} className="sm:flex sm:gap-6">
              <dt className="font-mono text-xs text-muted sm:w-28 sm:shrink-0 sm:pt-0.5">
                {group.label}
              </dt>
              <dd className="mt-1 text-sm sm:mt-0">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Contact">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
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
      </Section>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
