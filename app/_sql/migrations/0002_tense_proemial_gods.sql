ALTER TABLE "authors" ADD COLUMN "role" "author_role" DEFAULT 'USER';--> statement-breakpoint
ALTER TABLE "authors" DROP COLUMN "USER";