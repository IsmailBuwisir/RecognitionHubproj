import type { Recognition } from "../types/recognition";

const DATA_URL = "/data/recognitions.json";

export async function getRecognitions(): Promise<Recognition[]> {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error("Unable to load recognitions right now.");
  }

  const data = (await response.json()) as Recognition[];
  return data;
}

export async function createRecognition(
  recognition: Recognition,
): Promise<Recognition> {
  // Simulate a lightweight POST; the feed keeps data in memory.
  return new Promise((resolve) => {
    setTimeout(() => resolve(recognition), 350);
  });
}
