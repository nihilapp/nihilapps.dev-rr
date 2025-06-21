import type { InferSelectModel } from 'drizzle-orm';

import type {
  postTable,
  postStatusEnum,
  postVisibilityEnum,
} from './posts.table';

export type Post = InferSelectModel<typeof postTable>;
export type PostStatus = typeof postStatusEnum.enumValues[number];
export type PostVisibility = typeof postVisibilityEnum.enumValues[number];
