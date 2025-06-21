import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

import { userTable } from '../users/users.table';

export const blogVisibilityEnum = pgEnum('blog_visibility', [ 'PUBLIC', 'PRIVATE', ]);

export const blogTable = pgTable('blogs', {
  // 블로그 고유 ID (UUID, PK)
  id: uuid().primaryKey().defaultRandom(),

  // 블로그 주인 ID (FK, users.id)
  user_id: uuid()
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade', }),

  // 블로그 이름
  name: varchar().notNull(),

  // URL용 고유 슬러그
  slug: varchar().notNull().unique(),

  // 블로그 설명
  description: text(),

  // PUBLIC 또는 PRIVATE
  visibility: blogVisibilityEnum().default('PUBLIC'),

  // JSON 형태의 커스텀 설정
  settings: jsonb(),

  // 생성일
  created_at: timestamp().defaultNow().notNull(),

  // 수정일
  updated_at: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),

  // 삭제된 시각 (Soft Delete용)
  deleted_at: timestamp(),
});
