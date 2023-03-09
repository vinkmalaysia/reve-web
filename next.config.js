const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  compiler: {
    styledComponents: true,
  },
  poweredByHeader: false,
  compress: false, // Let express handle compression
  webpack: (config, { dev }) => {
    // SVG loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
