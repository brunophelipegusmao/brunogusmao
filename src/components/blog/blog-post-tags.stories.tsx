import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BlogPostTags from "@/components/blog/blog-post-tags";

const meta = {
  title: "Blog/BlogPostTags",
  component: BlogPostTags,
  parameters: {
    layout: "centered",
  },
  args: {
    tags: ["Interface", "Hierarquia", "Leitura", "Layout"],
  },
} satisfies Meta<typeof BlogPostTags>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-xl p-4">
      <BlogPostTags {...args} />
    </div>
  ),
};
