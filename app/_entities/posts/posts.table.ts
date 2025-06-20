import { pgEnum, pgTable, text, timestamp, uuid, type AnyPgColumn } from 'drizzle-orm/pg-core';

import { categoryTable } from '@/_entities/categories';
import { userTable } from '@/_entities/users';

export const postStatus = pgEnum('post_status', [
  'DRAFT',
  'ARCHIVED',
  'PUBLISHED',
]);

export const postType = pgEnum('post_type', [
  'POST',
  'NOTICE',
]);

export const postTable = pgTable('posts', {
  // 아이디
  id: uuid()
    .primaryKey()
    .defaultRandom(),
  // 작성자(유저)
  author: uuid()
    .notNull()
    .references((): AnyPgColumn => userTable.id),
  // 제목
  title: text()
    .notNull(),
  // 내용
  content: text()
    .notNull(),
  // 포스트 상태
  status: postStatus().default('DRAFT'),
  // 포스트 타입
  type: postType().default('POST'),
  // 카테고리 아이디
  category_id: uuid()
    .references((): AnyPgColumn => categoryTable.id)
    .notNull(),
  // 생성일
  created_at: timestamp()
    .defaultNow(),
  // 수정일
  updated_at: timestamp()
    .defaultNow(),
});
