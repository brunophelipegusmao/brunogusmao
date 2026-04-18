"use client";

import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";

import { KanbanCard } from "@/components/admin/kanban/kanban-card";
import { KanbanColumn } from "@/components/admin/kanban/kanban-column";
import {
  findCardColumn,
  useKanbanStore,
} from "@/components/admin/kanban/state";
import type {
  KanbanColumnId,
  KanbanPriority,
} from "@/components/admin/kanban/types";
import { RippleButton } from "@/components/magicui/ripple-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function asString(value: unknown): string | null {
  if (typeof value === "string") {
    return value;
  }

  return null;
}

export function KanbanBoard() {
  const columns = useKanbanStore((state) => state.columns);
  const cardsById = useKanbanStore((state) => state.cardsById);
  const cardOrderByColumn = useKanbanStore((state) => state.cardOrderByColumn);
  const moveCard = useKanbanStore((state) => state.moveCard);
  const addCard = useKanbanStore((state) => state.addCard);
  const updateCard = useKanbanStore((state) => state.updateCard);
  const resetBoard = useKanbanStore((state) => state.resetBoard);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<"all" | KanbanPriority>(
    "all",
  );

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState<KanbanPriority>("medium");
  const [newColumnId, setNewColumnId] = useState<KanbanColumnId>("todo");

  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [editingPriority, setEditingPriority] =
    useState<KanbanPriority>("medium");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const totalCards = useMemo(
    () =>
      Object.values(cardOrderByColumn).reduce(
        (total, cardIds) => total + cardIds.length,
        0,
      ),
    [cardOrderByColumn],
  );

  const activeCard = activeCardId ? cardsById[activeCardId] : null;
  const activeCardColumnId = activeCardId
    ? findCardColumn(cardOrderByColumn, activeCardId)
    : null;

  const visibleCardOrderByColumn = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filterByText = (cardId: string) => {
      if (!normalizedSearch) {
        return true;
      }

      const card = cardsById[cardId];
      if (!card) {
        return false;
      }

      return (
        card.title.toLowerCase().includes(normalizedSearch) ||
        card.description?.toLowerCase().includes(normalizedSearch)
      );
    };

    const filterByPriority = (cardId: string) => {
      if (priorityFilter === "all") {
        return true;
      }

      const card = cardsById[cardId];
      return card ? card.priority === priorityFilter : false;
    };

    return {
      todo: cardOrderByColumn.todo.filter(
        (cardId) => filterByText(cardId) && filterByPriority(cardId),
      ),
      doing: cardOrderByColumn.doing.filter(
        (cardId) => filterByText(cardId) && filterByPriority(cardId),
      ),
      review: cardOrderByColumn.review.filter(
        (cardId) => filterByText(cardId) && filterByPriority(cardId),
      ),
      done: cardOrderByColumn.done.filter(
        (cardId) => filterByText(cardId) && filterByPriority(cardId),
      ),
    };
  }, [cardOrderByColumn, cardsById, searchTerm, priorityFilter]);

  const isFiltering = searchTerm.trim().length > 0 || priorityFilter !== "all";

  function resolveTargetColumnId(overId: string): KanbanColumnId | null {
    if (columns.some((column) => column.id === overId)) {
      return overId as KanbanColumnId;
    }

    return findCardColumn(cardOrderByColumn, overId);
  }

  function resolveInsertionIndex(
    targetColumnId: KanbanColumnId,
    overId: string,
  ): number {
    const targetCardIds = cardOrderByColumn[targetColumnId];

    if (columns.some((column) => column.id === overId)) {
      return targetCardIds.length;
    }

    const overIndex = targetCardIds.indexOf(overId);
    return overIndex >= 0 ? overIndex : targetCardIds.length;
  }

  function handleCrossColumnMove(event: DragOverEvent) {
    const activeId = asString(event.active.id);
    const overId = event.over ? asString(event.over.id) : null;

    if (!activeId || !overId) {
      return;
    }

    const sourceColumnId = findCardColumn(cardOrderByColumn, activeId);
    const targetColumnId = resolveTargetColumnId(overId);

    if (
      !sourceColumnId ||
      !targetColumnId ||
      sourceColumnId === targetColumnId
    ) {
      return;
    }

    const insertionIndex = resolveInsertionIndex(targetColumnId, overId);
    const result = moveCard({
      cardId: activeId,
      toColumnId: targetColumnId,
      toIndex: insertionIndex,
    });

    if (!result.ok && result.reason) {
      setFeedbackMessage(result.reason);
    }
  }

  function handleDrop(event: DragEndEvent) {
    const activeId = asString(event.active.id);
    const overId = event.over ? asString(event.over.id) : null;

    if (!activeId || !overId) {
      setActiveCardId(null);
      return;
    }

    const sourceColumnId = findCardColumn(cardOrderByColumn, activeId);
    const targetColumnId = resolveTargetColumnId(overId);

    if (!sourceColumnId || !targetColumnId) {
      setActiveCardId(null);
      return;
    }

    const insertionIndex = resolveInsertionIndex(targetColumnId, overId);
    const result = moveCard({
      cardId: activeId,
      toColumnId: targetColumnId,
      toIndex: insertionIndex,
    });

    if (!result.ok && result.reason) {
      setFeedbackMessage(result.reason);
    }

    setActiveCardId(null);
  }

  function handleStartEdit(cardId: string) {
    const card = cardsById[cardId];

    if (!card) {
      return;
    }

    setEditingCardId(card.id);
    setEditingTitle(card.title);
    setEditingDescription(card.description ?? "");
    setEditingPriority(card.priority);
  }

  function handleCreateCard(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = addCard({
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      columnId: newColumnId,
    });

    if (!result.ok) {
      setFeedbackMessage(result.reason ?? "Nao foi possivel criar o card.");
      return;
    }

    setNewTitle("");
    setNewDescription("");
    setNewPriority("medium");
    setNewColumnId("todo");
    setIsCreateModalOpen(false);
    setFeedbackMessage("Card criado com sucesso.");
  }

  function handleSaveEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingCardId) {
      return;
    }

    const result = updateCard({
      id: editingCardId,
      title: editingTitle,
      description: editingDescription,
      priority: editingPriority,
    });

    if (!result.ok) {
      setFeedbackMessage(result.reason ?? "Nao foi possivel atualizar o card.");
      return;
    }

    setEditingCardId(null);
    setFeedbackMessage("Card atualizado com sucesso.");
  }

  useEffect(() => {
    if (!feedbackMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setFeedbackMessage(null);
    }, 2200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [feedbackMessage]);

  return (
    <section className="kanban-board">
      <header className="kanban-board__header">
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-text-muted">
            Fluxo visual
          </p>
          <p className="mt-2 font-goldman text-2xl leading-[0.9] tracking-[-0.02em] text-text-primary sm:text-3xl">
            {totalCards} cards ativos no quadro
          </p>
        </div>

        <div className="kanban-actions">
          <Button
            type="button"
            variant="outline"
            onClick={resetBoard}
            className="kanban-reset-button"
          >
            Resetar board
          </Button>

          <RippleButton
            type="button"
            onClick={() => {
              setIsCreateModalOpen(true);
            }}
            className="kanban-add-button"
          >
            Novo card
          </RippleButton>
        </div>
      </header>

      <div className="kanban-toolbar">
        <div className="kanban-filterbar">
          <input
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            placeholder="Buscar..."
            className="kanban-filterbar__search"
            aria-label="Buscar cards"
          />

          <select
            value={priorityFilter}
            onChange={(event) => {
              setPriorityFilter(event.target.value as "all" | KanbanPriority);
            }}
            className="kanban-filterbar__select"
            aria-label="Filtrar por prioridade"
          >
            <option value="all">Todas</option>
            <option value="low">Baixa</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>

          {isFiltering ? (
            <button
              type="button"
              className="kanban-filterbar__clear"
              onClick={() => {
                setSearchTerm("");
                setPriorityFilter("all");
              }}
            >
              Limpar
            </button>
          ) : null}

          {isFiltering ? (
            <span className="kanban-filters__hint">
              Drag off com filtro ativo
            </span>
          ) : null}
        </div>

        {editingCardId ? (
          <form
            className="kanban-form kanban-form--edit"
            onSubmit={handleSaveEdit}
          >
            <p className="kanban-form__title">Editar card</p>

            <label className="kanban-field">
              <span>Titulo</span>
              <input
                value={editingTitle}
                onChange={(event) => {
                  setEditingTitle(event.target.value);
                }}
                required
              />
            </label>

            <label className="kanban-field">
              <span>Descricao</span>
              <textarea
                value={editingDescription}
                onChange={(event) => {
                  setEditingDescription(event.target.value);
                }}
                rows={3}
              />
            </label>

            <label className="kanban-field">
              <span>Prioridade</span>
              <select
                value={editingPriority}
                onChange={(event) => {
                  setEditingPriority(event.target.value as KanbanPriority);
                }}
              >
                <option value="low">Baixa</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </label>

            <div className="kanban-form__actions">
              <RippleButton type="submit">Salvar</RippleButton>
              <button
                type="button"
                className="kanban-ghost-button"
                onClick={() => {
                  setEditingCardId(null);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : null}
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="kanban-dialog">
          <DialogHeader>
            <DialogTitle className="font-goldman text-2xl leading-none tracking-[-0.02em] text-text-primary">
              Novo card
            </DialogTitle>
            <DialogDescription className="text-sm text-text-secondary">
              Crie uma tarefa e envie para a coluna desejada do fluxo.
            </DialogDescription>
          </DialogHeader>

          <form className="kanban-form" onSubmit={handleCreateCard}>
            <label className="kanban-field">
              <span>Titulo</span>
              <input
                value={newTitle}
                onChange={(event) => {
                  setNewTitle(event.target.value);
                }}
                placeholder="Ex: Publicar artigo da sprint"
                required
              />
            </label>

            <label className="kanban-field">
              <span>Descricao</span>
              <textarea
                value={newDescription}
                onChange={(event) => {
                  setNewDescription(event.target.value);
                }}
                rows={3}
                placeholder="Detalhes opcionais da tarefa"
              />
            </label>

            <div className="kanban-form__row">
              <label className="kanban-field">
                <span>Prioridade</span>
                <select
                  value={newPriority}
                  onChange={(event) => {
                    setNewPriority(event.target.value as KanbanPriority);
                  }}
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
              </label>

              <label className="kanban-field">
                <span>Coluna</span>
                <select
                  value={newColumnId}
                  onChange={(event) => {
                    setNewColumnId(event.target.value as KanbanColumnId);
                  }}
                >
                  {columns.map((column) => (
                    <option key={column.id} value={column.id}>
                      {column.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="kanban-form__actions">
              <RippleButton type="submit">Criar card</RippleButton>
              <button
                type="button"
                className="kanban-ghost-button"
                onClick={() => {
                  setIsCreateModalOpen(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {feedbackMessage ? (
        <output className="kanban-alert" aria-live="polite">
          {feedbackMessage}
        </output>
      ) : null}

      {isFiltering ? (
        <div className="kanban-board__grid">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              cardIds={visibleCardOrderByColumn[column.id]}
              cardsById={cardsById}
              onEditCard={handleStartEdit}
            />
          ))}
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={(event: DragStartEvent) => {
            const activeId = asString(event.active.id);
            setActiveCardId(activeId);
          }}
          onDragOver={handleCrossColumnMove}
          onDragEnd={handleDrop}
          onDragCancel={() => {
            setActiveCardId(null);
          }}
        >
          <div className="kanban-board__grid">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                cardIds={cardOrderByColumn[column.id]}
                cardsById={cardsById}
                onEditCard={handleStartEdit}
              />
            ))}
          </div>

          <DragOverlay>
            {activeCard && activeCardColumnId ? (
              <div className="w-[320px] max-w-[86vw]">
                <KanbanCard card={activeCard} columnId={activeCardColumnId} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </section>
  );
}
