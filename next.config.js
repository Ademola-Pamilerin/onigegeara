/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"]
  }
}


const withBundleAnalyser = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === true
})
module.exports = withBundleAnalyser(nextConfig)
