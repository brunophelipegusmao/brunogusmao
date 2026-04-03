export default function AdminHome() {
  return (
    <section className="flex flex-1 flex-col justify-center py-16 sm:py-20">
      <div className="max-w-2xl space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Admin
        </p>
        <h1 className="font-heading text-4xl tracking-[-0.06em] text-foreground sm:text-5xl">
          AdminHome
        </h1>
        <p className="max-w-xl text-base leading-7 text-muted-foreground">
          Área interna reservada para manutenção e operação do site.
        </p>
      </div>
    </section>
  );
}
