import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BlogHero from "@/components/blog/blog-hero";
import { blogHero } from "@/app/blog/content";

const meta = {
  title: "Blog/BlogHero",
  component: BlogHero,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    ...blogHero,
  },
} satisfies Meta<typeof BlogHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <BlogHero
        {...args}
        facts={[
          { label: "Frequência", value: "Semanal" },
          { label: "Formato", value: "Notas curtas" },
          { label: "Foco", value: "Interface e dados" },
        ]}
        actions={[
          {
            label: "Contato",
            href: "/contact",
            variant: "solid",
          },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/bruno-mulim/",
            external: true,
            variant: "outline",
          },
        ]}
      />
    </div>
  ),
};
