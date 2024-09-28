import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "media.graphassets.com",
      },
    ],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

const withPWA = nextPWA({
  dest: "public",
  mode: "production",
  disable: process.env.NODE_ENV === "development",
});

export default withPWA(nextConfig);
