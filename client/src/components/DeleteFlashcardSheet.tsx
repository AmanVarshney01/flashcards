import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDeleteFlashcard } from "@/queries";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function DeleteFlashcardSheet({
  flashcardId,
}: {
  flashcardId: number;
}) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const deleteFlashcard = useDeleteFlashcard();

  function onSubmit(flashcardId: number) {
    deleteFlashcard.mutate(flashcardId, {
      onSuccess: () => {
        toast.success("Flashcard deleted successfully");
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["flashcards"] });
      },
    });
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
        <Button variant={"destructive"} onClick={() => onSubmit(flashcardId)}>
          Delete
        </Button>
      </SheetContent>
    </Sheet>
  );
}
