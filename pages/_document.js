import Document, { Html, Head, Main, NextScript } from "next/document";
import { render } from "react-dom";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="content-language" content="en-us" />
          <meta
            name="keywords"
            content="filecoin,datastation, storage provider, miner, marketplace, storage, decentralised, miner marketplace, storage solution, blockchain storage, ipfs, analytics, earning calculator, miners"
          />
          <meta name="theme-color" content="#3182CE" />

          {/* favicon */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
