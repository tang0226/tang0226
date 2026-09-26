import fs from "node:fs/promises";
import path from "node:path";

import Image from "next/image";

/**
 * Renders a markdown image (`![alt](/projects/shot.png)`) at its natural
 * aspect ratio.
 *
 * Markdown gives us no dimensions, and `next/image` needs them or it
 * stretches the image to fit its container. So we read them off the file at
 * build time with sharp — already present as one of Next's own optional
 * dependencies, since the image optimizer uses it.
 */
export async function MdxImage({ src, alt }: { src?: string; alt?: string }) {
  if (typeof src !== "string" || src.length === 0) return null;

  // Remote images would need `images.remotePatterns` configured; until then,
  // pass them through untouched rather than failing the build.
  if (/^https?:\/\//.test(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt ?? ""} className={FRAME} />;
  }

  const size = await intrinsicSize(src);

  if (!size) {
    // Unreadable file: let next/image fetch it and keep the aspect ratio
    // rather than guessing dimensions.
    return (
      <span className="relative my-8 block aspect-16/9 overflow-hidden rounded-lg border border-border bg-surface">
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          className="object-contain"
          sizes={SIZES}
        />
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={size.width}
      height={size.height}
      sizes={SIZES}
      className={FRAME}
    />
  );
}

const FRAME =
  "my-8 h-auto w-full rounded-lg border border-border bg-surface";

// The prose column is 42rem wide; below that the image is full-bleed.
const SIZES = "(max-width: 42rem) 100vw, 42rem";

async function intrinsicSize(src: string) {
  try {
    // `src` is a public-folder path ("/projects/shot.png"). Resolve it and
    // confirm it stays inside public/ before touching the filesystem.
    const publicDir = path.join(process.cwd(), "public");
    const file = path.join(publicDir, src);
    if (path.relative(publicDir, file).startsWith("..")) return null;

    await fs.access(file);

    const { default: sharp } = await import("sharp");
    const { width, height } = await sharp(file).metadata();

    return width && height ? { width, height } : null;
  } catch {
    return null;
  }
}
