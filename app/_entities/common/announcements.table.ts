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
  id: uuid().primaryKey().defaultRandom(),

  // 블로그 ID (FK)
  blog_id: uuid()
    .notNull()
    .references(() => blogTable.id, { onDelete: 'cascade', }),

  // 공지 제목
  title: varchar().notNull(),

  // 공지 내용
  content: text().notNull(),

  // 상단 고정 여부
  is_pinned: boolean().default(false),

  // 생성일
  created_at: timestamp().defaultNow().notNull(),

  // 수정일
  updated_at: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),

  // 삭제된 시각 (Soft Delete용)
  deleted_at: timestamp(),
});
