import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';

import type * as schema from './schema';
import { users } from './schema';

type Database = NeonHttpDatabase<typeof schema>;

export type UserRecord = InferSelectModel<typeof users>;
export type NewUserRecord = InferInsertModel<typeof users>;

export interface UpsertUserByEmailInput {
   email: string;
   passwordHash: string;
   role?: string;
}

export function createUsersRepository(database: Database) {
   async function findByEmail(email: string): Promise<UserRecord | null> {
      const [user] = await database
         .select()
         .from(users)
         .where(eq(users.email, email))
         .limit(1);

      return user ?? null;
   }

   async function findById(id: string): Promise<UserRecord | null> {
      const [user] = await database
         .select()
         .from(users)
         .where(eq(users.id, id))
         .limit(1);

      return user ?? null;
   }

   async function upsertByEmail(
      input: UpsertUserByEmailInput,
   ): Promise<UserRecord> {
      const existing = await findByEmail(input.email);

      if (existing) {
         const [updated] = await database
            .update(users)
            .set({
               passwordHash: input.passwordHash,
               role: input.role ?? existing.role,
               updatedAt: new Date(),
            })
            .where(eq(users.id, existing.id))
            .returning();

         return updated;
      }

      const [created] = await database
         .insert(users)
         .values({
            email: input.email,
            passwordHash: input.passwordHash,
            role: input.role,
         })
         .returning();

      return created;
   }

   return {
      findByEmail,
      findById,
      upsertByEmail,
   };
}
