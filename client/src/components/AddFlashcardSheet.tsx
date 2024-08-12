import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
// import { useMutation } from "@tanstack/react-query";

export default function EditFlashcardSheet() {
  // const mutation = useMutation({
  //   mutationFn: () => {
  //     fetch("http://localhost:3000/api/flashcards")
  //   }
  // })
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"secondary"} size={"sm"}>
          <Plus className="mr-1" size={14} />
          Add
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
