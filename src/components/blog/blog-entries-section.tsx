import clsx from "clsx";

import PillLink from "@/components/pill-link";
import SectionHeading from "@/components/section-heading";
import BlogPostCard from "@/components/blog/blog-post-row";
import BlogPagination from "@/components/blog/blog-pagination";
import type { BlogEntry } from "@/app/blog/content";

type BlogEntriesSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  entries: readonly BlogEntry[];
  query: string;
  currentPage: number;
  totalPages: number;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateActionLabel?: string;
  emptyStateActionHref?: string;
  className?: string;
};

const blogEntriesSectionClass = clsx("mx-auto w-full max-w-7xl space-y-3 sm:space-y-4");
const blogEntriesListClass = clsx("grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3");
const blogEntriesFooterClass = clsx("mt-6");
const blogEntriesEmptyClass = clsx(
  "space-y-4 rounded-[2rem] border border-border/70 bg-background/90 p-6 text-sm leading-7",
  "text-foreground/72 shadow-sm dark:bg-background/70 dark:text-muted-foreground",
);
const blogEntriesEmptyActionRowClass = clsx("flex flex-wrap gap-3");

export default function BlogEntriesSection({
  id,
  eyebrow,
  title,
  description,
  entries,
  query,
  currentPage,
  totalPages,
  emptyStateTitle = "Nenhum post encontrado",
  emptyStateDescription =
    "Tente outro termo de busca ou limpe a busca atual.",
  emptyStateActionLabel = "Limpar busca",
  emptyStateActionHref = "/blog",
  className,
}: BlogEntriesSectionProps) {
  return (
    <section id={id} aria-labelledby={id} className={clsx(blogEntriesSectionClass, className)}>
      <SectionHeading
        id={id}
        eyebrow={eyebrow}
        title={title}
        description={description}
        className="max-w-2xl"
      />

      {entries.length ? (
        <>
          <div className={blogEntriesListClass}>
            {entries.map((entry) => (
              <BlogPostCard key={entry.slug} {...entry} />
            ))}
          </div>

          <div className={blogEntriesFooterClass}>
            <BlogPagination
              query={query}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </>
      ) : (
        <>
          <div className={blogEntriesEmptyClass}>
            <p className="text-base font-medium text-foreground">{emptyStateTitle}</p>
            <p>{emptyStateDescription}</p>
            <div className={blogEntriesEmptyActionRowClass}>
              <PillLink href={emptyStateActionHref} variant="outline">
                {emptyStateActionLabel}
              </PillLink>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
