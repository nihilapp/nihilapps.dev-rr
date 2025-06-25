import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { postCommentsTable } from '@/_entities/posts/post-comments.table';
import { postCommentAuthorTypeEnum } from '@/_entities/posts/post-comments.table';
import { authorTable } from '@/_entities/users/authors.table';

export const postCommentsRepliesTable = pgTable('post_comments_replies', {
  // 답글 ID (UUID, PK)
  id: uuid().primaryKey().defaultRandom(),

  // 부모 댓글 ID (FK)
  comment_id: uuid()
    .notNull()
    .references(() => postCommentsTable.id, { onDelete: 'cascade', }),

  // 작성자 유저 ID (FK, 관리자/회원일 때만, nullable)
  user_id: uuid().references(() => authorTable.author_id, { onDelete: 'set null', }),

  // ADMIN(관리자/회원), VISITOR(방문자/비회원)
  author_type: postCommentAuthorTypeEnum().default('VISITOR'),

  // 답글 작성자 이름
  author_name: varchar(),

  // 답글 작성자 이메일
  author_email: varchar(),

  // 답글 내용
  content: text().notNull(),

  // 비밀번호 (해시 처리, 익명일 경우)
  author_hashed_password: varchar(),

  // 작성일
  created_at: timestamp().defaultNow().notNull(),

  // 수정일
  updated_at: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
