import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html>
    <Head />
    <body className="bg-zinc-800 selection:bg-orange-400 selection:text-white">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
