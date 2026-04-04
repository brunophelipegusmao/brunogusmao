import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BlogSearchBar from "@/components/blog/blog-search-bar";
import { blogEntries } from "@/app/blog/content";

const meta = {
  title: "Blog/BlogSearchBar",
  component: BlogSearchBar,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    totalPublishedPosts: blogEntries.length,
  },
} satisfies Meta<typeof BlogSearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyQuery: Story = {
  args: {
    query: "",
  },
  render: (args) => (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <BlogSearchBar {...args} />
    </div>
  ),
};

export const WithQuery: Story = {
  args: {
    query: "layout",
  },
  render: (args) => (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <BlogSearchBar {...args} />
    </div>
  ),
};
