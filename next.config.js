const isProd = process.env.NODE_ENV === 'production';
const assetPath = isProd ? (process.env.CDN_HOST || '') : '';

module.exports = {
  poweredByHeader: false,
  compress: false, // Let express handle compression
  assetPrefix: assetPath,
  target: 'server',
  webpack: (config, { dev }) => {
    config.output.publicPath = `${assetPath}${config.output.publicPath}`;

    return config;
  },
};
