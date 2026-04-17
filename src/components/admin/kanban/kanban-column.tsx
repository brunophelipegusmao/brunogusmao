'use client';

import { useDroppable } from '@dnd-kit/core';
import {
   SortableContext,
   verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { KanbanCard } from '@/components/admin/kanban/kanban-card';
import type {
   KanbanCard as KanbanCardType,
   KanbanColumn as KanbanColumnType,
} from '@/components/admin/kanban/types';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
   column: KanbanColumnType;
   cardIds: string[];
   cardsById: Record<string, KanbanCardType>;
   onEditCard?: (cardId: string) => void;
}

export function KanbanColumn({
   column,
   cardIds,
   cardsById,
   onEditCard,
}: KanbanColumnProps) {
   const { setNodeRef, isOver } = useDroppable({
      id: column.id,
      data: {
         type: 'column',
         columnId: column.id,
      },
   });

   return (
      <section
         ref={setNodeRef}
         className={cn('kanban-column', isOver && 'kanban-column--over')}
      >
         <header className='flex items-end justify-between gap-4 border-b border-border/80 pb-3'>
            <div>
               <p className='font-mono text-[0.62rem] uppercase tracking-[0.18em] text-text-muted'>
                  Etapa
               </p>
               <h2 className='mt-1 font-goldman text-2xl leading-[0.92] tracking-[-0.02em] text-text-primary'>
                  {column.title}
               </h2>
            </div>

            <div className='text-right'>
               <p className='font-mono text-[0.62rem] uppercase tracking-[0.18em] text-text-muted'>
                  WIP
               </p>
               <p className='font-mono text-[0.72rem] uppercase tracking-[0.16em] text-blue-base'>
                  {cardIds.length}/{column.wipLimit}
               </p>
            </div>
         </header>

         <SortableContext
            items={cardIds}
            strategy={verticalListSortingStrategy}
         >
            <div className='mt-4 flex min-h-24 flex-col gap-3'>
               {cardIds.length === 0 ? (
                  <div className='rounded-sm border border-dashed border-border-strong/70 px-4 py-6 text-center font-mono text-[0.62rem] uppercase tracking-[0.2em] text-text-muted'>
                     Solte um card aqui
                  </div>
               ) : (
                  cardIds.map(cardId => {
                     const card = cardsById[cardId];

                     if (!card) {
                        return null;
                     }

                     return (
                        <KanbanCard
                           key={card.id}
                           card={card}
                           columnId={column.id}
                           onEdit={onEditCard}
                        />
                     );
                  })
               )}
            </div>
         </SortableContext>
      </section>
   );
}
