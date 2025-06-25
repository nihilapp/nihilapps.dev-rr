import { pgTable, timestamp, uuid, primaryKey } from 'drizzle-orm/pg-core';

import { blogTable } from '@/_entities/blogs/blogs.table';
import { postTable } from '@/_entities/posts/posts.table';

export const postLikeTable = pgTable(
  'post_likes',
  {
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
  },
  (table) => [ primaryKey({ columns: [ table.visitor_id, table.post_id, ], }), ]
);
