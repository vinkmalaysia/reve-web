import React from 'react';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { withRouter } from 'next/router';
import { wrapper } from 'src/store';

import theme from '../theme';

// Global Styles
const NormalizeCSS = createGlobalStyle` ${require('!!raw-loader!@csstools/normalize.css').default} `;
const AppGlobalCSS = createGlobalStyle` ${require('!!raw-loader!../src/stylesheets/global.css').default} `;

const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
        />
        <NormalizeCSS />
        <AppGlobalCSS />
        <Component router={props.router} {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default withRouter(MyApp);
