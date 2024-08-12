import AddFlashcardSheet from "@/components/AddFlashcardSheet";
import DeleteFlashcardSheet from "@/components/DeleteFlashcardSheet";
import EditFlashcardSheet from "@/components/EditFlashcardSheet";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { flashcard } from "@/lib/types";
import { getFlashcards } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export default function Admin() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["flashcards"],
    queryFn: getFlashcards,
  });

  return (
    <div className="p-2">
      <div className="flex flex-row justify-between p-4">
        <h2 className="text-2xl font-medium">Flashcards</h2>
        <AddFlashcardSheet />
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>An error occurred: {error.message}</div>}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data &&
          data.map((flashcard: flashcard) => (
            <Card className="flex h-full flex-col justify-around">
              <CardHeader>
                <CardTitle className="text-lg">{flashcard.question}</CardTitle>
              </CardHeader>
              <div className="">
                <CardContent className="">
                  <p className="line-clamp-1">{flashcard.answer}</p>
                </CardContent>
                <CardFooter className="flex flex-row justify-between gap-2">
                  <p className="text-nowrap">ID: {flashcard.id}</p>
                  <div className="flex flex-row gap-2">
                    <EditFlashcardSheet />
                    <DeleteFlashcardSheet />
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
