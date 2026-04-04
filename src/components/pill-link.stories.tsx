import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PillLink from "@/components/pill-link";

const meta = {
  title: "Components/PillLink",
  component: PillLink,
  parameters: {
    layout: "centered",
  },
  args: {
    href: "/contact",
    children: "Saiba mais",
  },
} satisfies Meta<typeof PillLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outline: Story = {};

export const Solid: Story = {
  args: {
    variant: "solid",
    children: "Falar comigo",
  },
};

export const External: Story = {
  args: {
    href: "https://www.linkedin.com/in/bruno-mulim/",
    external: true,
    children: "LinkedIn",
  },
};
