import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import AboutPage from "@/app/about/page";

const meta = {
  title: "App/About",
  component: AboutPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AboutPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AboutPage />,
};
