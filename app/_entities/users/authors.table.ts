import { pgEnum, pgSchema, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const userTable = pgSchema('auth').table('users', {
  // 유저 ID (UUID, PK)
  id: uuid()
    .primaryKey()
    .defaultRandom(),
});

export const authorRoleEnum = pgEnum('author_role', [
  'USER',
  'ADMIN',
  'SUPER_ADMIN',
]);

export const authorTable = pgTable('authors', {
  // supabase 유저 테이블을 참조함.
  author_id: uuid()
    .primaryKey()
    .references(() => userTable.id),
  // 이름
  name: text().notNull(),
  // 사용자 이름
  username: text().notNull(),
  // 프로필 이미지
  image: text(),
  // 짧은 소개
  short_bio: text(),
  // 소개
  bio: text(),
  // 권한
  role: authorRoleEnum().default('USER'),
  // 2FA OTP에 필요한 문자열
  otp_string: text(),
  // 생성일
  created_at: timestamp().notNull().defaultNow(),
  // 업데이트일
  updated_at: timestamp().notNull().defaultNow(),
});
