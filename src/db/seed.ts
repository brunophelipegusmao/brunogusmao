import { createHash } from 'node:crypto';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema';
import { createUsersRepository } from './users.repository';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
   throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(databaseUrl);
const db = drizzle(sql, { schema });
const usersRepository = createUsersRepository(db);

interface SeedUser {
   email: string;
   passwordHash: string;
   role: 'admin' | 'user';
}

function buildSeedUsers(): SeedUser[] {
   const adminUsername = process.env.ADMIN_USERNAME?.trim() || 'admin';
   const adminPassword = process.env.ADMIN_PASSWORD?.trim() || 'change-me-now';
   const normalizedUsername = adminUsername.toLowerCase().replace(/\s+/g, '-');

   return [
      {
         email: `${normalizedUsername}@local.dev`,
         passwordHash: createHash('sha256').update(adminPassword).digest('hex'),
         role: 'admin',
      },
   ];
}

async function upsertUsers(seedUsers: SeedUser[]): Promise<number> {
   let changedRows = 0;

   for (const seedUser of seedUsers) {
      await usersRepository.upsertByEmail(seedUser);
      changedRows += 1;
   }

   return changedRows;
}

async function runSeed() {
   const seedUsers = buildSeedUsers();
   const changedRows = await upsertUsers(seedUsers);

   console.log(
      `Seed finalizado: ${changedRows} registro(s) processado(s) em users.`,
   );
}

runSeed()
   .then(() => {
      process.exitCode = 0;
   })
   .catch(error => {
      console.error('Falha ao executar seed:', error);
      process.exitCode = 1;
   });
