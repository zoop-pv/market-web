/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    ENDPOINT_BASE_URL: process.env.ENDPOINT_BASE_URL,
    MAP_API_KEY: process.env.MAP_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
    ],
  },
}

module.exports = nextConfig;
