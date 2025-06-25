import type { InferSelectModel } from 'drizzle-orm';

import type { postCommentsRepliesTable } from '@/_entities/posts/post-comments-replies.table';
import type { postCommentsTable } from '@/_entities/posts/post-comments.table';
import type { postRevisionTable } from '@/_entities/posts/post-revisions.table';
import type { postTagTable } from '@/_entities/posts/post-tags.table';
import type { postViewTable } from '@/_entities/posts/post-views.table';
import type {
  postTable,
  postStatusEnum,
  postVisibilityEnum
} from '@/_entities/posts/posts.table';

export type PostView = InferSelectModel<typeof postViewTable>;
export type PostTag = InferSelectModel<typeof postTagTable>;
export type PostRevision = InferSelectModel<typeof postRevisionTable>;
export type Post = InferSelectModel<typeof postTable>;
export type PostStatus = typeof postStatusEnum.enumValues[number];
export type PostVisibility = typeof postVisibilityEnum.enumValues[number];

// 댓글 타입
export type PostComment = InferSelectModel<typeof postCommentsTable>;
// 답글 타입
export type PostCommentReply = InferSelectModel<typeof postCommentsRepliesTable>;
// 댓글/답글 작성자 타입
export type PostCommentAuthorType = 'ADMIN' | 'VISITOR';
