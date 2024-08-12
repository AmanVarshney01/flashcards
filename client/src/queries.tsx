import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { flashcard } from "./lib/types";

const API_URL = import.meta.env.VITE_API_URL;

console.log("api" + API_URL);

export const useFlashcards = () => {
  return useQuery<flashcard[]>({
    queryKey: ["flashcards"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/flashcards`);
      return res.json();
    },
  });
};

export const useCreateFlashcard = () => {
  const queryClient = useQueryClient();

  return useMutation<flashcard, Error, Omit<flashcard, "id">>({
    mutationFn: async (newFlashcard) => {
      const response = await fetch(`${API_URL}/flashcards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlashcard),
      });
      return response.json();
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["flashcards"] });
    },
  });
};

export const useUpdateFlashcard = () => {
  const queryClient = useQueryClient();

  return useMutation<flashcard, Error, flashcard>({
    mutationFn: async (updatedFlashcard) => {
      const response = await fetch(
        `${API_URL}/flashcards/${updatedFlashcard.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFlashcard),
        },
      );
      return response.json();
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["flashcards"] });
    },
  });
};

export const useDeleteFlashcard = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      await fetch(`${API_URL}/flashcards/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["flashcards"] });
    },
  });
};
