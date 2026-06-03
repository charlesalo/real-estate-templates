/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mapbox-gl'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        // SimplyRETS listing photos
        protocol: 'https',
        hostname: 'cdn.simplyrets.com',
      },
      {
        // Common MLS photo CDNs
        protocol: 'https',
        hostname: '**.mlsmatrix.com',
      },
      {
        // SimplyRETS demo photo CDNs (CloudFront + S3)
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
}

export default nextConfig;
