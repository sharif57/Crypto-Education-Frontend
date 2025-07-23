import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "172.252.13.79",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
