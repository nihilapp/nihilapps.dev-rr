import type { InferSelectModel } from 'drizzle-orm';

import type { tagTable } from './tags.table';

export type Tag = InferSelectModel<typeof tagTable>;
