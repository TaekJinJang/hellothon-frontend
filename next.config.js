/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent-ssn1-1.cdninstagram.com",
      },
    ],
  },
};

module.exports = nextConfig;
