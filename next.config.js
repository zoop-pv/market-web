/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ENDPOINT_BASE_URL: process.env.ENDPOINT_BASE_URL,
  }
}

module.exports = nextConfig
