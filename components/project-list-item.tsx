import Link from "next/link";

import type { ProjectMeta } from "@/lib/projects";

export function ProjectListItem({
  project,
  // The projects index groups by year already, so it hides the per-item year.
  showYear = true,
}: {
  project: ProjectMeta;
  showYear?: boolean;
}) {
  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className="group -mx-3 block rounded-lg px-3 py-4 transition-colors hover:bg-surface"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          {showYear && (
            <span className="shrink-0 font-mono text-xs text-muted tabular-nums">
              {project.year}
            </span>
          )}
        </div>

        <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        {project.tags.length > 0 && (
          <p className="mt-2.5 font-mono text-xs text-muted">
            {project.tags.join(" · ")}
          </p>
        )}
      </Link>
    </li>
  );
}
