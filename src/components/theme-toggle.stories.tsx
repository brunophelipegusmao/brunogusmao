import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ThemeToggle from "@/components/theme-toggle";

const meta = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex min-h-40 items-center justify-center p-8">
      <ThemeToggle {...args} />
    </div>
  ),
};
