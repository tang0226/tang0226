import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import { z } from "zod";

import { mdxComponents } from "@/components/mdx-components";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

/**
 * Frontmatter contract for `content/projects/*.mdx`.
 * Parsed here and nowhere else, so a bad field fails the build with a
 * readable error instead of rendering a blank page.
 */
const frontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  year: z.number().int(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  repo: z.url().optional(),
  live: z.url().optional(),
  role: z.string().optional(),
});

export type ProjectMeta = z.infer<typeof frontmatterSchema> & { slug: string };

const prettyCodeOptions: PrettyCodeOptions = {
  // Two themes so highlighting follows the site theme; see `globals.css`.
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
};

async function readSlugs(): Promise<string[]> {
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

function parseMeta(slug: string, data: unknown): ProjectMeta {
  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid frontmatter in content/projects/${slug}.mdx:\n` +
        result.error.issues
          .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
          .join("\n"),
    );
  }
  return { ...result.data, slug };
}

/**
 * Frontmatter for every project, newest first. Does not compile MDX, so
 * listing pages stay cheap.
 */
export async function getAllProjects(): Promise<ProjectMeta[]> {
  const slugs = await readSlugs();
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const source = await fs.readFile(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
      return parseMeta(slug, matter(source).data);
    }),
  );
  return projects.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

export async function getFeaturedProjects(): Promise<ProjectMeta[]> {
  return (await getAllProjects()).filter((project) => project.featured);
}

export async function getProjectSlugs(): Promise<string[]> {
  return readSlugs();
}

/** Compiled MDX body plus validated frontmatter, or `null` for an unknown slug. */
export async function getProject(slug: string) {
  let source: string;
  try {
    source = await fs.readFile(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  } catch {
    return null;
  }

  const { content: raw, data } = matter(source);
  const meta = parseMeta(slug, data);

  const { content } = await compileMDX({
    source: raw,
    components: mdxComponents,
    options: {
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });

  return { meta, content };
}
