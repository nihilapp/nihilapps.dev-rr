import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  type AnyPgColumn
} from 'drizzle-orm/pg-core';

import { blogTable } from '../blogs/blogs.table';
import { postTable } from '../posts/posts.table';

export const commentAuthorTypeEnum = pgEnum('comment_author_type', [
  'ADMIN',
  'VISITOR',
]);
export const commentStatusEnum = pgEnum('comment_status', [
  'PENDING',
  'APPROVED',
  'SPAM',
]);

export const commentTable = pgTable('comments', {
  // 댓글 ID (UUID, PK)
  id: uuid('id').primaryKey().defaultRandom(),

  // 블로그 ID (FK)
  blog_id: uuid('blog_id')
    .notNull()
    .references(() => blogTable.id, { onDelete: 'cascade', }),

  // 포스트 ID (FK)
  post_id: uuid('post_id')
    .notNull()
    .references(() => postTable.id, { onDelete: 'cascade', }),

  // 부모 댓글 ID (Nullable, FK)
  parent_id: uuid('parent_id').references((): AnyPgColumn => commentTable.id, {
    onDelete: 'set null',
  }),

  // ADMIN, VISITOR
  author_type: commentAuthorTypeEnum('author_type').default('VISITOR'),

  // PENDING, APPROVED, SPAM
  status: commentStatusEnum('status').default('PENDING'),

  // 댓글 내용
  content: text('content').notNull(),

  // 방문자 이름
  visitor_name: varchar('visitor_name'),

  // 방문자 이메일
  visitor_email: varchar('visitor_email'),

  // 비밀번호 (해시 처리)
  visitor_hashed_password: varchar('visitor_hashed_password'),

  // 작성일
  created_at: timestamp('created_at').defaultNow().notNull(),

  // 수정일
  updated_at: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),

  // 삭제된 시각 (Soft Delete용)
  deleted_at: timestamp('deleted_at'),
});
