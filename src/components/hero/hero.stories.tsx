import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Container from "@/components/container";
import Hero from "@/components/hero/hero";

const meta = {
  title: "Hero/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <Container>
      <Hero />
    </Container>
  ),
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
