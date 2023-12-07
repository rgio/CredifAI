/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function (config, options) {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    config.experiments = { asyncWebAssembly: true, layers: true };
    return config;
  }
};

module.exports = nextConfig;
