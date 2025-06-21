import type { InferSelectModel } from 'drizzle-orm';

// 테이블 파일명이 post-views.table.ts 이고, 테이블 변수명이 viewTable 이므로
// 타입명 일관성을 위해 PostView 로 명명합니다.
import type { viewTable } from './post-views.table';

export type PostView = InferSelectModel<typeof viewTable>;
