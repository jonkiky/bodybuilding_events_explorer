const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  assetPrefix: './',
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  experimental: {
    webpackBuildWorker: true,
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'node_modules/leaflet/dist/images',
            to: path.resolve(__dirname, 'public', 'leaflet', 'images')
          },
        ],
      }),
    )
    return config
  }
}

module.exports = nextConfig;