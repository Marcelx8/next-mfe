import '../styles/globals.css'
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

// const Nav = dynamic(() => import("shell/nav"), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Nav /> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
