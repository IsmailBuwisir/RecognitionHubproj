import { Box, Container, chakra, useColorModeValue } from "@chakra-ui/react";
import type { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const bg = useColorModeValue("gray.50", "gray.800");

  return (
    <Box minH="100vh" bg={bg}>
      <chakra.a
        href="#main-content"
        position="absolute"
        left={-999}
        _focus={{
          left: 2,
          top: 2,
          bg: "white",
          px: 4,
          py: 2,
          shadow: "md",
        }}
      >
        Skip to main content
      </chakra.a>
      <Navbar />
      <Container
        as="main"
        id="main-content"
        maxW="6xl"
        px={{ base: 4, md: 8 }}
        py={{ base: 6, md: 10 }}
      >
        {children}
      </Container>
    </Box>
  );
}
