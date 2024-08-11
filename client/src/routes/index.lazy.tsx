import FlashCardCarousel from "@/components/FlashCardCarousel";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { data } = useQuery({
    queryKey: ["flashcards"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/flashcards");
      return res.json();
    },
  });

  console.log(data);

  return (
    <main className="flex justify-center items-center h-full p-2">
      <div className="">
        <FlashCardCarousel flashcards={data} />
      </div>
    </main>
  );
}
