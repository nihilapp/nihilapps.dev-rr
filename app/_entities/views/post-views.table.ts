import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { blogTable } from '../blogs/blogs.table';
import { postTable } from '../posts/posts.table';

export const viewTable = pgTable('post_views', {
  // 조회 기록 ID (UUID, PK)
  id: uuid('id').primaryKey().defaultRandom(),

  // 블로그 ID (FK)
  blog_id: uuid('blog_id')
    .notNull()
    .references(() => blogTable.id, { onDelete: 'cascade', }),

  // 포스트 ID (FK)
  post_id: uuid('post_id')
    .notNull()
    .references(() => postTable.id, { onDelete: 'cascade', }),

  // 고유 방문자 식별자 (e.g., UUID)
  visitor_id: uuid('visitor_id').notNull(),

  // 브라우저 정보
  user_agent: varchar('user_agent'),

  // 조회 시각
  viewed_at: timestamp('viewed_at').defaultNow().notNull(),
});
