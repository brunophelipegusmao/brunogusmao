ALTER TABLE "post_section_blocks" DROP CONSTRAINT "post_section_blocks_image_payload_check";--> statement-breakpoint
ALTER TABLE "post_section_blocks" ADD CONSTRAINT "post_section_blocks_image_payload_check" CHECK ((
        "post_section_blocks"."type" <> 'image'
        OR ("post_section_blocks"."image_src" IS NOT NULL AND "post_section_blocks"."image_alt" IS NOT NULL)
      ));