import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Pins the workspace root so `.next/standalone/server.js` lands at a fixed
  // path regardless of stray lockfiles elsewhere on the host filesystem
  // (Next.js otherwise infers the root from the nearest lockfile it finds
  // walking up the tree, which on this machine picks up ~/package-lock.json).
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

export default nextConfig;
