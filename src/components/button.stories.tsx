import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost button",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};
