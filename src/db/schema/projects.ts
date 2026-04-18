import { sql } from 'drizzle-orm';
import {
   check,
   integer,
   pgTable,
   text,
   timestamp,
   unique,
   uuid,
   varchar,
} from 'drizzle-orm/pg-core';

export const projects = pgTable(
   'projects',
   {
      id: uuid('id').primaryKey().defaultRandom(),
      slug: varchar('slug', { length: 255 }).notNull().unique(),
      projectIndex: integer('project_index').notNull(),
      title: varchar('title', { length: 255 }).notNull(),
      description: text('description').notNull(),
      featured: integer('featured').notNull().default(0),
      imageUrl: text('image_url'),
      liveUrl: text('live_url'),
      repoUrl: text('repo_url').notNull(),
      createdAt: timestamp('created_at').defaultNow().notNull(),
      updatedAt: timestamp('updated_at').defaultNow().notNull(),
   },
   table => [
      check('projects_featured_check', sql`${table.featured} IN (0, 1)`),
   ],
);

export const projectStackItems = pgTable(
   'project_stack_items',
   {
      id: uuid('id').primaryKey().defaultRandom(),
      projectId: uuid('project_id')
         .notNull()
         .references(() => projects.id, { onDelete: 'cascade' }),
      label: varchar('label', { length: 120 }).notNull(),
      position: integer('position').notNull(),
      createdAt: timestamp('created_at').defaultNow().notNull(),
      updatedAt: timestamp('updated_at').defaultNow().notNull(),
   },
   table => [
      unique('project_stack_items_project_id_position_unique').on(
         table.projectId,
         table.position,
      ),
   ],
);
