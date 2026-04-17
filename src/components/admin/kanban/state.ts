import { create } from 'zustand';

import type {
   AddCardArgs,
   KanbanCardOrder,
   KanbanCardsById,
   KanbanColumn,
   KanbanColumnId,
   MoveCardArgs,
   MoveCardResult,
   UpdateCardArgs,
} from '@/components/admin/kanban/types';
import {
   getKanbanCardOrder,
   getKanbanCards,
   getKanbanColumns,
} from '@/lib/api/content.client';

const INITIAL_COLUMNS = getKanbanColumns();
const INITIAL_CARDS = getKanbanCards();
const INITIAL_CARD_ORDER = getKanbanCardOrder();

function clampIndex(index: number, max: number) {
   if (index < 0) {
      return 0;
   }

   if (index > max) {
      return max;
   }

   return index;
}

function findColumnByCardId(
   cardOrderByColumn: KanbanCardOrder,
   cardId: string,
): KanbanColumnId | null {
   for (const [columnId, cardIds] of Object.entries(cardOrderByColumn)) {
      if (cardIds.includes(cardId)) {
         return columnId as KanbanColumnId;
      }
   }

   return null;
}

interface KanbanState {
   columns: KanbanColumn[];
   cardsById: KanbanCardsById;
   cardOrderByColumn: KanbanCardOrder;
   resetBoard: () => void;
   moveCard: (args: MoveCardArgs) => MoveCardResult;
   addCard: (args: AddCardArgs) => MoveCardResult;
   updateCard: (args: UpdateCardArgs) => MoveCardResult;
}

export const useKanbanStore = create<KanbanState>((set, get) => ({
   columns: INITIAL_COLUMNS,
   cardsById: INITIAL_CARDS,
   cardOrderByColumn: INITIAL_CARD_ORDER,
   resetBoard: () => {
      set({
         columns: INITIAL_COLUMNS,
         cardsById: INITIAL_CARDS,
         cardOrderByColumn: INITIAL_CARD_ORDER,
      });
   },
   moveCard: ({ cardId, toColumnId, toIndex }) => {
      const state = get();
      const fromColumnId = findColumnByCardId(state.cardOrderByColumn, cardId);

      if (!fromColumnId) {
         return { ok: false, reason: 'Card nao encontrado no board.' };
      }

      const fromCards = state.cardOrderByColumn[fromColumnId];
      const rawFromIndex = fromCards.indexOf(cardId);

      if (rawFromIndex < 0) {
         return { ok: false, reason: 'Posicao de origem invalida.' };
      }

      const targetCards = state.cardOrderByColumn[toColumnId];
      const targetColumn = state.columns.find(
         column => column.id === toColumnId,
      );

      if (!targetColumn) {
         return { ok: false, reason: 'Coluna de destino invalida.' };
      }

      if (
         fromColumnId !== toColumnId &&
         targetCards.length >= targetColumn.wipLimit
      ) {
         return {
            ok: false,
            reason: `Limite WIP de ${targetColumn.wipLimit} atingido em ${targetColumn.title}.`,
         };
      }

      const nextOrderByColumn: KanbanCardOrder = {
         todo: [...state.cardOrderByColumn.todo],
         doing: [...state.cardOrderByColumn.doing],
         review: [...state.cardOrderByColumn.review],
         done: [...state.cardOrderByColumn.done],
      };

      nextOrderByColumn[fromColumnId].splice(rawFromIndex, 1);

      let resolvedTargetIndex = clampIndex(
         toIndex,
         nextOrderByColumn[toColumnId].length,
      );

      if (fromColumnId === toColumnId && rawFromIndex < resolvedTargetIndex) {
         resolvedTargetIndex -= 1;
      }

      nextOrderByColumn[toColumnId].splice(resolvedTargetIndex, 0, cardId);

      set({ cardOrderByColumn: nextOrderByColumn });

      return { ok: true };
   },
   addCard: ({ title, description, priority, columnId }) => {
      const state = get();
      const targetColumn = state.columns.find(column => column.id === columnId);

      if (!targetColumn) {
         return { ok: false, reason: 'Coluna de destino invalida.' };
      }

      if (state.cardOrderByColumn[columnId].length >= targetColumn.wipLimit) {
         return {
            ok: false,
            reason: `Limite WIP de ${targetColumn.wipLimit} atingido em ${targetColumn.title}.`,
         };
      }

      const normalizedTitle = title.trim();
      const normalizedDescription = description?.trim();

      if (!normalizedTitle) {
         return { ok: false, reason: 'Titulo do card e obrigatorio.' };
      }

      const generatedId =
         globalThis.crypto?.randomUUID?.() ?? `task-${Date.now().toString(36)}`;

      const nextCardsById: KanbanCardsById = {
         ...state.cardsById,
         [generatedId]: {
            id: generatedId,
            title: normalizedTitle,
            description: normalizedDescription || undefined,
            priority,
         },
      };

      const nextOrderByColumn: KanbanCardOrder = {
         todo: [...state.cardOrderByColumn.todo],
         doing: [...state.cardOrderByColumn.doing],
         review: [...state.cardOrderByColumn.review],
         done: [...state.cardOrderByColumn.done],
      };

      nextOrderByColumn[columnId].unshift(generatedId);

      set({
         cardsById: nextCardsById,
         cardOrderByColumn: nextOrderByColumn,
      });

      return { ok: true };
   },
   updateCard: ({ id, title, description, priority }) => {
      const state = get();
      const currentCard = state.cardsById[id];

      if (!currentCard) {
         return { ok: false, reason: 'Card nao encontrado para edicao.' };
      }

      const normalizedTitle = title.trim();
      const normalizedDescription = description?.trim();

      if (!normalizedTitle) {
         return { ok: false, reason: 'Titulo do card e obrigatorio.' };
      }

      set({
         cardsById: {
            ...state.cardsById,
            [id]: {
               ...currentCard,
               title: normalizedTitle,
               description: normalizedDescription || undefined,
               priority,
            },
         },
      });

      return { ok: true };
   },
}));

export function findCardColumn(
   cardOrderByColumn: KanbanCardOrder,
   cardId: string,
): KanbanColumnId | null {
   return findColumnByCardId(cardOrderByColumn, cardId);
}
