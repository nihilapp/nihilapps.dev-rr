import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

import { postTable } from '@/_entities/posts/posts.table';
import { tagTable } from '@/_entities/tags/tags.table';

export const postTagTable = pgTable(
  'post_tags',
  {
    // 포스트 ID (FK)
    post_id: uuid()
      .notNull()
      .references(() => postTable.id, { onDelete: 'cascade', }),
    // 태그 ID (FK)
    tag_id: uuid()
      .notNull()
      .references(() => tagTable.id, { onDelete: 'cascade', }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [ table.post_id, table.tag_id, ], }),
    };
  }
);
