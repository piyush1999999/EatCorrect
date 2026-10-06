/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export so Capacitor can bundle the app into native binaries.
  output: "export",
  images: {
    // Capacitor/static-export compatible; remote demo images from Unsplash.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
