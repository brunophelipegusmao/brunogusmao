import type {
  KanbanCardOrder,
  KanbanCardsById,
  KanbanColumn,
} from "@/components/admin/kanban/types";

export const INITIAL_COLUMNS: KanbanColumn[] = [
  { id: "todo", title: "A fazer", wipLimit: 6 },
  { id: "doing", title: "Em progresso", wipLimit: 3 },
  { id: "review", title: "Em revisao", wipLimit: 2 },
  { id: "done", title: "Concluido", wipLimit: 99 },
];

export const INITIAL_CARDS: KanbanCardsById = {
  "task-1": {
    id: "task-1",
    title: "Criar hero da landing de portfolio",
    description: "Ajustar tipografia e hierarquia visual do bloco principal.",
    priority: "high",
  },
  "task-2": {
    id: "task-2",
    title: "Refinar cards da secao de blog",
    description: "Melhorar contraste de metadados e alinhamento do excerpt.",
    priority: "medium",
  },
  "task-3": {
    id: "task-3",
    title: "Testar responsividade do dashboard",
    description: "Validar breakpoints de 640px, 860px e 1100px.",
    priority: "low",
  },
  "task-4": {
    id: "task-4",
    title: "Planejar fluxo de publicacao de posts",
    description: "Definir etapas para draft, revisao e publicacao.",
    priority: "high",
  },
  "task-5": {
    id: "task-5",
    title: "Auditar acessibilidade da navegacao privada",
    description: "Checar foco visivel e ordem de tab para links e botoes.",
    priority: "medium",
  },
};

export const INITIAL_CARD_ORDER: KanbanCardOrder = {
  todo: ["task-1", "task-2"],
  doing: ["task-4"],
  review: ["task-5"],
  done: ["task-3"],
};
