import type { Metadata } from "next";

import BlogEntriesSection from "@/components/blog/blog-entries-section";
import BlogHero from "@/components/blog/blog-hero";
import BlogSearchBar from "@/components/blog/blog-search-bar";
import {
  BLOG_PAGE_SIZE_DEFAULT,
  blogEntriesSection,
  blogPosts,
  blogHero,
  buildBlogSearchHref,
  filterBlogEntries,
  normalizeBlogPageNumber,
  paginateBlogEntries,
} from "./content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notas editoriais de Bruno Gusmão sobre interface, dados, conteúdo e comunicação. Busque por tema e leia as notas.",
};

const blogPageClass = "flex w-full flex-1 flex-col gap-8 py-4 sm:gap-10 sm:py-6 lg:py-8";

type BlogPageSearchParams = Promise<{
  q?: string | string[];
  page?: string | string[];
}>;

function getParamValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: BlogPageSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const query = getParamValue(resolvedSearchParams.q).trim();
  const page = normalizeBlogPageNumber(getParamValue(resolvedSearchParams.page));
  const perPage = BLOG_PAGE_SIZE_DEFAULT;
  const filteredEntries = filterBlogEntries({ query });
  const pagination = paginateBlogEntries(filteredEntries, { page, perPage });

  return (
    <main className={blogPageClass}>
      <BlogHero {...blogHero} />

      <BlogSearchBar query={query} totalPublishedPosts={blogPosts.length} />

      <BlogEntriesSection
        {...blogEntriesSection}
        description="Os textos abaixo continuam em fluxo contínuo. Use a busca acima para chegar mais rápido ao que importa."
        entries={pagination.entries}
        query={query}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        emptyStateTitle="Nada corresponde à busca atual"
        emptyStateDescription="Tente outro termo de busca ou volte para a lista completa de notas."
        emptyStateActionLabel="Limpar busca"
        emptyStateActionHref={buildBlogSearchHref({ page: 1 })}
      />
    </main>
  );
}
