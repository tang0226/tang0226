/**
 * Every piece of "who this site belongs to" lives here.
 * Editing this file re-brands the whole site.
 */
export const site = {
  name: "Toby Ang",
  // Shown under your name on the home page.
  tagline: "BSCS Student at Western Governors University",
  // One or two sentences. Keep it short — the about page is for the long version.
  intro:
    "",
  email: "tobya0226@gmail.com",
  // The canonical URL, used for metadata. Update after your first deploy.
  url: "https://example.com",
} as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
] as const;

export const socials = [
  { href: "https://github.com/tang0226", label: "GitHub" },
  // Needs the protocol — without it the browser treats this as a relative path.
  { href: "https://www.linkedin.com/in/toby-ang-074a4b405", label: "LinkedIn" },
  { href: `mailto:${site.email}`, label: "Email" },
] as const;
