import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useCreateFlashcard } from "@/queries";

const formSchema = z.object({
  question: z.string(),
  description: z.string().optional(),
  answer: z.string(),
  language: z.string().optional(),
  code: z.string().optional(),
});

export default function AddFlashcardSheet() {
  const createFlashcard = useCreateFlashcard();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      description: "",
      answer: "",
      language: "",
      code: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createFlashcard.mutate(values)
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"secondary"} size={"sm"}>
          <Plus className="mr-1" size={14} />
          Add
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-6">
          <SheetTitle>Add Flashcard</SheetTitle>
          <SheetDescription>
            Add a new flashcard to the collection.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="What is Linked List?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Linked List is a data structure (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Linked List is a data structure"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder="Typescript" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="const x = 10; (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
