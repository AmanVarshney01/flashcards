import FlashCardCarousel from "@/components/FlashCardCarousel";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["flashcards"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/flashcards");
      return res.json();
    },
  });

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <main className="flex justify-center items-center h-full p-2">
      <div className=" max-w-5xl">
        <FlashCardCarousel flashcards={data} />
      </div>
    </main>
  );
}
