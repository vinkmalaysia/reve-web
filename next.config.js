const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: false, // Let express handle compression
  webpack: (config, { dev }) => {
    // SVG loader
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
