import '../styles/globals.css'
import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../lib/ga/gtag";


function MyApp({ Component, pageProps }) {

    const router = useRouter();
    useEffect(() => {
      const handleRouteChange = (url) => {
        gtag.pageview(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }, [router.events]);

  return (
     <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-8XX66RHHLN`}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8XX66RHHLN', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
