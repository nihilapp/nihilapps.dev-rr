import type { InferSelectModel } from 'drizzle-orm';

import type { blogTable, blogVisibilityEnum } from './blogs.table';

export type Blog = InferSelectModel<typeof blogTable>;
export type BlogVisibility = typeof blogVisibilityEnum.enumValues[number];
