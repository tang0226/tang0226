import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // sharp is a native module; keep it out of the bundle so the build-time
  // image measuring in components/mdx-image.tsx can require it directly.
  serverExternalPackages: ["sharp"],
};

export default nextConfig;
