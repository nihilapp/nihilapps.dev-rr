CREATE TYPE "public"."user_role" AS ENUM('SUPER_ADMIN', 'ADMIN', 'USER');--> statement-breakpoint
CREATE TABLE "user_auths" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"hashed_password" text,
	"refresh_token" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_auths_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"image" text,
	"role" "user_role" DEFAULT 'USER',
	"is_active" boolean DEFAULT true,
	"last_signed_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "user_auths" ADD CONSTRAINT "user_auths_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;