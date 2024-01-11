/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "flagcdn.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
