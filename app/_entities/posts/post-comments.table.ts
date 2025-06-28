import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  type AnyPgColumn
} from 'drizzle-orm/pg-core';

import { blogTable } from '@/_entities/blogs/blogs.table';
import { postTable } from '@/_entities/posts/posts.table';
import { authorTable } from '@/_entities/users/authors.table';

export const postCommentAuthorTypeEnum = pgEnum('post_comment_author_type', [
  'ADMIN', // 관리자(회원)
  'VISITOR', // 방문자(비회원)
]);
export const postCommentStatusEnum = pgEnum('post_comment_status', [
  'PENDING',
  'APPROVED',
  'SPAM',
]);

export const postCommentsTable = pgTable('post_comments', {
  // 댓글 ID (UUID, PK)
  post_comment_id: uuid().primaryKey().defaultRandom(),

  // 블로그 ID (FK)
  blog_id: uuid()
    .notNull()
    .references(() => blogTable.blog_id, { onDelete: 'cascade', }),

  // 포스트 ID (FK)
  post_id: uuid()
    .notNull()
    .references(() => postTable.post_id, { onDelete: 'cascade', }),

  // 작성자 author ID (FK, 관리자/회원일 때만, nullable)
  author_id: uuid().references(() => authorTable.author_id, { onDelete: 'set null', }),

  // ADMIN(관리자/회원), VISITOR(방문자/비회원)
  author_type: postCommentAuthorTypeEnum().default('VISITOR'),

  // PENDING, APPROVED, SPAM
  status: postCommentStatusEnum().default('PENDING'),

  // 댓글 내용
  content: text().notNull(),

  // 방문자 이름
  visitor_name: varchar(),

  // 방문자 이메일
  visitor_email: varchar(),

  // 비밀번호 (해시 처리)
  visitor_hashed_password: varchar(),

  // 작성일
  created_at: timestamp().defaultNow().notNull(),

  // 수정일
  updated_at: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
