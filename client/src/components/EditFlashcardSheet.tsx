import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { flashcard } from "@/lib/types";
import { useUpdateFlashcard } from "@/queries";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  question: z.string(),
  description: z.string().optional(),
  answer: z.string(),
  language: z.string().optional(),
  code: z.string().optional(),
});

export default function EditFlashcardSheet({
  id,
  question,
  answer,
  code,
  description,
  language,
}: flashcard) {
  const updateFlashcard = useUpdateFlashcard();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: question,
      description: description,
      answer: answer,
      language: language,
      code: code,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFlashcard.mutate({ id, ...values });
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"secondary"} size={"sm"}>
          <Edit className="mr-1" size={14} />
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-6">
          <SheetTitle>Edit Flashcard</SheetTitle>
          <SheetDescription>Edit the flashcard with id {id}.</SheetDescription>
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
