import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getStaticProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <script
            data-webpack="shell"
            src="http://localhost:3000/_next/static/chunks/remoteEntry.js"
          />
          <script
            data-webpack="pdp"
            src="http://localhost:3001/_next/static/chunks/remoteEntry.js"
          />
          <script
            data-webpack="orders"
            src="http://localhost:3002/_next/static/chunks/remoteEntry.js"
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;