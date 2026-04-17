/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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
    ],
  },
}

export default nextConfig;
