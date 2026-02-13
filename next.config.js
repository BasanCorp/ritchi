/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

// Enable i18n support
const withNextIntl = require('next-intl/plugin')('./i18n.ts')

module.exports = withNextIntl(nextConfig)
