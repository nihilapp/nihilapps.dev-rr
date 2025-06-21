import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

import { tagTable } from '../tags/tags.table';

import { postTable } from './posts.table';

export const postTagTable = pgTable(
  'post_tags',
  {
    // 포스트 ID (FK)
    post_id: uuid('post_id')
      .notNull()
      .references(() => postTable.id, { onDelete: 'cascade', }),
    // 태그 ID (FK)
    tag_id: uuid('tag_id')
      .notNull()
      .references(() => tagTable.id, { onDelete: 'cascade', }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [ table.post_id, table.tag_id, ], }),
    };
  }
);
