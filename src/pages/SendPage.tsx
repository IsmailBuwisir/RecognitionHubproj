import { Heading, Stack, Text } from "@chakra-ui/react";
import RecognitionForm from "../components/RecognitionForm";

export default function SendPage() {
  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <Heading as="h1" size="lg">
          Send Recognition
        </Heading>
        <Text color="gray.600">
          Share the moment, highlight the impact, and keep the gratitude going.
        </Text>
      </Stack>
      <RecognitionForm />
    </Stack>
  );
}
