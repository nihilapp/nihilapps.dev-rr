import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

import { blogTable } from '../blogs/blogs.table';
import { categoryTable } from '../categories/categories.table';

export const postStatusEnum = pgEnum('post_status', [
  'DRAFT',
  'PUBLISHED',
  'ARCHIVED',
]);
export const postVisibilityEnum = pgEnum('post_visibility', [
  'PUBLIC',
  'PRIVATE',
  'PROTECTED',
]);

export const postTable = pgTable(
  'posts',
  {
    // 포스트 ID (UUID, PK)
    post_id: uuid().primaryKey().defaultRandom(),

    // 소속 블로그 ID (FK)
    blog_id: uuid()
      .notNull()
      .references(() => blogTable.blog_id, { onDelete: 'cascade', }),

    // 소속 카테고리 ID (Nullable, FK)
    category_id: uuid().references(() => categoryTable.category_id, {
      onDelete: 'set null',
    }),

    // 포스트 제목
    title: varchar().notNull(),

    // 블로그 내 고유 슬러그 (`blog_id`와 함께 UNIQUE)
    slug: varchar().notNull(),

    // 본문 내용 (MD or HTML)
    content: text(),

    // 요약문
    excerpt: text(),

    // 썸네일 이미지 주소
    thumbnail_url: varchar(),

    // DRAFT, PUBLISHED, ARCHIVED
    status: postStatusEnum().default('DRAFT'),

    // PUBLIC, PRIVATE, PROTECTED
    visibility: postVisibilityEnum().default('PUBLIC'),

    // 보호 상태일 경우 해시된 비밀번호
    password: varchar(),

    // 추천 포스트 여부
    is_featured: boolean().default(false),

    // 상단 고정 여부
    is_pinned: boolean().default(false),

    // 조회수 (캐시용)
    view_count: integer().default(0),

    // 좋아요 수 (캐시용)
    like_count: integer().default(0),

    // 언어 정보 (ko-KR 등)
    locale: varchar().default('ko-KR'),

    // 발행일
    published_at: timestamp(),

    // 생성일
    created_at: timestamp().defaultNow().notNull(),

    // 수정일
    updated_at: timestamp()
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),

    // 삭제된 시각 (Soft Delete용)
    deleted_at: timestamp(),
  },
  (table) => {
    return {
      blogPostSlugKey: unique('blog_post_slug_key').on(
        table.blog_id,
        table.slug
      ),
    };
  }
);
