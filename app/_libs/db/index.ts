import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// import { UserDB } from '@/_entities/users/users.db';

const client = postgres(
  process.env.DATABASE_URL!,
  { prepare: false, }
);
const drizzleClient = drizzle(client);

export const db = {
  client: drizzleClient,
  // users: UserDB,
} as const;
