import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Header from "@/components/header";

const meta = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-6xl p-4 sm:p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/",
      },
    },
  },
};

export const About: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/about",
      },
    },
  },
};

export const Blog: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/blog",
      },
    },
  },
};

export const Contact: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/contact",
      },
    },
  },
};
