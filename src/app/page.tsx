import Hero from "@/components/hero/hero";

export default function Home() {
  return (
    <main className="flex-1 w-full">
      {/* A home page apenas monta o Hero; a narrativa principal vive dentro do componente. */}
      <Hero />
    </main>
  );
}
