import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BlogEntriesSection from "@/components/blog/blog-entries-section";
import BlogHero from "@/components/blog/blog-hero";
import BlogSearchBar from "@/components/blog/blog-search-bar";
import {
  BLOG_PAGE_SIZE_DEFAULT,
  blogEntries,
  blogEntriesSection,
  blogHero,
  blogPosts,
  filterBlogEntries,
  paginateBlogEntries,
} from "@/app/blog/content";

function BlogPagePreview() {
  const query = "";
  const filteredEntries = filterBlogEntries({ query });
  const pagination = paginateBlogEntries(filteredEntries, {
    page: 1,
    perPage: BLOG_PAGE_SIZE_DEFAULT,
  });

  return (
    <main className="flex w-full flex-1 flex-col gap-8 py-4 sm:gap-10 sm:py-6 lg:py-8">
      <BlogHero
        {...blogHero}
        facts={[
          { label: "Total", value: `${blogPosts.length} rascunhos` },
          { label: "Formato", value: "Notas curtas" },
          { label: "Foco", value: "Interface e dados" },
        ]}
      />

      <BlogSearchBar query={query} totalPublishedPosts={blogEntries.length} />

      <BlogEntriesSection
        {...blogEntriesSection}
        description="Os textos abaixo continuam em fluxo contínuo. Use a busca acima para chegar mais rápido ao que importa."
        entries={pagination.entries}
        query={query}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    </main>
  );
}

const meta = {
  title: "App/Blog",
  component: BlogPagePreview,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BlogPagePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <BlogPagePreview />,
};
