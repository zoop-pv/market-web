/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NODE_ENV: process.env.NODE_ENV,
    ENDPOINT_BASE_URL: process.env.ENDPOINT_BASE_URL,
  }
}

module.exports = nextConfig
