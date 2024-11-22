-- Add type column to detail_sections
ALTER TABLE "public"."detail_sections"
ADD COLUMN "type" text NOT NULL DEFAULT 'text';

-- Update existing sections to have type 'text'
UPDATE "public"."detail_sections"
SET "type" = 'text';
