import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    // Workaround: Turbopack panics on non-ASCII chars in path identifiers
    // when the workspace root (detected via pnpm-lock.yaml in /home/bruno/)
    // causes absolute paths like "Área de trabalho" to be sliced as bytes.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
