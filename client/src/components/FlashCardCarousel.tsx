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
    <Carousel className="flex flex-col gap-4 w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-3xl">
      <CarouselContent>
        {data &&
          data.map((flashcard) => {
            return (
              <CarouselItem key={flashcard.id} className="">
                <FlashCard
                  question={flashcard.question}
                  description={flashcard.description}
                  answer={flashcard.answer}
                  language={flashcard.language}
                  code={flashcard.code}
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
