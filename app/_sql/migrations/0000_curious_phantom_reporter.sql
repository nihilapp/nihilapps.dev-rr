CREATE TYPE "public"."blog_visibility" AS ENUM('PUBLIC', 'PRIVATE');--> statement-breakpoint
CREATE TYPE "public"."post_comment_author_type" AS ENUM('ADMIN', 'VISITOR');--> statement-breakpoint
CREATE TYPE "public"."post_comment_status" AS ENUM('PENDING', 'APPROVED', 'SPAM');--> statement-breakpoint
CREATE TYPE "public"."post_status" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."post_visibility" AS ENUM('PUBLIC', 'PRIVATE', 'PROTECTED');--> statement-breakpoint
CREATE TYPE "public"."author_role" AS ENUM('USER', 'ADMIN', 'SUPER_ADMIN');--> statement-breakpoint
CREATE TABLE "blog_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"blog_id" uuid NOT NULL,
	"key" varchar NOT NULL,
	"value" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" text,
	"visibility" "blog_visibility" DEFAULT 'PUBLIC',
	"settings" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"blog_id" uuid NOT NULL,
	"parent_id" uuid,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_category_name_key" UNIQUE("blog_id","parent_id","name"),
	CONSTRAINT "blog_category_slug_key" UNIQUE("blog_id","slug")
);
--> statement-breakpoint
CREATE TABLE "announcements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"blog_id" uuid NOT NULL,
	"title" varchar NOT NULL,
	"content" text NOT NULL,
	"is_pinned" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_comments_replies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"comment_id" uuid NOT NULL,
	"user_id" uuid,
	"author_type" "post_comment_author_type" DEFAULT 'VISITOR',
	"author_name" varchar,
	"author_email" varchar,
	"content" text NOT NULL,
	"author_hashed_password" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"blog_id" uuid NOT NULL,
	"post_id" uuid NOT NULL,
	"user_id" uuid,
	"author_type" "post_comment_author_type" DEFAULT 'VISITOR',
	"status" "post_comment_status" DEFAULT 'PENDING',
	"content" text NOT NULL,
	"visitor_name" varchar,
	"visitor_email" varchar,
	"visitor_hashed_password" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_likes" (
	"blog_id" uuid NOT NULL,
	"post_id" uuid NOT NULL,
	"visitor_id" uuid NOT NULL,
	"liked_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_likes_visitor_id_post_id_pk" PRIMARY KEY("visitor_id","post_id")
);
--> statement-breakpoint
CREATE TABLE "post_revisions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"title" varchar NOT NULL,
	"content" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_tags" (
	"post_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "post_tags_post_id_tag_id_pk" PRIMARY KEY("post_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "post_views" (
	"blog_id" uuid NOT NULL,
	"post_id" uuid NOT NULL,
	"visitor_id" uuid NOT NULL,
	"user_agent" varchar,
	"viewed_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_views_visitor_id_post_id_pk" PRIMARY KEY("visitor_id","post_id")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"blog_id" uuid NOT NULL,
	"category_id" uuid,
	"title" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"content" text,
	"excerpt" text,
	"thumbnail_url" varchar,
	"status" "post_status" DEFAULT 'DRAFT',
	"visibility" "post_visibility" DEFAULT 'PUBLIC',
	"password" varchar,
	"is_featured" boolean DEFAULT false,
	"is_pinned" boolean DEFAULT false,
	"view_count" integer DEFAULT 0,
	"like_count" integer DEFAULT 0,
	"locale" varchar DEFAULT 'ko-KR',
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "blog_post_slug_key" UNIQUE("blog_id","slug")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"blog_id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"is_featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_tag_name_key" UNIQUE("blog_id","name")
);
--> statement-breakpoint
CREATE TABLE "authors" (
	"author_id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"image" text,
	"short_bio" text,
	"bio" text,
	"USER" "author_role" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blog_settings" ADD CONSTRAINT "blog_settings_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_user_id_authors_author_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."authors"("author_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_comments_replies" ADD CONSTRAINT "post_comments_replies_comment_id_post_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."post_comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_comments_replies" ADD CONSTRAINT "post_comments_replies_user_id_authors_author_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."authors"("author_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_user_id_authors_author_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."authors"("author_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_revisions" ADD CONSTRAINT "post_revisions_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_views" ADD CONSTRAINT "post_views_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_views" ADD CONSTRAINT "post_views_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authors" ADD CONSTRAINT "authors_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;