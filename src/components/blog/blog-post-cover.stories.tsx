import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BlogPostCover from "@/components/blog/blog-post-cover";

const meta = {
  title: "Blog/BlogPostCover",
  component: BlogPostCover,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    category: "Interface",
  },
} satisfies Meta<typeof BlogPostCover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <BlogPostCover {...args} />
    </div>
  ),
};
