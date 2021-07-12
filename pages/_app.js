import React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { withRouter } from 'next/router';
import { wrapper } from 'src/store';

import theme from 'src/theme.js';

// Global Styles
const NormalizeCSS = createGlobalStyle` ${require('!!raw-loader!@csstools/normalize.css').default} `;
const AppGlobalCSS = createGlobalStyle` ${require('!!raw-loader!../src/stylesheets/global.css').default} `;

const MyApp = ({ Component, pageProps, router }) => {
  return (
    <ThemeProvider theme={theme}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
      />
      <NormalizeCSS />
      <AppGlobalCSS />
      <Component router={router} {...pageProps} />
    </ThemeProvider>
  );
};

export default wrapper.withRedux(
  withRouter(MyApp),
);
