import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SpinLoader } from "@/components/spinLoader";

const meta = {
  title: "Components/SpinLoader",
  component: SpinLoader,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SpinLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex min-h-40 items-center justify-center p-8">
      <SpinLoader {...args} />
    </div>
  ),
};
