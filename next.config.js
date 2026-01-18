/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["maath"],
  // Next.js 16 uses Turbopack by default for `next dev`.
  // Providing an (even empty) turbopack config avoids the "webpack config + no turbopack config" error.
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cataas.com",
        port: "",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
