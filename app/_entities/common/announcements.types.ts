import type { InferSelectModel } from 'drizzle-orm';

import type { announcementTable } from './announcements.table';

export type Announcement = InferSelectModel<typeof announcementTable>;
