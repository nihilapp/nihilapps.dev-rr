import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { blogTable } from '../blogs/blogs.table';
import { postTable } from '../posts/posts.table';

export const viewTable = pgTable('post_views', {
  // 조회 기록 ID (UUID, PK)
  id: uuid().primaryKey().defaultRandom(),

  // 블로그 ID (FK)
  blog_id: uuid()
    .notNull()
    .references(() => blogTable.id, { onDelete: 'cascade', }),

  // 포스트 ID (FK)
  post_id: uuid()
    .notNull()
    .references(() => postTable.id, { onDelete: 'cascade', }),

  // 고유 방문자 식별자 (e.g., UUID)
  visitor_id: uuid().notNull(),

  // 브라우저 정보
  user_agent: varchar(),

  // 조회 시각
  viewed_at: timestamp().defaultNow().notNull(),
});
