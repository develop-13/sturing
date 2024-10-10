/** @type {import('next').NextConfig} */
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
        protocol: "https", // 프로토콜 (http 또는 https)
        hostname: "via.placeholder.com", // 외부 이미지 호스트
        port: "", // 필요한 경우 포트를 추가할 수 있습니다
        pathname: "/**", // 이미지 경로, 모든 경로를 허용하려면 '**' 사용
      },
    ],
  },
};

export default nextConfig;
