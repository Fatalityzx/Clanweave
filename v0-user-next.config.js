/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress the punycode deprecation warning
  webpack: (config, { isServer }) => {
    config.ignoreWarnings = [{ module: /node_modules\/punycode/ }]
    return config
  },
}

module.exports = nextConfig

