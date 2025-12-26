export type Category = "Teamwork" | "Kindness" | "Excellence";

export interface Recognition {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  category: Category;
  emoji: string;
  createdAt: string;
  liked?: boolean;
}

export interface RecognitionInput {
  sender: string;
  receiver: string;
  message: string;
  category: Category;
  emoji: string;
}
