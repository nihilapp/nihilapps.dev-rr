import type { InferSelectModel } from 'drizzle-orm';

import type { postRevisionTable } from './post-revisions.table';

export type PostRevision = InferSelectModel<typeof postRevisionTable>;
