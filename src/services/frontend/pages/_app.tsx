import React from "react";
import App, { Container } from "next/app";
import { ThemeProvider } from "styled-components";

import "antd/dist/antd.css";
import "@src/style/index.css";

const theme = {
  colors: {
    primary: "#0070f3"
  }
};

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}
