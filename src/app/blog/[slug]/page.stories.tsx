import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BlogPostPage from "@/components/blog/blog-post-page";
import {
  blogPosts,
  getBlogPostNavigation,
} from "@/app/blog/content";

const post = blogPosts[8];
const navigation = getBlogPostNavigation(post.slug);

const meta = {
  title: "App/BlogPost",
  component: BlogPostPage,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    post,
    previousPost: navigation?.previousPost ?? null,
    nextPost: navigation?.nextPost ?? null,
  },
} satisfies Meta<typeof BlogPostPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <BlogPostPage {...args} />
    </div>
  ),
};
