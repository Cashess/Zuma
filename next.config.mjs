// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'app')
    return config
  },
}

module.exports = nextConfig
