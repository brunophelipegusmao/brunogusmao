import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bmcorelayer.vercel.app",
      },
    ],
  },
  // Permite acessar recursos de desenvolvimento (_next/webpack-hmr) via IP local.
  // Necessário para evitar bloqueio de hidratação quando abrir o app fora de localhost.
  allowedDevOrigins: ["192.168.18.10"],
  turbopack: {
    // Workaround: Turbopack panics on non-ASCII chars in path identifiers
    // when the workspace root (detected via pnpm-lock.yaml in /home/bruno/)
    // causes absolute paths like "Área de trabalho" to be sliced as bytes.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
