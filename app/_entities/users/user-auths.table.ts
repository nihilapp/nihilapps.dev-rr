import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { userTable } from './users.table';

export const userAuthTable = pgTable('user_auths', {
  // 인증 정보 ID (UUID, PK, 자동 생성)
  id: uuid('id').primaryKey().defaultRandom(),

  // users.id 참조 (FK, UNIQUE, NOT NULL, ON DELETE CASCADE)
  user_id: uuid('user_id')
    .notNull()
    .unique()
    .references(() => userTable.id, { onDelete: 'cascade', }),

  // 해시된 비밀번호
  hashed_password: varchar('hashed_password'),

  // 리프레시 토큰
  refresh_token: text('refresh_token'),

  // 생성일 (자동 생성)
  created_at: timestamp('created_at').defaultNow().notNull(),

  // 수정일 (자동 업데이트)
  updated_at: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),

  // 삭제된 시각 (Soft Delete용)
  deleted_at: timestamp('deleted_at'),
});
