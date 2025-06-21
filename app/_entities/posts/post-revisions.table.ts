import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { postTable } from './posts.table';

export const postRevisionTable = pgTable('post_revisions', {
  // 리비전 ID (UUID, PK)
  id: uuid('id').primaryKey().defaultRandom(),

  // 대상 포스트 ID (FK)
  post_id: uuid('post_id')
    .notNull()
    .references(() => postTable.id, { onDelete: 'cascade', }),

  // 수정 당시 제목
  title: varchar('title').notNull(),

  // 수정 당시 내용
  content: text('content'),

  // 이력 생성 시각
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});
