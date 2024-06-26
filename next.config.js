/** @type {import('next').NextConfig} */
module.exports = {};

const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_FLOWABLE_API_HOSTNAME}/:path*`,
      },
    ];
  },
  swcMinify: true,
  output: "standalone",
};

module.exports = nextConfig;
