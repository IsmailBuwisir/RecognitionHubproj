import {
  Avatar,
  Box,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Progress,
  SimpleGrid,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { FiAward } from "react-icons/fi";
import { useRecognition } from "../context/RecognitionContext";
import type { Category } from "../types/recognition";

const categories: Category[] = ["Teamwork", "Kindness", "Excellence"];
const TOTAL_RECEIVED = 18;

export default function ProfilePage() {
  const { recognitions } = useRecognition();
  const totalSent = recognitions.length;

  const topRecipients = useMemo(() => {
    const counts = recognitions.reduce<Record<string, number>>(
      (acc, recognition) => {
        acc[recognition.receiver] = (acc[recognition.receiver] ?? 0) + 1;
        return acc;
      },
      {},
    );

    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
  }, [recognitions]);

  const categoryStats = useMemo(() => {
    return categories.map((category) => ({
      category,
      count: recognitions.filter((rec) => rec.category === category).length,
    }));
  }, [recognitions]);

  return (
    <Stack spacing={8}>
      <Box>
        <Heading as="h1" size="lg">
          Profile & Stats
        </Heading>
        <Text color="gray.600">
          See how you're lifting the team up week over week.
        </Text>
      </Box>

      <HStack
        spacing={{ base: 4, md: 8 }}
        align="stretch"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Stack
          flex="1"
          bg="white"
          borderRadius="lg"
          p={6}
          shadow="md"
          spacing={4}
        >
          <HStack spacing={4}>
            <Avatar size="lg" name="Ismail Ali" />
            <Box>
              <Text fontWeight="bold">Ismail Ali</Text>
              <Text color="gray.500">Frontend Intern</Text>
            </Box>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Passionate about building thoughtful experiences where gratitude and
            accessibility meet.
          </Text>
        </Stack>
        <SimpleGrid
          flex="1"
          gap={4}
          minChildWidth={{ base: "100%", sm: "180px" }}
        >
          <Stat bg="white" borderRadius="lg" p={4} shadow="md">
            <StatLabel>Total Sent</StatLabel>
            <StatNumber>{totalSent}</StatNumber>
            <StatHelpText>Across teams</StatHelpText>
          </Stat>
          <Stat bg="white" borderRadius="lg" p={4} shadow="md">
            <StatLabel>Total Received</StatLabel>
            <StatNumber>{TOTAL_RECEIVED}</StatNumber>
            <StatHelpText>Keep the love coming</StatHelpText>
          </Stat>
        </SimpleGrid>
      </HStack>

      <Stack
        spacing={6}
        bg="white"
        borderRadius="lg"
        p={{ base: 4, md: 6 }}
        shadow="md"
      >
        <Box>
          <Heading as="h2" size="md" mb={1}>
            Top people you've celebrated
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Focus areas help you stay intentional about recognition.
          </Text>
        </Box>
        <List spacing={3}>
          {topRecipients.map(([name, count]) => (
            <ListItem key={name} display="flex" alignItems="center">
              <ListIcon as={FiAward} color="orange.400" aria-hidden />
              <Text fontWeight="medium">{name}</Text>
              <Text color="gray.500" ml="auto">
                {count} sent
              </Text>
            </ListItem>
          ))}
          {!topRecipients.length && (
            <Text color="gray.500">Send some recognitions to see stats.</Text>
          )}
        </List>
      </Stack>

      <Stack
        spacing={4}
        bg="white"
        borderRadius="lg"
        p={{ base: 4, md: 6 }}
        shadow="md"
      >
        <Heading as="h2" size="md">
          Recognition categories
        </Heading>
        {categoryStats.map(({ category, count }) => {
          const percent = totalSent
            ? Math.round((count / totalSent) * 100)
            : 0;
          return (
            <Box key={category}>
              <HStack justify="space-between">
                <Text fontWeight="medium">{category}</Text>
                <Text color="gray.500">
                  {count} ({percent}%)
                </Text>
              </HStack>
              <Progress
                mt={2}
                borderRadius="full"
                value={percent}
                aria-label={`${category} recognitions`}
              />
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
}
