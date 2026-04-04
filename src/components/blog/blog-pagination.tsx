"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { CaretLeftIcon, CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react";

import { buildBlogSearchHref } from "@/app/blog/content";

type BlogPaginationProps = {
  query: string;
  currentPage: number;
  totalPages: number;
  className?: string;
};

type BlogPaginationItem =
  | {
      type: "page";
      page: number;
    }
  | {
      type: "ellipsis";
      key: string;
    };

const blogPaginationRootClass = clsx("flex justify-center");
const blogPaginationListClass = clsx(
  "flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3",
);
const blogPaginationBaseClass = clsx(
  "inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[1.1rem] border px-4 py-3",
  "text-sm font-medium leading-none transition-colors duration-200 sm:text-base",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);
const blogPaginationPageClass = clsx(
  "min-w-12 border-border/80 bg-background/94 text-foreground hover:border-primary/35 hover:bg-muted/35",
  "dark:bg-background/70 dark:hover:bg-muted/20",
);
const blogPaginationCurrentPageClass = clsx(
  "min-w-12 border-foreground bg-foreground text-background shadow-[0_10px_24px_rgba(15,23,42,0.18)]",
  "dark:border-foreground dark:bg-foreground dark:text-background",
);
const blogPaginationControlClass = clsx(
  "min-w-[7.5rem] border-border/80 bg-background/94 text-foreground hover:border-primary/35 hover:bg-muted/35",
  "dark:bg-background/70 dark:hover:bg-muted/20",
);
const blogPaginationDisabledClass = clsx(
  "border-border/60 bg-background/55 text-foreground/38",
  "dark:bg-background/35 dark:text-muted-foreground/55",
);
const blogPaginationEllipsisClass = clsx(
  "min-w-12 border-border/70 bg-background/70 text-foreground/45",
  "dark:bg-background/45 dark:text-muted-foreground/60",
);
const blogPaginationIconClass = clsx("h-4 w-4 shrink-0");
const blogPaginationLabelClass = clsx("whitespace-nowrap");

function buildPaginationItems(currentPage: number, totalPages: number): BlogPaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => ({
      type: "page" as const,
      page: index + 1,
    }));
  }

  const pages: BlogPaginationItem[] = [];
  const firstPage = 1;
  const lastPage = totalPages;
  const safeCurrentPage = Math.min(Math.max(currentPage, firstPage), lastPage);
  const leftPage = Math.max(firstPage + 1, safeCurrentPage - 2);
  const rightPage = Math.min(lastPage - 1, safeCurrentPage + 2);

  pages.push({ type: "page", page: firstPage });

  if (leftPage > firstPage + 1) {
    pages.push({ type: "ellipsis", key: "left-ellipsis" });
  }

  for (let page = leftPage; page <= rightPage; page += 1) {
    pages.push({ type: "page", page });
  }

  if (rightPage < lastPage - 1) {
    pages.push({ type: "ellipsis", key: "right-ellipsis" });
  }

  pages.push({ type: "page", page: lastPage });

  return pages;
}

function PaginationAction({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

function PaginationDisabled({
  children,
  className,
  ariaLabel,
  ariaCurrent,
  ariaDisabled = true,
}: {
  children: ReactNode;
  className: string;
  ariaLabel?: string;
  ariaCurrent?: "page";
  ariaDisabled?: boolean;
}) {
  return (
    <span
      className={className}
      aria-current={ariaCurrent}
      aria-disabled={ariaDisabled ? "true" : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </span>
  );
}

export default function BlogPagination({
  query,
  currentPage,
  totalPages,
  className,
}: BlogPaginationProps) {
  if (totalPages < 1) {
    return null;
  }

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const paginationItems = buildPaginationItems(safeCurrentPage, totalPages);
  const previousPage = safeCurrentPage > 1 ? safeCurrentPage - 1 : null;
  const nextPage = safeCurrentPage < totalPages ? safeCurrentPage + 1 : null;
  const previousHref = previousPage
    ? buildBlogSearchHref({ query, page: previousPage })
    : null;
  const nextHref = nextPage
    ? buildBlogSearchHref({ query, page: nextPage })
    : null;
  const navigateTo = (href: string) => {
    window.location.assign(href);
  };

  return (
    <nav aria-label="Paginação dos posts" className={clsx(blogPaginationRootClass, className)}>
      <ul className={blogPaginationListClass}>
        <li>
          {previousHref ? (
            <PaginationAction className={clsx(blogPaginationBaseClass, blogPaginationControlClass)} onClick={() => navigateTo(previousHref)}>
              <CaretLeftIcon aria-hidden="true" className={blogPaginationIconClass} weight="bold" />
              <span className={blogPaginationLabelClass}>Anterior</span>
            </PaginationAction>
          ) : (
            <PaginationDisabled
              className={clsx(
                blogPaginationBaseClass,
                blogPaginationControlClass,
                blogPaginationDisabledClass,
              )}
            >
              <CaretLeftIcon aria-hidden="true" className={blogPaginationIconClass} weight="bold" />
              <span className={blogPaginationLabelClass}>Anterior</span>
            </PaginationDisabled>
          )}
        </li>

        {paginationItems.map((item) => {
          if (item.type === "ellipsis") {
            return (
              <li key={item.key}>
                <span
                  className={clsx(
                    blogPaginationBaseClass,
                    blogPaginationEllipsisClass,
                    "cursor-default",
                  )}
                  aria-hidden="true"
                >
                  <DotsThreeIcon
                    aria-hidden="true"
                    className={blogPaginationIconClass}
                    weight="bold"
                  />
                </span>
              </li>
            );
          }

          const isCurrentPage = item.page === safeCurrentPage;
          const href = buildBlogSearchHref({ query, page: item.page });
          const pageClassName = clsx(
            blogPaginationBaseClass,
            isCurrentPage ? blogPaginationCurrentPageClass : blogPaginationPageClass,
          );

          return (
            <li key={item.page}>
              {isCurrentPage ? (
                <PaginationDisabled
                  className={pageClassName}
                  ariaCurrent="page"
                  ariaDisabled={false}
                  ariaLabel={`Página ${item.page} atual`}
                >
                  {item.page}
                </PaginationDisabled>
              ) : (
                <PaginationAction className={pageClassName} onClick={() => navigateTo(href)}>
                  {item.page}
                </PaginationAction>
              )}
            </li>
          );
        })}

        <li>
          {nextHref ? (
            <PaginationAction className={clsx(blogPaginationBaseClass, blogPaginationControlClass)} onClick={() => navigateTo(nextHref)}>
              <span className={blogPaginationLabelClass}>Próxima</span>
              <CaretRightIcon aria-hidden="true" className={blogPaginationIconClass} weight="bold" />
            </PaginationAction>
          ) : (
            <PaginationDisabled
              className={clsx(
                blogPaginationBaseClass,
                blogPaginationControlClass,
                blogPaginationDisabledClass,
              )}
            >
              <span className={blogPaginationLabelClass}>Próxima</span>
              <CaretRightIcon aria-hidden="true" className={blogPaginationIconClass} weight="bold" />
            </PaginationDisabled>
          )}
        </li>
      </ul>
    </nav>
  );
}
