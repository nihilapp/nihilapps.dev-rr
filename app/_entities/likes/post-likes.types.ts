import type { InferSelectModel } from 'drizzle-orm';

// 테이블 파일명이 post-likes.table.ts 이고, 테이블 변수명이 likeTable 이므로
// 타입명 일관성을 위해 PostLike 로 명명합니다.
import type { likeTable } from './post-likes.table';

export type PostLike = InferSelectModel<typeof likeTable>;
