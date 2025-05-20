import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /tag/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /tag/] },
        use: ["@svgr/webpack"],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
