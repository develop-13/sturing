/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true", // ANALYZE 환경 변수가 'true'일 때만 활성화
});

const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    config.output.publicPath = "/_next/";

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub Avatars 호스트 추가
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary 호스트 추가
        port: "",
        pathname: "/**",
      },
    ],
  },
};

// BundleAnalyzer 적용
module.exports = withBundleAnalyzer(nextConfig);
