import React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { withRouter } from 'next/router';

// Global Styles
import 'modern-normalize';
import theme from '../theme';
import { Raleway } from 'next/font/google';
import 'src/stylesheets/global.css';

const ralewayFont = Raleway({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const MyApp = ({ Component, ...props }) => {
  return (
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
  );
};

export default withRouter(MyApp);
