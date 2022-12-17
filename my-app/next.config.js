/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
  swcMinify: true,
  images: {
    domains: ["auth.etna-alternance.net"],
  },
};

module.exports = nextConfig;
