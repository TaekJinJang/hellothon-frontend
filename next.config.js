/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["scontent-ssn1-1.cdninstagram.com"],
  },
};

module.exports = nextConfig;
