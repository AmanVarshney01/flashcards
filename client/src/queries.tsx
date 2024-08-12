const API_URL = import.meta.env.VITE_API_URL;

console.log("api" + API_URL);

export const getFlashcards = async () => {
  const res = await fetch(`${API_URL}/flashcards`);
  return res.json();
};
