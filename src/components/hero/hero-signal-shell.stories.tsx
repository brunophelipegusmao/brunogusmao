import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import HeroSignalShell from "@/components/hero/hero-signal-shell";

const meta = {
  title: "Hero/HeroSignalShell",
  component: HeroSignalShell,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeroSignalShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex min-h-[40rem] items-center justify-center p-4">
      <HeroSignalShell />
    </div>
  ),
};
