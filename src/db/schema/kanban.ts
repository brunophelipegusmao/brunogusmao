import { sql } from 'drizzle-orm';
import {
   check,
   integer,
   pgEnum,
   pgTable,
   text,
   timestamp,
   unique,
   varchar,
} from 'drizzle-orm/pg-core';

export const kanbanPriorityEnum = pgEnum('kanban_priority', [
   'low',
   'medium',
   'high',
]);

export const kanbanColumns = pgTable(
   'kanban_columns',
   {
      id: varchar('id', { length: 32 }).primaryKey(),
      title: varchar('title', { length: 120 }).notNull(),
      position: integer('position').notNull(),
      wipLimit: integer('wip_limit').notNull(),
      createdAt: timestamp('created_at').defaultNow().notNull(),
      updatedAt: timestamp('updated_at').defaultNow().notNull(),
   },
   table => [
      unique('kanban_columns_position_unique').on(table.position),
      check('kanban_columns_wip_limit_check', sql`${table.wipLimit} >= 1`),
   ],
);

export const kanbanCards = pgTable(
   'kanban_cards',
   {
      id: varchar('id', { length: 64 }).primaryKey(),
      columnId: varchar('column_id', { length: 32 })
         .notNull()
         .references(() => kanbanColumns.id, { onDelete: 'cascade' }),
      title: varchar('title', { length: 255 }).notNull(),
      description: text('description'),
      priority: kanbanPriorityEnum('priority').notNull().default('medium'),
      position: integer('position').notNull(),
      createdAt: timestamp('created_at').defaultNow().notNull(),
      updatedAt: timestamp('updated_at').defaultNow().notNull(),
   },
   table => [
      unique('kanban_cards_column_id_position_unique').on(
         table.columnId,
         table.position,
      ),
      check(
         'kanban_cards_title_not_empty_check',
         sql`char_length(${table.title}) > 0`,
      ),
   ],
);
