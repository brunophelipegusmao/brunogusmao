import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ResumeModal from "@/components/hero/resume-modal";

const meta = {
  title: "Hero/ResumeModal",
  component: ResumeModal,
  parameters: {
    layout: "centered",
  },
  args: {
    triggerLabel: "Currículo",
  },
} satisfies Meta<typeof ResumeModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex min-h-40 items-center justify-center p-8">
      <ResumeModal {...args} />
    </div>
  ),
};
