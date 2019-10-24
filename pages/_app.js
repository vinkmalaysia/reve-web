import React from 'react';
import App from 'next/app';
import Helmet from 'react-helmet';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { withRouter } from 'next/router';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createStore from 'src/store/createStore';
import theme from 'src/theme';

// Global Styles
const NormalizeCSS = createGlobalStyle` ${require('!!raw-loader!@csstools/normalize.css').default} `;
const AppGlobalCSS = createGlobalStyle` ${require('!!raw-loader!../src/stylesheets/global.css').default} `;

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {},
    };
  }

  render () {
    const { Component, pageProps, store, router } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
        />
        <NormalizeCSS />
        <AppGlobalCSS />
        <Provider store={store}>
          <Component router={router} {...pageProps} />
        </Provider>
      </ThemeProvider>
    );
  }
}

export default withRedux(createStore)(
  withRouter(MyApp)
);
