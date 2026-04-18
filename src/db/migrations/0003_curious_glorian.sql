CREATE TABLE "project_stack_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"label" varchar(120) NOT NULL,
	"position" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "project_stack_items_project_id_position_unique" UNIQUE("project_id","position")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(255) NOT NULL,
	"project_index" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"featured" integer DEFAULT 0 NOT NULL,
	"image_url" text,
	"live_url" text,
	"repo_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug"),
	CONSTRAINT "projects_featured_check" CHECK ("projects"."featured" IN (0, 1))
);
--> statement-breakpoint
ALTER TABLE "project_stack_items" ADD CONSTRAINT "project_stack_items_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;