import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SectionHeading from "@/components/section-heading";

const meta = {
  title: "Components/SectionHeading",
  component: SectionHeading,
  parameters: {
    layout: "centered",
  },
  args: {
    eyebrow: "Seção",
    title: "Título da seção",
    description:
      "Uma descrição curta para contextualizar o conteúdo que vem depois.",
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-3xl p-6">
      <SectionHeading {...args} />
    </div>
  ),
};

export const Centered: Story = {
  args: {
    eyebrow: "Centralizado",
    title: "Leitura em foco",
    description:
      "A mesma estrutura com alinhamento central para seções de abertura.",
    align: "center",
  },
  render: (args) => (
    <div className="w-full max-w-3xl p-6">
      <SectionHeading {...args} />
    </div>
  ),
};
