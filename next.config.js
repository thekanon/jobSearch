/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
module.exports = {
  webpack: (config, { defaultLoaders }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "/@/": path.resolve(__dirname, "./src"),
      "/@/components/": path.resolve(__dirname, "./src/components"),
      "/@/pages/": path.resolve(__dirname, "./src/pages"),
      "/@/types/": path.resolve(__dirname, "./src/types"),
      "/@/styles/": path.resolve(__dirname, "./src/styles"),
      "/@/lib/": path.resolve(__dirname, "./src/lib"),
      "/@/store/": path.resolve(__dirname, "./src/store"),
      "/@/hooks/": path.resolve(__dirname, "./src/hooks"),
    };
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
