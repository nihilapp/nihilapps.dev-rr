ALTER TABLE "authors" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "authors" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;