import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { blogTable } from './blogs.table';

export const blogSettingTable = pgTable('blog_settings', {
  // 설정 ID (UUID, PK)
  id: uuid().primaryKey().defaultRandom(),

  // 블로그 ID (FK)
  blog_id: uuid()
    .notNull()
    .references(() => blogTable.id, { onDelete: 'cascade', }),

  // 설정 키
  key: varchar().notNull(),

  // 설정 값
  value: text(),

  // 마지막 수정일
  updated_at: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
