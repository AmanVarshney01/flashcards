import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export default function DeleteFlashcardSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"secondary"} size={"sm"}>
          <Trash2 className="mr-1" size={14} />
          Delete
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>delete</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
