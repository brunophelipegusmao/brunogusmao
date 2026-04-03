export default function BlogPage() {
  return (
    <section className="flex flex-1 flex-col justify-center py-16 sm:py-20">
      <div className="max-w-2xl space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Blog
        </p>
        <h1 className="font-heading text-4xl tracking-[-0.06em] text-foreground sm:text-5xl">
          Blog
        </h1>
        <p className="max-w-xl text-base leading-7 text-muted-foreground">
          Espaço reservado para textos, notas e análises sobre estratégia,
          dados e comunicação.
        </p>
      </div>
    </section>
  );
}
