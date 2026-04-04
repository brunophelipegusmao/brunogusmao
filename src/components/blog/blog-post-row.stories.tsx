import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BlogPostCard from "@/components/blog/blog-post-row";
import { blogEntries } from "@/app/blog/content";

const sampleEntry = blogEntries[0];

const meta = {
  title: "Blog/BlogPostRow",
  component: BlogPostCard,
  parameters: {
    layout: "centered",
  },
  args: {
    ...sampleEntry,
  },
} satisfies Meta<typeof BlogPostCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Linked: Story = {
  render: (args) => (
    <div className="w-full max-w-sm p-4">
      <BlogPostCard {...args} />
    </div>
  ),
};

export const Static: Story = {
  args: {
    href: undefined,
  },
  render: (args) => (
    <div className="w-full max-w-sm p-4">
      <BlogPostCard {...args} />
    </div>
  ),
};
