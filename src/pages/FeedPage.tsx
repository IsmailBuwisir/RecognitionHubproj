import {
  Alert,
  AlertIcon,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import RecognitionList from "../components/RecognitionList";
import RecognitionModal from "../components/RecognitionModal";
import { useRecognition } from "../context/RecognitionContext";
import type { Recognition } from "../types/recognition";

export default function FeedPage() {
  const { recognitions, loading, error, toggleLike } = useRecognition();
  const [selectedRecognition, setSelectedRecognition] =
    useState<Recognition | null>(null);

  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <Heading as="h1" size="lg">
          Recognition Feed
        </Heading>
        <Text color="gray.600">
          Celebrate the people who make teamwork feel effortless.
        </Text>
      </Stack>

      {loading && (
        <Stack align="center" py={10}>
          <Spinner size="lg" aria-label="Loading recognitions" />
        </Stack>
      )}

      {error && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <RecognitionList
          recognitions={recognitions}
          onSelect={setSelectedRecognition}
          onCelebrate={toggleLike}
        />
      )}

      <RecognitionModal
        recognition={selectedRecognition}
        isOpen={Boolean(selectedRecognition)}
        onClose={() => setSelectedRecognition(null)}
      />
    </Stack>
  );
}
