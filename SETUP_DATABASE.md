# Database Setup Guide

## Phase 2 Completion Status

✅ Drizzle ORM + Neon PostgreSQL infrastructure complete:

- `drizzle.config.ts` - Master configuration
- `src/db/schema/users.ts` - Users table schema
- `src/db/schema/index.ts` - Schema exports
- `src/db/index.ts` - Database client initialization

## Next Steps

### 1. Configure Environment Variables

Create `.env.local` file in the project root with your Neon database connection
string:

```bash
# Copy from .env.local.example
cp .env.local.example .env.local
```

Then edit `.env.local` and replace the placeholder with your actual connection
string:

```env
DATABASE_URL=postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

**Where to get the connection string:**

1. Go to [Neon Console](https://console.neon.tech)
2. Navigate to your project
3. Find the connection string (looks like:
   `postgresql://neondb_owner:AbCdEfGhIjKlMnOp@ep-cool-wind-123456.us-east-1.neon.tech/neondb?sslmode=require`)
4. Paste it into `.env.local`

### 2. Generate Database Migrations

Once `.env.local` is set up, generate SQL migrations from your schema:

```bash
pnpm drizzle-kit generate:pg
```

This will:

- Scan `src/db/schema/` directory
- Discover the users table definition
- Create SQL migration files in `src/db/migrations/`
- Generate migration metadata

### 3. Apply Migrations to Neon

Apply the migrations to your Neon database:

```bash
pnpm drizzle-kit migrate
```

This will:

- Connect to Neon using DATABASE_URL
- Execute all pending migrations
- Create the `users` table in your database
- Update migration tracking metadata

### 4. Verify Setup

Check that everything is working:

```bash
# List all tables (should show 'users')
pnpm drizzle-kit introspect:pg
```

## Using the Database Client

After setup is complete, use the database client in your application:

```typescript
import { db } from '@/db';
import { users } from '@/db/schema';

// Example: Get all users
const allUsers = await db.select().from(users);

// Example: Get user by email
const user = await db
   .select()
   .from(users)
   .where(eq(users.email, 'example@test.com'));

// Example: Create new user
const newUser = await db
   .insert(users)
   .values({
      email: 'user@example.com',
      passwordHash: 'hashed_password',
      role: 'user',
   })
   .returning();
```

## Troubleshooting

**Error: "DATABASE_URL environment variable is not set"**

- Solution: Create `.env.local` with a valid Neon connection string

**Error: "connection refused"**

- Solution: Check DATABASE_URL format and ensure Neon database is running

**Error: "relation 'users' does not exist"**

- Solution: Run `pnpm drizzle-kit migrate` to apply pending migrations

## Adding More Tables

To add more tables to your schema:

1. Create new file in `src/db/schema/` (e.g., `posts.ts`)
2. Define table using Drizzle ORM
3. Export it from `src/db/schema/index.ts`:
   ```typescript
   export * from './users';
   export * from './posts'; // <- Add new export
   ```
4. Run `pnpm drizzle-kit generate:pg` to create migration
5. Run `pnpm drizzle-kit migrate` to apply migration

## References

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Neon Documentation](https://neon.tech/docs/)
- [PostgreSQL Reference](https://www.postgresql.org/docs/)
