import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createRecognition, getRecognitions } from "../api/recognitionApi";
import type { Recognition, RecognitionInput } from "../types/recognition";

interface RecognitionContextValue {
  recognitions: Recognition[];
  loading: boolean;
  error: string | null;
  addRecognition: (input: RecognitionInput) => Promise<void>;
  toggleLike: (id: string) => void;
}

const RecognitionContext = createContext<RecognitionContextValue | undefined>(
  undefined,
);

const generateId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `rec-${Date.now()}`;

export function RecognitionProvider({ children }: { children: ReactNode }) {
  const [recognitions, setRecognitions] = useState<Recognition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getRecognitions()
      .then((data) => {
        if (isMounted) {
          setRecognitions(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("We couldn't fetch recognitions. Please try again shortly.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const addRecognition = useCallback(async (input: RecognitionInput) => {
    const newRecognition: Recognition = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      liked: false,
      ...input,
    };

    setRecognitions((current) => [newRecognition, ...current]);
    await createRecognition(newRecognition);
  }, []);

  const toggleLike = useCallback((id: string) => {
    setRecognitions((current) =>
      current.map((recognition) =>
        recognition.id === id
          ? { ...recognition, liked: !recognition.liked }
          : recognition,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({
      recognitions,
      loading,
      error,
      addRecognition,
      toggleLike,
    }),
    [recognitions, loading, error, addRecognition, toggleLike],
  );

  return (
    <RecognitionContext.Provider value={value}>
      {children}
    </RecognitionContext.Provider>
  );
}

export function useRecognition() {
  const context = useContext(RecognitionContext);
  if (!context) {
    throw new Error(
      "useRecognition must be used within a RecognitionProvider",
    );
  }

  return context;
}
