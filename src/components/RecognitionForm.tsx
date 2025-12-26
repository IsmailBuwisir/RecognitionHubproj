import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useRecognition } from "../context/RecognitionContext";
import type { Category, RecognitionInput } from "../types/recognition";

const emojiOptions = ["🎉", "🙌", "🌟", "💛", "🤝"];
const categories: Category[] = ["Teamwork", "Kindness", "Excellence"];

type FormErrors = Partial<Record<keyof RecognitionInput, string>>;

const initialValues: RecognitionInput = {
  sender: "Ismail Ali",
  receiver: "",
  message: "",
  category: "Teamwork",
  emoji: "🎉",
};

export default function RecognitionForm() {
  const { addRecognition } = useRecognition();
  const toast = useToast();
  const [values, setValues] = useState<RecognitionInput>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!values.sender.trim()) {
      nextErrors.sender = "Please add a sender.";
    }
    if (!values.receiver.trim()) {
      nextErrors.receiver = "Receiver is required.";
    }
    if (!values.message.trim()) {
      nextErrors.message = "Share a quick note so they know what you loved.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name as keyof RecognitionInput]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      setIsSubmitting(true);
      await addRecognition(values);
      setValues({ ...initialValues, sender: values.sender });
      toast({
        title: "Recognition sent!",
        description: `${values.receiver} will feel the love.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Please try sending that recognition again.",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      noValidate
      bg="white"
      borderRadius="lg"
      shadow="md"
      p={{ base: 4, md: 6 }}
    >
      <FormControl isRequired isInvalid={Boolean(errors.sender)} mb={4}>
        <FormLabel htmlFor="sender">Sender</FormLabel>
        <Input
          id="sender"
          name="sender"
          value={values.sender}
          onChange={handleChange}
          placeholder="Your name"
        />
        <FormErrorMessage>{errors.sender}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={Boolean(errors.receiver)} mb={4}>
        <FormLabel htmlFor="receiver">Receiver</FormLabel>
        <Input
          id="receiver"
          name="receiver"
          value={values.receiver}
          onChange={handleChange}
          placeholder="Who are you recognizing?"
        />
        <FormErrorMessage>{errors.receiver}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={Boolean(errors.message)} mb={4}>
        <FormLabel htmlFor="message">Message</FormLabel>
        <Textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          placeholder="Share what made them stand out..."
        />
        <FormErrorMessage>{errors.message}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="category">Category</FormLabel>
        <Select
          id="category"
          name="category"
          value={values.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={6}>
        <FormLabel>Emoji</FormLabel>
        <HStack spacing={2} role="group" aria-label="Choose an emoji">
          {emojiOptions.map((emoji) => (
            <Button
              key={emoji}
              type="button"
              variant={values.emoji === emoji ? "solid" : "outline"}
              onClick={() => setValues((current) => ({ ...current, emoji }))}
              aria-pressed={values.emoji === emoji}
            >
              {emoji}
            </Button>
          ))}
        </HStack>
      </FormControl>

      <Button
        type="submit"
        colorScheme="orange"
        width="full"
        isLoading={isSubmitting}
      >
        Send Recognition
      </Button>
    </Box>
  );
}
