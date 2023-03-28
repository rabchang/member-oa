/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    if (process.env.NODE_ENV === "production") {
      return []
    }
    return [
      {
        source: "/callback",
        destination: "http://127.0.0.1:12306/callback", // Proxy to Backend
      },
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:12306/api/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
