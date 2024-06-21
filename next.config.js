/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
};
