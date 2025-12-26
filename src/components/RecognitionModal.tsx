import {
  Badge,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Recognition } from "../types/recognition";

interface RecognitionModalProps {
  recognition: Recognition | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecognitionModal({
  recognition,
  isOpen,
  onClose,
}: RecognitionModalProps) {
  if (!recognition) {
    return null;
  }

  const formattedDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(recognition.createdAt));

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Recognition Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack spacing={4}>
            <Text fontWeight="bold">
              {recognition.sender} → {recognition.receiver}
            </Text>
            <Box fontSize="4xl" role="img" aria-label={recognition.category}>
              {recognition.emoji}
            </Box>
            <Text>{recognition.message}</Text>
            <Stack direction="row" align="center" justify="space-between">
              <Badge colorScheme="purple" px={2} py={1} borderRadius="md">
                {recognition.category}
              </Badge>
              <Text fontSize="sm" color="gray.500">
                {formattedDate}
              </Text>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
