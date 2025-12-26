import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { KeyboardEvent } from "react";
import { FiHeart } from "react-icons/fi";
import type { Recognition } from "../types/recognition";

interface RecognitionCardProps {
  recognition: Recognition;
  onSelect: (recognition: Recognition) => void;
  onCelebrate: (id: string) => void;
}

export default function RecognitionCard({
  recognition,
  onSelect,
  onCelebrate,
}: RecognitionCardProps) {
  const { sender, receiver, message, emoji, category, createdAt, liked } =
    recognition;

  const formattedDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(new Date(createdAt));

  const handleSelect = () => onSelect(recognition);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(recognition);
    }
  };

  return (
    <Card
      role="group"
      tabIndex={0}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      cursor="pointer"
      _hover={{ shadow: "md" }}
      _focusVisible={{ outline: "2px solid", outlineColor: "orange.400" }}
      transition="box-shadow 0.2s ease"
    >
      <CardBody>
        <Stack spacing={4}>
          <Flex justify="space-between" align={{ base: "flex-start", md: "center" }}>
            <HStack spacing={3} align="flex-start">
              <Avatar name={sender} size="sm" />
              <Box>
                <Text fontWeight="bold">{sender}</Text>
                <Text fontSize="sm" color="gray.500">
                  recognizing <Box as="span" fontWeight="medium">{receiver}</Box>
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {formattedDate}
                </Text>
              </Box>
            </HStack>
            <IconButton
              aria-label={`Celebrate recognition for ${receiver}`}
              icon={<FiHeart />}
              variant={liked ? "solid" : "outline"}
              colorScheme="pink"
              size="sm"
              onClick={(event) => {
                event.stopPropagation();
                onCelebrate(recognition.id);
              }}
            />
          </Flex>
          <Text>{message}</Text>
          <Flex justify="space-between" align="center">
            <Badge colorScheme="purple" px={2} py={1} borderRadius="md">
              {category}
            </Badge>
            <Box fontSize="2xl" role="img" aria-label={`${category} emoji`}>
              {emoji}
            </Box>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}
