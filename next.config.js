/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
            pathname: '/**', // Use the regex pattern for all paths in the specified domain
          },
          {
            protocol: 'https',
            hostname: 'storage.googleapis.com',
            port: '',
            pathname: '/**', // Use the regex pattern for all paths in the specified domain
          },
        ],
      },
      experimental: {
        serverActions: {
          bodySizeLimit: '10mb',
        },
      },
}

module.exports = nextConfig
