import {
  boolean,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', [ 'SUPER_ADMIN', 'ADMIN', 'USER', ]);

export const userTable = pgTable('users', {
  // 사용자 고유 ID (UUID, PK, 자동 생성)
  id: uuid('id').primaryKey().defaultRandom(),

  // 로그인용 이메일 (UNIQUE, NOT NULL)
  email: varchar('email').notNull().unique(),

  // 사용자 이름 (NOT NULL)
  username: varchar('username').notNull(),

  // 프로필 이미지 URL
  image: varchar('image'),

  // 관리자 소개글
  bio: text('bio'),

  // 소셜 미디어 프로필 링크 (JSON)
  social_links: jsonb('social_links'),

  // 사용자 권한 (`SUPER_ADMIN`, `ADMIN`, `USER` 중 하나, 기본값 'USER')
  role: userRoleEnum('role').default('USER'),

  // 계정 활성화 여부 (기본값 `true`)
  is_active: boolean('is_active').default(true),

  // 마지막 로그인 시각
  last_signed_at: timestamp('last_signed_at'),

  // 생성일 (자동 생성)
  created_at: timestamp('created_at').defaultNow().notNull(),

  // 수정일 (자동 업데이트)
  updated_at: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),

  // 삭제된 시각 (Soft Delete용)
  deleted_at: timestamp('deleted_at'),
});
