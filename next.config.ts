import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // We need to disable Turbopack for now due to issues with .mjs modules
  experimental: {
    // turbo: {
    //   rules: {
    //     '*.mjs': {
    //       loaders: ['js'],
    //     },
    //   },
    // },
  },
  // Configure webpack to handle .mjs files and exclude server-only modules
  webpack: (config, { isServer }) => {
    // Make sure to handle .mjs files properly
    config.module.rules.push({
      test: /\.m?js$/,
      include: /node_modules/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    // Exclude 'canvas' module on client side since we don't need it
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        canvas: false,
      };
    }

    // Ignore specific modules in the browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      canvas: false,
    };

    return config;
  },
};

export default nextConfig;
