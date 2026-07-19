/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/signin",
        permanent: true,
      },
      {
        source: "/items/manage",
        destination: "/jobs/manage",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
