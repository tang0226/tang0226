import type { Metadata } from "next";

import { ProjectListItem } from "@/components/project-list-item";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I have designed, built, and shipped.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  // `getAllProjects` is already sorted newest first, so grouping in order
  // yields year headings in descending order too.
  const byYear = new Map<number, typeof projects>();
  for (const project of projects) {
    const group = byYear.get(project.year) ?? [];
    group.push(project);
    byYear.set(project.year, group);
  }

  return (
    <>
      <header>
        <h1 className="font-display text-4xl font-medium tracking-tight">Projects</h1>
        <p className="mt-3 text-pretty text-muted">
          Things I have designed, built, and shipped.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="mt-12 text-muted">
          No projects yet — add an <code className="font-mono">.mdx</code> file to{" "}
          <code className="font-mono">content/projects/</code>.
        </p>
      ) : (
        <div className="mt-12 space-y-12">
          {[...byYear].map(([year, group]) => (
            <section key={year}>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
                {year}
              </h2>
              <ul className="mt-3 divide-y divide-border border-y border-border">
                {group.map((project) => (
                  <ProjectListItem
                    key={project.slug}
                    project={project}
                    showYear={false}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
