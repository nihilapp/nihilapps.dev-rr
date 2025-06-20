import { boolean, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', [ 'SUPER_ADMIN', 'ADMIN', 'USER', ]);

export const userTable = pgTable('users', {
  id: uuid()
    .primaryKey()
    .defaultRandom(),
  email: text()
    .notNull()
    .unique(),
  username: text()
    .notNull(),
  image: text(),
  role: userRole()
    .default('USER'),
  is_active: boolean()
    .default(true),
  last_signed_at: timestamp(),
  created_at: timestamp()
    .defaultNow(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const userAuthTable = pgTable('user_auths', {
  id: uuid()
    .primaryKey()
    .defaultRandom(),
  user_id: uuid()
    .notNull()
    .references(
      () => userTable.id,
      { onDelete: 'cascade', }
    )
    .unique(),
  hashed_password: text(),
  refresh_token: text(),
  created_at: timestamp()
    .defaultNow(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
