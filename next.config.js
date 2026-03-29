/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    }
    
    // Configuración para SQL.js
    if (isServer) {
      config.externals.push('sql.js')
    }
    
    return config
  },
}

module.exports = nextConfig
