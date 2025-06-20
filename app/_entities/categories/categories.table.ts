import { integer, pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import type { AnyPgColumn } from 'drizzle-orm/pg-core';

export const categoryType = pgEnum('category_type', [
  'MAIN', // 메인 카테고리
  'SUB', // 서브 카테고리
]);

export const categoryTable = pgTable('categories', {
  // 아이디
  id: uuid()
    .primaryKey()
    .defaultRandom(),
  // 이름
  name: text()
    .notNull(),
  // 설명
  description: text(),
  // 타입
  type: categoryType()
    .notNull()
    .default('MAIN'),
  // 부모 카테고리 아이디
  parent_id: uuid()
    .references((): AnyPgColumn => categoryTable.id)
    .notNull(),
  // 순서
  order: integer()
    .notNull()
    .default(0),
  // 생성일
  created_at: timestamp()
    .defaultNow(),
  // 수정일
  updated_at: timestamp()
    .defaultNow(),
});
