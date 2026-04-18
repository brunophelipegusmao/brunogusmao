export type KanbanColumnId = "todo" | "doing" | "review" | "done";

export type KanbanPriority = "low" | "medium" | "high";

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  priority: KanbanPriority;
}

export interface KanbanColumn {
  id: KanbanColumnId;
  title: string;
  wipLimit: number;
}

export type KanbanCardsById = Record<string, KanbanCard>;

export type KanbanCardOrder = Record<KanbanColumnId, string[]>;

export interface MoveCardArgs {
  cardId: string;
  toColumnId: KanbanColumnId;
  toIndex: number;
}

export interface MoveCardResult {
  ok: boolean;
  reason?: string;
}

export interface AddCardArgs {
  title: string;
  description?: string;
  priority: KanbanPriority;
  columnId: KanbanColumnId;
}

export interface UpdateCardArgs {
  id: string;
  title: string;
  description?: string;
  priority: KanbanPriority;
}
