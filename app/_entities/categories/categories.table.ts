import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  unique,
  type AnyPgColumn
} from 'drizzle-orm/pg-core';

import { blogTable } from '../blogs/blogs.table';

export const categoryTable = pgTable(
  'categories',
  {
    // 카테고리 ID (UUID, PK)
    id: uuid().primaryKey().defaultRandom(),

    // 블로그 ID (FK)
    blog_id: uuid()
      .notNull()
      .references(() => blogTable.id, { onDelete: 'cascade', }),

    // 상위 카테고리 ID (Nullable, 자기참조 FK)
    parent_id: uuid().references(
      (): AnyPgColumn => categoryTable.id,
      {
        onDelete: 'set null',
      }
    ),

    // 카테고리 이름 (`blog_id`, `parent_id`와 함께 UNIQUE)
    name: varchar().notNull(),

    // 카테고리 슬러그 (`blog_id`와 함께 UNIQUE)
    slug: varchar().notNull(),

    // 생성일
    created_at: timestamp().defaultNow().notNull(),

    // 수정일
    updated_at: timestamp()
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),

    // 삭제된 시각 (Soft Delete용)
    deleted_at: timestamp(),
  },
  (table) => {
    return {
      blogCategoryNameKey: unique('blog_category_name_key').on(
        table.blog_id,
        table.parent_id,
        table.name
      ),
      blogCategorySlugKey: unique('blog_category_slug_key').on(
        table.blog_id,
        table.slug
      ),
    };
  }
);
