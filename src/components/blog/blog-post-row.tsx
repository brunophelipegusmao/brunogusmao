import clsx from "clsx";
import Link from "next/link";

type BlogPostCardProps = {
  slug: string;
  status: string;
  publishedAt: string;
  title: string;
  description: string;
  meta: readonly [string, string];
  tags: readonly string[];
  href?: string;
  className?: string;
};

const blogPostCardClass = clsx(
  "overflow-hidden rounded-[1.5rem] border border-border/70 bg-background/94",
  "shadow-[0_18px_48px_rgba(15,23,42,0.07)] transition-all duration-300",
  "hover:-translate-y-0.5 hover:shadow-[0_24px_64px_rgba(15,23,42,0.1)]",
  "dark:bg-background/70 dark:shadow-[0_18px_48px_rgba(9,9,11,0.22)]",
  "dark:hover:shadow-[0_24px_64px_rgba(9,9,11,0.28)]",
);
const blogPostCardLinkClass = clsx(
  "group block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);
const blogPostCardMediaClass = clsx(
  "relative isolate aspect-[16/9] overflow-hidden border-b border-border/60",
);
const blogPostCardContentClass = clsx("space-y-4 p-4 sm:p-5");
const blogPostCardMetaRowClass = clsx("flex items-center justify-between gap-3");
const blogPostCardBadgeClass = clsx(
  "inline-flex min-h-7 items-center justify-center rounded-[0.35rem] bg-foreground px-2.5 py-1",
  "text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-background",
);
const blogPostCardDateClass = clsx(
  "text-[0.62rem] font-medium uppercase tracking-[0.3em] text-primary/70",
  "dark:text-primary/80",
);
const blogPostCardTitleClass = clsx(
  "max-w-3xl text-balance font-heading text-[1.35rem] leading-[1.08] tracking-[-0.06em] text-foreground",
  "transition-colors duration-200 group-hover:text-primary",
  "sm:text-[1.5rem] lg:text-[1.65rem]",
);
const blogPostCardDescriptionClass = clsx(
  "max-w-3xl text-[0.92rem] leading-6 text-foreground/72",
  "dark:text-muted-foreground",
);
const blogPostCardTagsClass = clsx("flex flex-wrap gap-1.5");
const blogPostCardTagClass = clsx(
  "min-h-7 rounded-[0.75rem] px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em]",
  "border border-border/80 bg-background/92 text-foreground/80",
);
const blogPostCardFooterClass = clsx(
  "border-t border-border/70 px-4 py-4 sm:px-5",
);
const blogPostCardFootnoteClass = "sr-only";

function normalizeBlogValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getBlogPostCardBackground(category: string) {
  const normalizedCategory = normalizeBlogValue(category);

  if (normalizedCategory.includes("dados")) {
    return "linear-gradient(135deg, rgba(8,15,35,0.98) 0%, rgba(37,99,235,0.82) 46%, rgba(6,182,212,0.58) 100%)";
  }

  if (normalizedCategory.includes("conteudo")) {
    return "linear-gradient(135deg, rgba(19,10,2,0.98) 0%, rgba(245,158,11,0.78) 46%, rgba(236,72,153,0.54) 100%)";
  }

  return "linear-gradient(135deg, rgba(7,15,34,0.98) 0%, rgba(59,130,246,0.78) 46%, rgba(16,185,129,0.58) 100%)";
}

function BlogPostCardVisual({ category }: { category: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{ backgroundImage: getBlogPostCardBackground(category) }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.46))]" />
      <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="absolute inset-y-[16%] left-[9%] w-[15%] rounded-[1.6rem] border border-white/10 bg-black/18 backdrop-blur-[2px]" />
      <div className="absolute inset-y-[16%] right-[9%] w-[15%] rounded-[1.6rem] border border-white/10 bg-black/18 backdrop-blur-[2px]" />

      <div className="absolute left-1/2 top-[10%] h-[80%] w-[32%] -translate-x-1/2 skew-x-[-10deg] rounded-[2rem] border border-white/15 bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]" />
      <div className="absolute inset-x-[22%] top-[18%] h-px bg-white/22" />
      <div className="absolute inset-x-[22%] top-[50%] h-px bg-white/22" />
      <div className="absolute inset-x-[22%] bottom-[18%] h-px bg-white/22" />
      <div className="absolute left-1/2 top-[18%] h-[64%] w-px -translate-x-1/2 bg-white/22" />

      <div className="absolute inset-x-[16%] bottom-[12%] h-10 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22),transparent_38%)] opacity-70" />
    </div>
  );
}

export default function BlogPostCard({
  slug,
  status,
  publishedAt,
  title,
  description,
  meta,
  tags,
  href,
  className,
}: BlogPostCardProps) {
  const descriptionId = `${slug}-card-description`;
  const interactiveClassName = href ? blogPostCardLinkClass : "block";
  const visibleTags = tags.slice(0, 3);
  const cardContent = (
    <>
      <figure role="img" aria-label={`Capa editorial de ${title}`} className={blogPostCardMediaClass}>
        <BlogPostCardVisual category={meta[0]} />
      </figure>

      <div className={blogPostCardContentClass}>
        <div className={blogPostCardMetaRowClass}>
          <span className={blogPostCardBadgeClass}>{meta[0].toUpperCase()}</span>
          <span className={blogPostCardDateClass}>{publishedAt}</span>
        </div>

        <h3 className={blogPostCardTitleClass}>{title}</h3>
        <p className={blogPostCardDescriptionClass}>{description}</p>

        <p id={descriptionId} className={blogPostCardFootnoteClass}>
          {status}. Categoria {meta[0]}. Leitura {meta[1]}. Tags: {tags.join(", ")}.
        </p>
      </div>
    </>
  );

  return (
    <article className={clsx(blogPostCardClass, className)}>
      {href ? (
        <Link
          href={href}
          aria-label={title}
          aria-describedby={descriptionId}
          className={interactiveClassName}
        >
          {cardContent}
        </Link>
      ) : (
        <div className={interactiveClassName}>{cardContent}</div>
      )}

      <div className={blogPostCardFooterClass}>
        <div className={blogPostCardTagsClass}>
          {visibleTags.map((tag) => (
            <span key={tag} className={blogPostCardTagClass}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
