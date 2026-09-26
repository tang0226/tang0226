"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { nav, site } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between gap-6 px-5">
        <Link
          href="/"
          className="font-display text-base font-medium tracking-tight transition-colors hover:text-accent"
        >
          {site.name}
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-2 py-1 text-sm transition-colors hover:text-foreground ${
                  active ? "text-foreground" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <span aria-hidden="true" className="mx-1 h-4 w-px bg-border" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
