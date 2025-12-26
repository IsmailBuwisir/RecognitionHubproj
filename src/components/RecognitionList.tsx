import { Alert, AlertIcon, chakra } from "@chakra-ui/react";
import type { Recognition } from "../types/recognition";
import RecognitionCard from "./RecognitionCard";

interface RecognitionListProps {
  recognitions: Recognition[];
  onSelect: (recognition: Recognition) => void;
  onCelebrate: (id: string) => void;
}

export default function RecognitionList({
  recognitions,
  onSelect,
  onCelebrate,
}: RecognitionListProps) {
  if (!recognitions.length) {
    return (
      <Alert status="info" borderRadius="md">
        <AlertIcon />
        No recognitions yet. Be the first to send one!
      </Alert>
    );
  }

  return (
    <chakra.ul listStyleType="none" m={0} p={0}>
      {recognitions.map((recognition) => (
        <chakra.li key={recognition.id} mb={4}>
          <RecognitionCard
            recognition={recognition}
            onSelect={onSelect}
            onCelebrate={onCelebrate}
          />
        </chakra.li>
      ))}
    </chakra.ul>
  );
}
