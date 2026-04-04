import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import AdminHome from "@/app/admin/adminHome/page";

const meta = {
  title: "App/AdminHome",
  component: AdminHome,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AdminHome>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AdminHome />,
};
