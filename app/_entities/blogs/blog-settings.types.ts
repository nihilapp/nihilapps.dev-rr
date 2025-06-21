import type { InferSelectModel } from 'drizzle-orm';

import type { blogSettingTable } from './blog-settings.table';

export type BlogSetting = InferSelectModel<typeof blogSettingTable>;
