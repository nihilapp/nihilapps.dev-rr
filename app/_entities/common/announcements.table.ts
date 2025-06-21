import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

import { blogTable } from '../blogs/blogs.table';

export const announcementTable = pgTable('announcements', {
  // 공지 ID (UUID, PK)
  id: uuid('id').primaryKey().defaultRandom(),

  // 블로그 ID (FK)
  blog_id: uuid('blog_id')
    .notNull()
    .references(() => blogTable.id, { onDelete: 'cascade', }),

  // 공지 제목
  title: varchar('title').notNull(),

  // 공지 내용
  content: text('content').notNull(),

  // 상단 고정 여부
  is_pinned: boolean('is_pinned').default(false),

  // 생성일
  created_at: timestamp('created_at').defaultNow().notNull(),

  // 수정일
  updated_at: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),

  // 삭제된 시각 (Soft Delete용)
  deleted_at: timestamp('deleted_at'),
});
