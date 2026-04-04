import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/button";
import Modal from "@/components/modal";

function ModalPlayground() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-[36rem] flex-col gap-4 p-6">
      <div>
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
      </div>

      <Modal
        open={open}
        onOpenChange={setOpen}
        eyebrow="Preview"
        title="Escolha uma ação"
        description="Este modal mostra o estado aberto e o botão de fechamento."
      >
        <div className="space-y-4 text-sm leading-7 text-foreground/72">
          <p>
            O conteúdo aqui é apenas de demonstração para validar a estrutura,
            a acessibilidade e a animação do componente.
          </p>
          <Button onClick={() => setOpen(false)}>Fechar</Button>
        </div>
      </Modal>
    </div>
  );
}

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    open: true,
    onOpenChange: () => undefined,
    title: "Escolha uma ação",
    children: null,
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ModalPlayground />,
};
