import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BlogEntriesSection from "@/components/blog/blog-entries-section";
import {
  BLOG_PAGE_SIZE_DEFAULT,
  blogEntriesSection,
  filterBlogEntries,
  paginateBlogEntries,
} from "@/app/blog/content";

const meta = {
  title: "Blog/BlogEntriesSection",
  component: BlogEntriesSection,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    ...blogEntriesSection,
  },
} satisfies Meta<typeof BlogEntriesSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Populated: Story = {
  args: {
    entries: [],
    query: "",
    currentPage: 1,
    totalPages: 1,
  },
  render: (args) => {
    const query = "";
    const filteredEntries = filterBlogEntries({ query });
    const pagination = paginateBlogEntries(filteredEntries, {
      page: 1,
      perPage: BLOG_PAGE_SIZE_DEFAULT,
    });

    return (
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <BlogEntriesSection
          {...args}
          description="Os textos abaixo continuam em fluxo contínuo. Use a busca acima para chegar mais rápido ao que importa."
          entries={pagination.entries}
          query={query}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      </div>
    );
  },
};

export const EmptyState: Story = {
  args: {
    entries: [],
    query: "sem resultado",
    currentPage: 1,
    totalPages: 1,
    emptyStateTitle: "Nenhum post encontrado",
    emptyStateDescription:
      "Tente outro termo de busca ou limpe a busca atual.",
  },
  render: (args) => (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <BlogEntriesSection {...args} />
    </div>
  ),
};
