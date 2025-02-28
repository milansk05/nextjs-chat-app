/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["jsonwebtoken"], // ✅ Zorgt ervoor dat JWT in Node.js middleware werkt
}

module.exports = nextConfig;