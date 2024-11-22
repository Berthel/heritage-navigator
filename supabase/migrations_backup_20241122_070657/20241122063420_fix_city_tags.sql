-- Hot-fix migration
-- Først fjern eventuelle ugyldige referencer
DELETE FROM "public"."city_tags" WHERE true;

-- Ret tabellen city_tags
DROP TABLE IF EXISTS "public"."city_tags";
CREATE TABLE "public"."city_tags" (
    "city_id" text NOT NULL,
    "tag_id" text NOT NULL,
    CONSTRAINT "city_tags_pkey" PRIMARY KEY ("city_id", "tag_id"),
    CONSTRAINT "city_tags_city_id_fkey" FOREIGN KEY ("city_id")
        REFERENCES "public"."cities"("id") ON DELETE CASCADE,
    CONSTRAINT "city_tags_tag_id_fkey" FOREIGN KEY ("tag_id")
        REFERENCES "public"."tags"("id") ON DELETE CASCADE
);

-- Tilføj RLS policy
ALTER TABLE "public"."city_tags" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON "public"."city_tags"
    FOR SELECT USING (true);
