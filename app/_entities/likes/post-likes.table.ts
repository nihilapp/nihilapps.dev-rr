import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { blogTable } from '../blogs/blogs.table';
import { postTable } from '../posts/posts.table';

export const likeTable = pgTable('post_likes', {
  // 좋아요 기록 ID (UUID, PK)
  id: uuid().primaryKey().defaultRandom(),

  // 블로그 ID (FK)
  blog_id: uuid()
    .notNull()
    .references(() => blogTable.id, { onDelete: 'cascade', }),

  // 포스트 ID (FK)
  post_id: uuid()
    .notNull()
    .references(() => postTable.id, { onDelete: 'cascade', }),

  // 고유 방문자 식별자
  visitor_id: uuid().notNull(),

  // 좋아요 시각
  liked_at: timestamp().defaultNow().notNull(),
});
