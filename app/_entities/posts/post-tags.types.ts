import type { InferSelectModel } from 'drizzle-orm';

import type { postTagTable } from './post-tags.table';

export type PostTag = InferSelectModel<typeof postTagTable>;
