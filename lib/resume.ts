/**
 * Resume content. Replace the placeholder entries below with your own.
 * `end: null` renders as "Present".
 */

export type Role = {
  company: string;
  title: string;
  location?: string;
  start: string;
  end: string | null;
  highlights: string[];
};

export type Education = {
  institution: string;
  credential: string;
  start: string;
  end: string;
  detail?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const summary =
  "BSCS student at Western Governors University";

export const experience: Role[] = [
  {
    company: "Awe & Reverence",
    title: "Software Intern",
    location: "Remote",
    start: "2021",
    end: "2022",
    highlights: [
      "Designed and developed a company frontpage using HTML and CSS",
      "Used RegEx to implement text-based style encodings for a Bible search web app",
      "Implemented a tag filtering system for blog posts in a NextJS app",
      "Learned the basics of Linux, Git, React, NextJS, and Django",
      "Practiced effective web research when approaching programming tasks, debugging, and learning new tools",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "Western Governors University",
    credential: "BS Computer Science",
    start: "2026",
    end: "2026",
    detail: "Projected to finish the second half of my bachelor's program by November, after 6 months of enrollment",
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["JS", "Python", "HTML", "CSS", "Java", "C++"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js"],
  },
  {
    label: "Development tools",
    items: ["Git", "Linux", "VS Code", "IntelliJ IDEA"],
  },
];
