import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ContactForm from "@/components/contact/contact-form";

const meta = {
  title: "Forms/ContactForm",
  component: ContactForm,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ContactForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="mx-auto min-h-[48rem] max-w-5xl p-4 sm:p-8 lg:p-12">
      <ContactForm />
    </div>
  ),
};
