import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { postTable } from '@/_entities/posts/posts.table';

export const postRevisionTable = pgTable('post_revisions', {
  // 리비전 ID (UUID, PK)
  post_revision_id: uuid().primaryKey().defaultRandom(),

  // 대상 포스트 ID (FK)
  post_id: uuid()
    .notNull()
    .references(() => postTable.post_id, { onDelete: 'cascade', }),

  // 수정 당시 제목
  title: varchar().notNull(),

  // 수정 당시 내용
  content: text(),

  // 이력 생성 시각
  updated_at: timestamp().defaultNow().notNull(),
});
