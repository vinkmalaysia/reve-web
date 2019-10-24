module.exports = (ctx) => ({
  plugins: [
    require('postcss-preset-env')(),
    require('postcss-nested')(),
    require('postcss-flexbugs-fixes')(),
    require('autoprefixer')({
      flexbox: 'no-2009',
    }),
  ],
});
