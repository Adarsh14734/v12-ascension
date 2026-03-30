import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/v12-ascension',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
