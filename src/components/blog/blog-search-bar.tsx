"use client";

import clsx from "clsx";

import PillLink from "@/components/pill-link";
import { buildBlogSearchHref } from "@/app/blog/content";
import { scrollBlogEntriesIntoView } from "@/components/blog/blog-scroll";

type BlogSearchBarProps = {
  query: string;
  totalPublishedPosts: number;
  className?: string;
};

const blogSearchBarClass = clsx(
  "mx-auto w-full max-w-5xl space-y-4 border-y border-border/70 py-4 sm:py-5",
);
const blogSearchFormClass = clsx(
  "grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:flex-1",
);
const blogSearchLayoutClass = clsx(
  "flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-4",
);
const blogSearchLabelClass = clsx("space-y-2");
const blogSearchEyebrowClass = clsx(
  "text-[0.68rem] font-medium uppercase tracking-[0.34em] text-foreground/60",
  "dark:text-muted-foreground",
);
const blogSearchInputClass = clsx(
  "min-h-12 w-full rounded-2xl border border-border/80 bg-background/96 px-4 py-3",
  "text-sm text-foreground placeholder:text-foreground/40",
  "shadow-[0_1px_0_rgba(255,255,255,0.02)] outline-none transition-colors duration-200",
  "focus:border-primary/40 focus:ring-2 focus:ring-primary/20",
  "dark:bg-background/60",
);
const blogSearchActionsClass = clsx("flex flex-wrap items-center gap-3");
const blogSearchButtonClass = clsx(
  "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3",
  "cursor-pointer border border-transparent bg-foreground text-background",
  "text-sm font-semibold transition-colors duration-200 hover:bg-primary hover:text-primary-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);
const blogSearchCountClass = clsx(
  "inline-flex min-h-12 shrink-0 items-center gap-1.5 rounded-[1.1rem] border border-border/80 bg-background/94 px-4 py-3",
  "shadow-sm dark:bg-background/70",
);
const blogSearchCountValueClass = clsx("text-lg font-semibold leading-none text-foreground");
const blogSearchCountTextClass = clsx(
  "text-xs font-medium leading-none text-foreground/60",
  "dark:text-muted-foreground",
);

export default function BlogSearchBar({
  query,
  totalPublishedPosts,
  className,
}: BlogSearchBarProps) {
  const resetHref = buildBlogSearchHref({ page: 1 });

  return (
    <section className={clsx(blogSearchBarClass, className)}>
      <div className={blogSearchLayoutClass}>
        <form
          action="/blog"
          method="get"
          role="search"
          className={blogSearchFormClass}
          onSubmit={scrollBlogEntriesIntoView}
        >
          <input type="hidden" name="page" value="1" />
          <label className={blogSearchLabelClass}>
            <span className={blogSearchEyebrowClass}>Buscar posts</span>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Buscar posts do blog..."
              autoComplete="off"
              className={blogSearchInputClass}
            />
          </label>

          <div className={blogSearchActionsClass}>
            <button type="submit" className={blogSearchButtonClass}>
              Buscar
            </button>
            {query ? (
              <PillLink href={resetHref} variant="outline">
                Limpar
              </PillLink>
            ) : null}
          </div>
        </form>

        <div className={blogSearchCountClass} aria-label="Total de posts publicados">
          <strong className={blogSearchCountValueClass}>{totalPublishedPosts}</strong>
          <span className={blogSearchCountTextClass}>posts publicados</span>
        </div>
      </div>
    </section>
  );
}
