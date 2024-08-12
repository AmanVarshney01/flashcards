import FlashCardCarousel from "@/components/FlashCardCarousel";

export default function Home() {
  return (
    <main className="flex h-full items-center justify-center p-2">
      <div className="max-w-5xl">
        <FlashCardCarousel />
      </div>
    </main>
  );
}
