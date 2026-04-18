"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type {
  KanbanCard as KanbanCardType,
  KanbanColumnId,
} from "@/components/admin/kanban/types";
import { cn } from "@/lib/utils";

interface KanbanCardProps {
  card: KanbanCardType;
  columnId: KanbanColumnId;
  onEdit?: (cardId: string) => void;
}

function priorityLabel(priority: KanbanCardType["priority"]) {
  if (priority === "high") {
    return "Alta";
  }

  if (priority === "medium") {
    return "Media";
  }

  return "Baixa";
}

export function KanbanCard({ card, columnId, onEdit }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "card",
      columnId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={cn("kanban-card", isDragging && "kanban-card--dragging")}
      {...attributes}
      {...listeners}
    >
      <header className="flex items-center justify-between gap-2">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-blue-base">
          Tarefa
        </p>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.18em]",
              card.priority === "high" && "border-blue-base/60 text-blue-base",
              card.priority === "medium" &&
                "border-border-strong text-text-secondary",
              card.priority === "low" && "border-border text-text-muted",
            )}
          >
            {priorityLabel(card.priority)}
          </span>

          {onEdit ? (
            <button
              type="button"
              className="kanban-card__edit"
              aria-label="Editar card"
              onPointerDown={(event) => {
                event.stopPropagation();
              }}
              onClick={(event) => {
                event.stopPropagation();
                onEdit(card.id);
              }}
            >
              Editar
            </button>
          ) : null}
        </div>
      </header>

      <h3 className="mt-2 font-goldman text-lg leading-[0.95] tracking-[-0.02em] text-text-primary">
        {card.title}
      </h3>

      {card.description ? (
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {card.description}
        </p>
      ) : null}
    </article>
  );
}
