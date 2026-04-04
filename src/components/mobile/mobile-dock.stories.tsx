import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";

import MobileDock from "@/components/mobile/mobile-dock";

const meta = {
  title: "Layout/MobileDock",
  component: MobileDock,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MobileDock>;

export default meta;

type Story = StoryObj<typeof meta>;

function DockFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-border/70 bg-background/70 p-4 [&>nav]:!flex [&>nav]:!pointer-events-auto">
      {children}
    </div>
  );
}

export const Home: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
  },
  render: () => (
    <DockFrame>
      <MobileDock />
    </DockFrame>
  ),
};

export const About: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/about",
      },
    },
  },
  render: () => (
    <DockFrame>
      <MobileDock />
    </DockFrame>
  ),
};

export const Blog: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/blog",
      },
    },
  },
  render: () => (
    <DockFrame>
      <MobileDock />
    </DockFrame>
  ),
};

export const Contact: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/contact",
      },
    },
  },
  render: () => (
    <DockFrame>
      <MobileDock />
    </DockFrame>
  ),
};
