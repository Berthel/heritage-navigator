-- Hot-fix migration for site_periods

-- Opret site_periods tabellen korrekt
DROP TABLE IF EXISTS "public"."site_periods";
CREATE TABLE "public"."site_periods" (
    "site_id" text NOT NULL,
    "period_id" text NOT NULL,
    CONSTRAINT "site_periods_pkey" PRIMARY KEY ("site_id", "period_id"),
    CONSTRAINT "site_periods_site_id_fkey" FOREIGN KEY ("site_id")
        REFERENCES "public"."heritage_sites"("id") ON DELETE CASCADE,
    CONSTRAINT "site_periods_period_id_fkey" FOREIGN KEY ("period_id")
        REFERENCES "public"."periods"("id") ON DELETE CASCADE
);

-- Tilføj indeks for performance
CREATE INDEX "idx_site_periods_site_id" ON "public"."site_periods"("site_id");
CREATE INDEX "idx_site_periods_period_id" ON "public"."site_periods"("period_id");

-- Tilføj RLS policy
ALTER TABLE "public"."site_periods" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON "public"."site_periods"
    FOR SELECT USING (true);

-- Genopret data fra eksisterende heritage_sites
INSERT INTO "public"."site_periods" (site_id, period_id)
SELECT id, primary_period 
FROM "public"."heritage_sites"
WHERE primary_period IS NOT NULL;
