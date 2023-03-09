const isProd = process.env.NODE_ENV === 'production';
const assetPath = isProd ? (process.env.CDN_HOST || '') : '';

module.exports = {
  poweredByHeader: false,
  compress: false, // Let express handle compression
  assetPrefix: assetPath,
  webpack: (config, { dev }) => {
    // CDN prefix
    config.output.publicPath = `${assetPath}${config.output.publicPath}`;

    // SVG loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
