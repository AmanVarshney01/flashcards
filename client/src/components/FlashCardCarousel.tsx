import { flashcard } from "@/lib/types";
import FlashCard from "./FlashCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function FlashCardCarousel({
  flashcards,
}: {
  flashcards: flashcard[];
}) {
  return (
    <Carousel className=" flex flex-col gap-4">
      <CarouselContent>
        {flashcards.map((flashcard) => {
          return (
            <CarouselItem key={flashcard.id}>
              <FlashCard
                question={flashcard.question}
                answer={flashcard.answer}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="flex flex-row justify-between items-center">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
