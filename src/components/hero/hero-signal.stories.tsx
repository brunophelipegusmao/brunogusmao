import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import HeroSignal from "@/components/hero/hero-signal";

const meta = {
  title: "Hero/HeroSignal",
  component: HeroSignal,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeroSignal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex min-h-[40rem] items-center justify-center p-4">
      <HeroSignal />
    </div>
  ),
};
