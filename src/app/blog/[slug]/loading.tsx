export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-14 py-6 sm:gap-16 sm:py-10 lg:py-12">
      <div className="h-11 w-32 rounded-full border border-border/70 bg-muted/40" />

      <section className="space-y-4">
        <div className="h-3 w-28 rounded-full bg-muted/50" />
        <div className="h-16 w-full max-w-4xl rounded-2xl bg-muted/50" />
        <div className="h-6 w-full max-w-2xl rounded-2xl bg-muted/50" />
      </section>

      <section className="space-y-6">
        <div className="grid gap-0 border-y border-border/70 sm:grid-cols-3">
          <div className="space-y-2 border-b border-border/70 py-4 sm:border-b-0 sm:border-r sm:px-6 first:sm:pl-0 last:sm:border-r-0 last:sm:pr-0">
            <div className="h-3 w-24 rounded-full bg-muted/50" />
            <div className="h-4 w-28 rounded-full bg-muted/50" />
          </div>
          <div className="space-y-2 border-b border-border/70 py-4 sm:border-b-0 sm:border-r sm:px-6 first:sm:pl-0 last:sm:border-r-0 last:sm:pr-0">
            <div className="h-3 w-24 rounded-full bg-muted/50" />
            <div className="h-4 w-20 rounded-full bg-muted/50" />
          </div>
          <div className="space-y-2 border-b border-border/70 py-4 sm:border-b-0 sm:px-6 first:sm:pl-0 last:sm:pr-0">
            <div className="h-3 w-24 rounded-full bg-muted/50" />
            <div className="h-4 w-32 rounded-full bg-muted/50" />
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4 border-b border-border/70 pb-8">
            <div className="h-8 w-72 rounded-full bg-muted/50" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded-full bg-muted/50" />
              <div className="h-4 w-5/6 rounded-full bg-muted/50" />
            </div>
          </div>
          <div className="space-y-4 border-b border-border/70 pb-8">
            <div className="h-8 w-64 rounded-full bg-muted/50" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded-full bg-muted/50" />
              <div className="h-4 w-4/5 rounded-full bg-muted/50" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
