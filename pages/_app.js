import React from 'react';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { withRouter } from 'next/router';
import { wrapper } from 'src/store';

// Global Styles
import 'modern-normalize';
import theme from '../theme';
import { Raleway } from 'next/font/google';
import 'src/stylesheets/global.css';

const ralewayFont = Raleway({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});

const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
        />
        <style jsx global>{`
          html, body {
            font-family: ${ralewayFont.style.fontFamily}, 'Segoe UI Light', 'Arial', sans-serif;
          }
        `}</style>
        <Component router={props.router} {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default withRouter(MyApp);
