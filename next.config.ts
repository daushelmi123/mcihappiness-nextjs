import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost', '127.0.0.1', '*.trycloudflare.com', '192.168.1.120'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pic.mcihappiness.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
