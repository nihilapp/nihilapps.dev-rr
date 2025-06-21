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
    id: uuid('id').primaryKey().defaultRandom(),

    // 블로그 ID (FK)
    blog_id: uuid('blog_id')
      .notNull()
      .references(() => blogTable.id, { onDelete: 'cascade', }),

    // 상위 카테고리 ID (Nullable, 자기참조 FK)
    parent_id: uuid('parent_id').references(
      (): AnyPgColumn => categoryTable.id,
      {
        onDelete: 'set null',
      }
    ),

    // 카테고리 이름 (`blog_id`, `parent_id`와 함께 UNIQUE)
    name: varchar('name').notNull(),

    // 카테고리 슬러그 (`blog_id`와 함께 UNIQUE)
    slug: varchar('slug').notNull(),

    // 생성일
    created_at: timestamp('created_at').defaultNow().notNull(),

    // 수정일
    updated_at: timestamp('updated_at')
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),

    // 삭제된 시각 (Soft Delete용)
    deleted_at: timestamp('deleted_at'),
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
