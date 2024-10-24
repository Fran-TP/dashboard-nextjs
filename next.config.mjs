/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**/*.{jpg,jpeg,png,gif,webp}'
      }
    ]
  }
}

export default nextConfig
