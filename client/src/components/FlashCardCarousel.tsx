import { flashcard } from "@/lib/types";
import { getFlashcards } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import FlashCard from "./FlashCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function FlashCardCarousel() {
  const { data, isLoading, error } = useQuery<flashcard[]>({
    queryKey: ["flashcards"],
    queryFn: getFlashcards,
  });

  console.log(data);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Carousel className="flex flex-col gap-4">
      <CarouselContent>
        {data &&
          data.map((flashcard) => {
            return (
              <CarouselItem key={flashcard.id}>
                <FlashCard
                  question={flashcard.question}
                  answer={flashcard.answer}
                  code={flashcard.code}
                  description={flashcard.description}
                />
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <div className="flex flex-row items-center justify-between">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
