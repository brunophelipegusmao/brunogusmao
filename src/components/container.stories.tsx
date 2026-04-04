import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Container from "@/components/container";

const meta = {
  title: "Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: null,
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container>
      <section className="space-y-4 rounded-[2rem] border border-border/70 bg-background/90 p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Container
        </p>
        <h1 className="font-heading text-4xl tracking-[-0.06em] text-foreground">
          Estrutura da página
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          Este container mantém largura, respiro e ritmo consistentes entre as
          páginas do projeto.
        </p>
      </section>
    </Container>
  ),
};
