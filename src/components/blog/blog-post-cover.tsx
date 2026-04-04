import clsx from "clsx";

type BlogPostCoverProps = {
  category: string;
  className?: string;
};

const blogPostCoverClass = clsx(
  "overflow-hidden rounded-[2rem] border border-border/70 bg-background/90",
);
const blogPostCoverInnerClass = clsx(
  "relative grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:p-8",
);
const blogPostCoverPanelClass = clsx(
  "relative min-h-[14rem] overflow-hidden rounded-[1.5rem] border border-border/60",
  "bg-[linear-gradient(135deg,rgba(59,130,246,0.12),rgba(255,255,255,0.02))]",
);
const blogPostCoverPanelGridClass = clsx(
  "absolute inset-0 opacity-80",
  "bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]",
  "bg-[size:24px_24px]",
);
const blogPostCoverEyebrowClass = clsx(
  "text-[0.68rem] font-medium uppercase tracking-[0.34em] text-foreground/60",
  "dark:text-muted-foreground",
);

export default function BlogPostCover({
  category,
  className,
}: BlogPostCoverProps) {
  return (
    <figure
      className={clsx(blogPostCoverClass, className)}
      role="img"
      aria-label="Capa conceitual do artigo"
    >
      <div className={blogPostCoverInnerClass}>
        <div className="space-y-4">
          <p className={blogPostCoverEyebrowClass}>{category}</p>

          <div className="space-y-3">
            <div className="h-2.5 w-32 rounded-full bg-foreground/12" />
            <div className="h-2.5 w-48 rounded-full bg-foreground/8" />
            <div className="h-2.5 w-24 rounded-full bg-primary/12" />
          </div>

          <p className="max-w-sm text-sm leading-7 text-foreground/72 dark:text-muted-foreground">
            Estrutura editorial, foco de leitura e um bloco visual que separa o título do corpo do texto.
          </p>
        </div>

        <div className={blogPostCoverPanelClass}>
          <div className={blogPostCoverPanelGridClass} />
          <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
            <div className="space-y-2">
              <p className={blogPostCoverEyebrowClass}>Editor</p>
              <p className="text-sm leading-6 text-foreground/72 dark:text-muted-foreground">
                Estrutura, leitura e hierarquia
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-3 w-4/5 rounded-full bg-foreground/14" />
              <div className="h-3 w-2/3 rounded-full bg-foreground/10" />
              <div className="h-3 w-5/6 rounded-full bg-foreground/8" />
              <div className="h-28 rounded-2xl border border-border/60 bg-background/72 p-4">
                <div className="flex h-full items-end gap-3">
                  <div className="h-10 w-4 rounded-full bg-primary/50" />
                  <div className="h-16 w-4 rounded-full bg-primary/40" />
                  <div className="h-20 w-4 rounded-full bg-primary/30" />
                  <div className="h-14 w-4 rounded-full bg-primary/20" />
                  <div className="h-24 w-4 rounded-full bg-primary/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
