import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { InputText } from "@/components/inputText";

const meta = {
  title: "Components/InputText",
  component: InputText,
  parameters: {
    layout: "centered",
  },
  args: {
    id: "input-text-story",
    labelText: "Nome",
    placeholder: "Digite seu nome",
  },
} satisfies Meta<typeof InputText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-sm p-6">
      <InputText {...args} />
    </div>
  ),
};

export const Ghost: Story = {
  args: {
    id: "input-text-story-ghost",
    labelText: "E-mail",
    placeholder: "nome@exemplo.com",
    variant: "ghost",
  },
  render: (args) => (
    <div className="w-full max-w-sm p-6">
      <InputText {...args} />
    </div>
  ),
};
