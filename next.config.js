/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Optimerer Supabase bundling
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@supabase/supabase-js': '@supabase/supabase-js/dist/umd/supabase.js',
      }
    }
    return config
  },
}

module.exports = withPWA(nextConfig)
