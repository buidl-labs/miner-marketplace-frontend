import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import "@fontsource/inter/variable-full.css";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme(
  { config },
  {
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
    },
  }
);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load("RLIXEEKF", {
      includedDomains: ["datastation.app"],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    router.events.on("routeChangeComplete", onRouteChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
