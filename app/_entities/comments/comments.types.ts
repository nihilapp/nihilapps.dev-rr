import type { InferSelectModel } from 'drizzle-orm';

import type {
  commentTable,
  commentAuthorTypeEnum,
  commentStatusEnum,
} from './comments.table';

export type Comment = InferSelectModel<typeof commentTable>;
export type CommentAuthorType =
  typeof commentAuthorTypeEnum.enumValues[number];
export type CommentStatus = typeof commentStatusEnum.enumValues[number];
