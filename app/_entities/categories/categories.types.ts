import type { InferSelectModel } from 'drizzle-orm';

import type { categoryTable } from './categories.table';

export type Category = InferSelectModel<typeof categoryTable>;
