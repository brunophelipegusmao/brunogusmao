import { sql } from 'drizzle-orm';
import {
   check,
   integer,
   pgEnum,
   pgTable,
   primaryKey,
   text,
   timestamp,
   unique,
   uuid,
   varchar,
} from 'drizzle-orm/pg-core';

export const postEditorialStatusEnum = pgEnum('post_editorial_status', [
   'publicado',
   'revisao',
   'em-andamento',
]);

export const postBlockTypeEnum = pgEnum('post_block_type', [
   'paragraph',
   'image',
]);

export const postTagFontStyleEnum = pgEnum('post_tag_font_style', [
   'normal',
   'bold',
   'italic',
   'bold-italic',
]);

export const posts = pgTable('posts', {
   id: uuid('id').primaryKey().defaultRandom(),
   slug: varchar('slug', { length: 255 }).notNull().unique(),
   postIndex: integer('post_index').notNull(),
   title: varchar('title', { length: 255 }).notNull(),
   excerpt: text('excerpt').notNull(),
   category: varchar('category', { length: 120 }).notNull(),
   readingTime: varchar('reading_time', { length: 50 }),
   editorialStatus: postEditorialStatusEnum('editorial_status')
      .notNull()
      .default('em-andamento'),
   publishedAt: timestamp('published_at'),
   coverSrc: text('cover_src'),
   coverAlt: varchar('cover_alt', { length: 255 }),
   createdAt: timestamp('created_at').defaultNow().notNull(),
   updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const postSections = pgTable(
   'post_sections',
   {
      id: uuid('id').primaryKey().defaultRandom(),
      postId: uuid('post_id')
         .notNull()
         .references(() => posts.id, { onDelete: 'cascade' }),
      heading: varchar('heading', { length: 255 }).notNull(),
      position: integer('position').notNull(),
      createdAt: timestamp('created_at').defaultNow().notNull(),
      updatedAt: timestamp('updated_at').defaultNow().notNull(),
   },
   table => [
      unique('post_sections_post_id_position_unique').on(
         table.postId,
         table.position,
      ),
   ],
);

export const postSectionBlocks = pgTable(
   'post_section_blocks',
   {
      id: uuid('id').primaryKey().defaultRandom(),
      sectionId: uuid('section_id')
         .notNull()
         .references(() => postSections.id, { onDelete: 'cascade' }),
      position: integer('position').notNull(),
      type: postBlockTypeEnum('type').notNull(),
      content: text('content'),
      imageSrc: text('image_src'),
      imageAlt: varchar('image_alt', { length: 255 }),
      imageCaption: text('image_caption'),
      createdAt: timestamp('created_at').defaultNow().notNull(),
      updatedAt: timestamp('updated_at').defaultNow().notNull(),
   },
   table => [
      unique('post_section_blocks_section_id_position_unique').on(
         table.sectionId,
         table.position,
      ),
      check(
         'post_section_blocks_paragraph_content_check',
         sql`(
        ${table.type} <> 'paragraph'
        OR ${table.content} IS NOT NULL
      )`,
      ),
      check(
         'post_section_blocks_image_payload_check',
         sql`(
        ${table.type} <> 'image'
        OR (${table.imageSrc} IS NOT NULL AND ${table.imageAlt} IS NOT NULL)
      )`,
      ),
   ],
);

export const postTags = pgTable('post_tags', {
   id: uuid('id').primaryKey().defaultRandom(),
   slug: varchar('slug', { length: 120 }).notNull().unique(),
   label: varchar('label', { length: 120 }).notNull().unique(),
   textColor: varchar('text_color', { length: 32 }).notNull(),
   backgroundColor: varchar('background_color', { length: 32 }).notNull(),
   fontStyle: postTagFontStyleEnum('font_style').notNull().default('normal'),
   createdAt: timestamp('created_at').defaultNow().notNull(),
   updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const postsToTags = pgTable(
   'posts_to_tags',
   {
      postId: uuid('post_id')
         .notNull()
         .references(() => posts.id, { onDelete: 'cascade' }),
      tagId: uuid('tag_id')
         .notNull()
         .references(() => postTags.id, { onDelete: 'cascade' }),
      assignedAt: timestamp('assigned_at').defaultNow().notNull(),
   },
   table => [primaryKey({ columns: [table.postId, table.tagId] })],
);
