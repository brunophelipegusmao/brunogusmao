CREATE TYPE "public"."post_block_type" AS ENUM('paragraph', 'image');--> statement-breakpoint
CREATE TYPE "public"."post_editorial_status" AS ENUM('publicado', 'revisao', 'em-andamento');--> statement-breakpoint
CREATE TYPE "public"."post_tag_font_style" AS ENUM('normal', 'bold', 'italic', 'bold-italic');--> statement-breakpoint
CREATE TABLE "post_section_blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"section_id" uuid NOT NULL,
	"position" integer NOT NULL,
	"type" "post_block_type" NOT NULL,
	"content" text,
	"image_src" text,
	"image_alt" varchar(255),
	"image_caption" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_section_blocks_section_id_position_unique" UNIQUE("section_id","position"),
	CONSTRAINT "post_section_blocks_paragraph_content_check" CHECK ((
        "post_section_blocks"."type" <> 'paragraph'
        OR "post_section_blocks"."content" IS NOT NULL
      )),
	CONSTRAINT "post_section_blocks_image_payload_check" CHECK ((
        "post_section_blocks"."type" <> 'image'
	OR ("post_section_blocks"."image_src" IS NOT NULL AND "post_section_blocks"."image_alt" IS NOT NULL)
      ))
);
--> statement-breakpoint
CREATE TABLE "post_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"heading" varchar(255) NOT NULL,
	"position" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_sections_post_id_position_unique" UNIQUE("post_id","position")
);
--> statement-breakpoint
CREATE TABLE "post_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(120) NOT NULL,
	"label" varchar(120) NOT NULL,
	"text_color" varchar(32) NOT NULL,
	"background_color" varchar(32) NOT NULL,
	"font_style" "post_tag_font_style" DEFAULT 'normal' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_tags_slug_unique" UNIQUE("slug"),
	CONSTRAINT "post_tags_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"post_index" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"excerpt" text NOT NULL,
	"category" varchar(120) NOT NULL,
	"reading_time" varchar(50),
	"editorial_status" "post_editorial_status" DEFAULT 'em-andamento' NOT NULL,
	"published_at" timestamp,
	"cover_src" text,
	"cover_alt" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "posts_to_tags" (
	"post_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	"assigned_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "posts_to_tags_post_id_tag_id_pk" PRIMARY KEY("post_id","tag_id")
);
--> statement-breakpoint
ALTER TABLE "post_section_blocks" ADD CONSTRAINT "post_section_blocks_section_id_post_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."post_sections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_sections" ADD CONSTRAINT "post_sections_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_to_tags" ADD CONSTRAINT "posts_to_tags_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_to_tags" ADD CONSTRAINT "posts_to_tags_tag_id_post_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."post_tags"("id") ON DELETE cascade ON UPDATE no action;