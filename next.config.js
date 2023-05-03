/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  alias: {
    '/@/': path.resolve(__dirname, './src'),
    '/@components/': path.resolve(__dirname, './src/components'),
    '/@pages/': path.resolve(__dirname, './src/pages'),
    '/@types/': path.resolve(__dirname, './src/types'),
    '/@styles/': path.resolve(__dirname, './src/styles'),
    '/@lib/': path.resolve(__dirname, './src/lib'),
  },
}

module.exports = nextConfig
