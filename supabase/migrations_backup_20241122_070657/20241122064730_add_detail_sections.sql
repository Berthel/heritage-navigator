-- Hot-fix migration for detail_sections

-- Opret detail_sections tabellen
DROP TABLE IF EXISTS "public"."detail_sections";
CREATE TABLE "public"."detail_sections" (
    "id" text PRIMARY KEY,
    "site_id" text NOT NULL,
    "title_da" text NOT NULL,
    "title_en" text NOT NULL,
    "title_pt" text NOT NULL,
    "content_da" text NOT NULL,
    "content_en" text NOT NULL,
    "content_pt" text NOT NULL,
    "order_number" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT now(),
    "updated_at" timestamp with time zone DEFAULT now(),
    CONSTRAINT "detail_sections_site_id_fkey" FOREIGN KEY ("site_id")
        REFERENCES "public"."heritage_sites"("id") ON DELETE CASCADE
);

-- Tilføj indeks for performance
CREATE INDEX "idx_detail_sections_site_id" ON "public"."detail_sections"("site_id");

-- Tilføj RLS policy
ALTER TABLE "public"."detail_sections" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON "public"."detail_sections"
    FOR SELECT USING (true);
