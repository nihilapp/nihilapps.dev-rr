import { pgTable, timestamp, uuid, varchar, primaryKey } from 'drizzle-orm/pg-core';

import { blogTable } from '@/_entities/blogs/blogs.table';
import { postTable } from '@/_entities/posts/posts.table';

export const postViewTable = pgTable('post_views', {
  // 블로그 ID (FK)
  blog_id: uuid()
    .notNull()
    .references(() => blogTable.blog_id, { onDelete: 'cascade', }),

  // 포스트 ID (FK)
  post_id: uuid()
    .notNull()
    .references(() => postTable.post_id, { onDelete: 'cascade', }),

  // 고유 방문자 식별자 (e.g., UUID)
  visitor_id: uuid().notNull(),

  // 브라우저 정보
  user_agent: varchar(),

  // 조회 시각
  viewed_at: timestamp().defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [ table.visitor_id, table.post_id, ], }),
}));
