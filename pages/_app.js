import React from "react";
import ReactDom from "react-dom";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import "@fontsource/inter/variable-full.css";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme(
  { config },
  {
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
  }
);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
