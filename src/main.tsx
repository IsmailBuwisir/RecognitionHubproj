import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { RecognitionProvider } from "./context/RecognitionContext";
import "./index.css";
import theme from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <RecognitionProvider>
          <App />
        </RecognitionProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
);
