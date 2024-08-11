import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function FlashCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Flash Card</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p>{question}</p>
          <p>{answer}</p>
        </div>
      </CardContent>
    </Card>
  );
}
