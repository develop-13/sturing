/** @type {import('next').NextConfig} */
// next.config.mjs
// import withBundleAnalyzer from "@next/bundle-analyzer";

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

export default nextConfig;

// BundleAnalyzer 적용
// export default withBundleAnalyzer(nextConfig);
