import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import { MdxImage } from "@/components/mdx-image";

/**
 * Element overrides applied to every compiled project page.
 * Typography comes from the `prose` class; this handles behaviour
 * that plain HTML elements can't give us.
 */
export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    const external = /^https?:\/\//.test(href);
    const className =
      "underline decoration-border underline-offset-4 transition-colors hover:decoration-accent hover:text-accent";

    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={className} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  },

  // Markdown images render at their natural aspect ratio; see mdx-image.tsx.
  img: MdxImage as MDXComponents["img"],
};
