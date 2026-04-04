import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BlogPagination from "@/components/blog/blog-pagination";

const meta = {
  title: "Blog/BlogPagination",
  component: BlogPagination,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BlogPagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    query: "",
    currentPage: 1,
    totalPages: 1,
  },
  render: (args) => (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <BlogPagination {...args} />
    </div>
  ),
};

export const MiddlePage: Story = {
  args: {
    query: "layout",
    currentPage: 5,
    totalPages: 12,
  },
  render: (args) => (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <BlogPagination {...args} />
    </div>
  ),
};
