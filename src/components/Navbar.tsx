import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/feed", label: "Feed" },
  { to: "/send", label: "Send Recognition" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const bg = useColorModeValue("white", "gray.900");
  const border = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      as="header"
      bg={bg}
      borderBottom="1px solid"
      borderColor={border}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex
        as="nav"
        aria-label="Main navigation"
        mx="auto"
        maxW="6xl"
        px={{ base: 4, md: 8 }}
        py={4}
        align="center"
        justify="space-between"
      >
        <Heading size="md">Recognition Hub</Heading>
        <HStack spacing={1}>
          {links.map((link) => (
            <Button
              key={link.to}
              as={NavLink}
              to={link.to}
              variant="ghost"
              size="sm"
              fontWeight="medium"
              aria-label={`Navigate to ${link.label}`}
              _activeLink={{
                color: "orange.500",
                fontWeight: "semibold",
              }}
            >
              {link.label}
            </Button>
          ))}
        </HStack>
      </Flex>
    </Box>
  );
}
