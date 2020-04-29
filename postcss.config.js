module.exports = {
  plugins: [
    'postcss-preset-env',
    'postcss-nested',
    'postcss-flexbugs-fixes',
    [
      'autoprefixer',
      {
        flexbox: 'no-2009',
      },
    ],
  ],
};
