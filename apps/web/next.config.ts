import type { NextConfig } from "next";

const urlDelBack = process.env.API_URL ?? "http://127.0.0.1:8787";

const cabecerasDeSeguridad = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  devIndicators: { position: "bottom-right" },
  partialPrefetching: true,
  transpilePackages: ["@pichangaflow/shared"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: cabecerasDeSeguridad }];
  },
  // En producción, las rutas de Workers envían /api al back. Esto solo aplica en local.
  async rewrites() {
    if (process.env.NODE_ENV !== "development") return [];
    return [{ source: "/api/:path*", destination: `${urlDelBack}/api/:path*` }];
  },
};

export default nextConfig;
