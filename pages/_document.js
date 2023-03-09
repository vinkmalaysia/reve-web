import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';

export default class CustomDocument extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const documentProps = await Document.getInitialProps(ctx);
      return {
        ...documentProps,
        helmet: Helmet.renderStatic(),
        styles: (
          <>
            {documentProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  get helmetHtmlAttrComponents () {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  get helmetHeadComponents () {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent());
  }

  get helmetBodyAttrComponents () {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  render () {
    return (
      <Html {...this.helmetHtmlAttrComponents}>
        <Head>
          {this.helmetHeadComponents}
          <link href="https://fonts.googleapis.com/css?family=Raleway:200,500&display=swap" rel="stylesheet" />
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
