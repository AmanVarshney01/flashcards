import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDeleteFlashcard } from "@/queries";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export default function DeleteFlashcardSheet({
  flashcardId,
}: {
  flashcardId: number;
}) {
  const deleteFlashcard = useDeleteFlashcard();
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"secondary"} size={"sm"}>
          <Trash2 className="mr-1" size={14} />
          Delete
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-6">
          <SheetTitle>Delete Flashcard</SheetTitle>
          <SheetDescription>
            Are you absolutely sure you want to delete this flashcard with id{" "}
            {flashcardId}?
          </SheetDescription>
        </SheetHeader>
        <Button
          variant={"destructive"}
          onClick={() => deleteFlashcard.mutate(flashcardId)}
        >
          Delete
        </Button>
      </SheetContent>
    </Sheet>
  );
}
