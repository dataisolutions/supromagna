import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Evita che Next inferisca una root sbagliata per la presenza di altri lockfile.
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
