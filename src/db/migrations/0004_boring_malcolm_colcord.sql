CREATE TYPE "public"."kanban_priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TABLE "kanban_cards" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"column_id" varchar(32) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"priority" "kanban_priority" DEFAULT 'medium' NOT NULL,
	"position" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "kanban_cards_column_id_position_unique" UNIQUE("column_id","position"),
	CONSTRAINT "kanban_cards_title_not_empty_check" CHECK (char_length("kanban_cards"."title") > 0)
);
--> statement-breakpoint
CREATE TABLE "kanban_columns" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"title" varchar(120) NOT NULL,
	"position" integer NOT NULL,
	"wip_limit" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "kanban_columns_position_unique" UNIQUE("position"),
	CONSTRAINT "kanban_columns_wip_limit_check" CHECK ("kanban_columns"."wip_limit" >= 1)
);
--> statement-breakpoint
ALTER TABLE "kanban_cards" ADD CONSTRAINT "kanban_cards_column_id_kanban_columns_id_fk" FOREIGN KEY ("column_id") REFERENCES "public"."kanban_columns"("id") ON DELETE cascade ON UPDATE no action;