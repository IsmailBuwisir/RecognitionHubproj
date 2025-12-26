import type { ThemeConfig } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    body: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
  },
});

export default theme;
