import { z } from 'zod';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const userRoleSchema = z.enum(['user', 'admin']);

export const postEditorialStatusSchema = z.enum([
   'publicado',
   'revisao',
   'em-andamento',
]);

export const postBlockTypeSchema = z.enum(['paragraph', 'image']);

export const postTagFontStyleSchema = z.enum([
   'normal',
   'bold',
   'italic',
   'bold-italic',
]);

export const kanbanPrioritySchema = z.enum(['low', 'medium', 'high']);

export const kanbanColumnIdSchema = z.enum(['todo', 'doing', 'review', 'done']);

export const uuidSchema = z.string().uuid();
export const nonEmptyStringSchema = z.string().trim().min(1);
export const slugSchema = z.string().trim().min(1).max(255).regex(slugPattern);
export const urlSchema = z.string().url();
export const nullableUrlSchema = urlSchema.nullable();

export const positionSchema = z.coerce.number().int().min(0);
export const positiveIntSchema = z.coerce.number().int().min(1);

export const idParamsSchema = z.object({
   id: uuidSchema,
});

export const slugParamsSchema = z.object({
   slug: slugSchema,
});

export const paginationQuerySchema = z.object({
   page: positiveIntSchema.default(1),
   limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const authLoginPayloadSchema = z.object({
   username: nonEmptyStringSchema.min(3).max(120),
   password: z.string().min(1),
   next: z.string().trim().optional().default('/dashboard'),
});

export type UserRole = z.infer<typeof userRoleSchema>;
export type PostEditorialStatus = z.infer<typeof postEditorialStatusSchema>;
export type PostBlockType = z.infer<typeof postBlockTypeSchema>;
export type PostTagFontStyle = z.infer<typeof postTagFontStyleSchema>;
export type KanbanPriority = z.infer<typeof kanbanPrioritySchema>;
export type KanbanColumnId = z.infer<typeof kanbanColumnIdSchema>;

export type IdParams = z.infer<typeof idParamsSchema>;
export type SlugParams = z.infer<typeof slugParamsSchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export type AuthLoginPayload = z.infer<typeof authLoginPayloadSchema>;
