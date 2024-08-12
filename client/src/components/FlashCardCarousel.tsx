import { useFlashcards } from "@/queries";
import FlashCard from "./FlashCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function FlashCardCarousel() {
  const { data, isLoading, error } = useFlashcards();

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
