export default function ContactPage() {
  return (
    <section className="flex flex-1 flex-col justify-center py-16 sm:py-20">
      <div className="max-w-2xl space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Contato
        </p>
        <h1 className="font-heading text-4xl tracking-[-0.06em] text-foreground sm:text-5xl">
          Contatos
        </h1>
        <p className="max-w-xl text-base leading-7 text-muted-foreground">
          Canal reservado para convites, projetos e conversas profissionais.
        </p>
      </div>
    </section>
  );
}
