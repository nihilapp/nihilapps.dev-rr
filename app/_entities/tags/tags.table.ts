import {
  boolean,
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

import { blogTable } from '../blogs/blogs.table';

export const tagTable = pgTable(
  'tags',
  {
    // 태그 ID (UUID, PK)
    id: uuid().primaryKey().defaultRandom(),

    // 블로그 ID (FK)
    blog_id: uuid()
      .notNull()
      .references(() => blogTable.id, { onDelete: 'cascade', }),

    // 태그 이름 (`blog_id`와 함께 UNIQUE)
    name: varchar().notNull(),

    // 대표 태그 여부
    is_featured: boolean().default(false),

    // 생성일
    created_at: timestamp().defaultNow().notNull(),

    // 삭제된 시각 (Soft Delete용)
    deleted_at: timestamp(),
  },
  (table) => {
    return {
      blogTagNameKey: unique('blog_tag_name_key').on(
        table.blog_id,
        table.name
      ),
    };
  }
);
