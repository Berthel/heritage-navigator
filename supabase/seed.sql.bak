

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";








ALTER SCHEMA "public" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."Favorite" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "siteId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."Favorite" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."HistoricalPeriod" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "startYear" integer NOT NULL,
    "endYear" integer NOT NULL,
    "description" "text" NOT NULL,
    "color" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."HistoricalPeriod" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Image" (
    "id" "text" NOT NULL,
    "url" "text" NOT NULL,
    "caption" "text",
    "credit" "text",
    "siteId" "text",
    "reviewId" "text",
    "userId" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."Image" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Review" (
    "id" "text" NOT NULL,
    "rating" smallint NOT NULL,
    "comment" "text",
    "siteId" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."Review" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Site" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "periodId" "text" NOT NULL,
    "latitude" double precision NOT NULL,
    "longitude" double precision NOT NULL,
    "address" "text" NOT NULL,
    "openHours" "text",
    "website" "text",
    "accessibility" "text",
    "facilities" "text"[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."Site" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Tour" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "duration" integer NOT NULL,
    "distance" double precision NOT NULL,
    "type" "text" NOT NULL,
    "theme" "text",
    "season" "text",
    "accessibility" "text",
    "difficulty" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."Tour" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ToursOnSites" (
    "tourId" "text" NOT NULL,
    "siteId" "text" NOT NULL,
    "order" integer NOT NULL,
    "description" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."ToursOnSites" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Translation" (
    "id" "text" NOT NULL,
    "languageCode" "text" NOT NULL,
    "name" "text",
    "description" "text",
    "siteId" "text",
    "periodId" "text",
    "tourId" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."Translation" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."cities" (
    "id" "text" NOT NULL,
    "name_da" "text" NOT NULL,
    "name_en" "text" NOT NULL,
    "name_pt" "text" NOT NULL,
    "description_da" "text" NOT NULL,
    "description_en" "text" NOT NULL,
    "description_pt" "text" NOT NULL,
    "country" "text" NOT NULL,
    "region" "text",
    "latitude" double precision NOT NULL,
    "longitude" double precision NOT NULL,
    "bounds_ne_lat" double precision NOT NULL,
    "bounds_ne_lng" double precision NOT NULL,
    "bounds_sw_lat" double precision NOT NULL,
    "bounds_sw_lng" double precision NOT NULL,
    "default_zoom" integer NOT NULL,
    "primary_image" "text" NOT NULL,
    "status" "text" NOT NULL,
    "last_updated" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "cities_status_check" CHECK (("status" = ANY (ARRAY['active'::"text", 'coming_soon'::"text", 'inactive'::"text"])))
);


ALTER TABLE "public"."cities" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."city_images" (
    "city_id" "text" NOT NULL,
    "image_id" "text" NOT NULL
);


ALTER TABLE "public"."city_images" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."city_periods" (
    "city_id" "text" NOT NULL,
    "period_id" "text" NOT NULL
);


ALTER TABLE "public"."city_periods" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."city_tags" (
    "city_id" "text" NOT NULL,
    "tag_id" "text" NOT NULL
);


ALTER TABLE "public"."city_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."detail_sections" (
    "id" "text" NOT NULL,
    "site_id" "text" NOT NULL,
    "type" "text" NOT NULL,
    "content_da" "text",
    "content_en" "text",
    "content_pt" "text",
    "image_layout" "text",
    "order_number" integer NOT NULL,
    "gallery_images" "text"[],
    CONSTRAINT "detail_sections_image_layout_check" CHECK (("image_layout" = ANY (ARRAY['left'::"text", 'right'::"text", 'full'::"text"]))),
    CONSTRAINT "detail_sections_type_check" CHECK (("type" = ANY (ARRAY['text'::"text", 'image'::"text", 'gallery'::"text"])))
);


ALTER TABLE "public"."detail_sections" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."heritage_sites" (
    "id" "text" NOT NULL,
    "city_id" "text" NOT NULL,
    "name_da" "text" NOT NULL,
    "name_en" "text" NOT NULL,
    "name_pt" "text" NOT NULL,
    "description_da" "text" NOT NULL,
    "description_en" "text" NOT NULL,
    "description_pt" "text" NOT NULL,
    "accessibility_da" "text",
    "accessibility_en" "text",
    "accessibility_pt" "text",
    "thumbnail_image" "text" NOT NULL,
    "latitude" double precision NOT NULL,
    "longitude" double precision NOT NULL,
    "address" "text",
    "primary_period" "text" NOT NULL,
    "status" "text" NOT NULL,
    "last_updated" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "heritage_sites_status_check" CHECK (("status" = ANY (ARRAY['active'::"text", 'temporary_closed'::"text", 'permanently_closed'::"text"])))
);


ALTER TABLE "public"."heritage_sites" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."images" (
    "id" "text" NOT NULL,
    "url" "text" NOT NULL,
    "alt_da" "text" NOT NULL,
    "alt_en" "text" NOT NULL,
    "alt_pt" "text" NOT NULL,
    "caption_da" "text",
    "caption_en" "text",
    "caption_pt" "text",
    "credit" "text",
    "year" integer,
    "period_id" "text",
    "order_number" integer NOT NULL,
    "thumbnail_url" "text",
    "medium_url" "text",
    "large_url" "text",
    "width" integer NOT NULL,
    "height" integer NOT NULL,
    "contexts" "text"[] NOT NULL,
    CONSTRAINT "images_contexts_check" CHECK (("contexts" <@ ARRAY['thumbnail'::"text", 'gallery'::"text", 'banner'::"text", 'description'::"text"]))
);


ALTER TABLE "public"."images" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."opening_hours" (
    "id" "text" NOT NULL,
    "site_id" "text" NOT NULL,
    "type" "text" NOT NULL,
    "valid_from" "date",
    "valid_to" "date",
    "metadata" "jsonb",
    CONSTRAINT "opening_hours_type_check" CHECK (("type" = ANY (ARRAY['regular'::"text", 'seasonal'::"text", 'special'::"text"])))
);


ALTER TABLE "public"."opening_hours" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."periods" (
    "id" "text" NOT NULL,
    "name_da" "text" NOT NULL,
    "name_en" "text" NOT NULL,
    "name_pt" "text" NOT NULL,
    "description_da" "text" NOT NULL,
    "description_en" "text" NOT NULL,
    "description_pt" "text" NOT NULL,
    "order_number" integer NOT NULL,
    "color" "text" NOT NULL,
    "start_year" integer,
    "end_year" integer
);


ALTER TABLE "public"."periods" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."site_images" (
    "site_id" "text" NOT NULL,
    "image_id" "text" NOT NULL
);


ALTER TABLE "public"."site_images" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."site_periods" (
    "site_id" "text" NOT NULL,
    "period_id" "text" NOT NULL
);


ALTER TABLE "public"."site_periods" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."site_tags" (
    "site_id" "text" NOT NULL,
    "tag_id" "text" NOT NULL
);


ALTER TABLE "public"."site_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tags" (
    "id" "text" NOT NULL,
    "name_da" "text" NOT NULL,
    "name_en" "text" NOT NULL,
    "name_pt" "text" NOT NULL,
    "type" "text"
);


ALTER TABLE "public"."tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."time_slots" (
    "id" "text" NOT NULL,
    "opening_hours_id" "text" NOT NULL,
    "day_of_week" integer NOT NULL,
    "opens" time without time zone NOT NULL,
    "closes" time without time zone NOT NULL,
    CONSTRAINT "time_slots_day_of_week_check" CHECK ((("day_of_week" >= 0) AND ("day_of_week" <= 6)))
);


ALTER TABLE "public"."time_slots" OWNER TO "postgres";


ALTER TABLE ONLY "public"."Favorite"
    ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."HistoricalPeriod"
    ADD CONSTRAINT "HistoricalPeriod_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Image"
    ADD CONSTRAINT "Image_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Site"
    ADD CONSTRAINT "Site_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Tour"
    ADD CONSTRAINT "Tour_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ToursOnSites"
    ADD CONSTRAINT "ToursOnSites_pkey" PRIMARY KEY ("tourId", "siteId");



ALTER TABLE ONLY "public"."Translation"
    ADD CONSTRAINT "Translation_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."cities"
    ADD CONSTRAINT "cities_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."city_images"
    ADD CONSTRAINT "city_images_pkey" PRIMARY KEY ("city_id", "image_id");



ALTER TABLE ONLY "public"."city_periods"
    ADD CONSTRAINT "city_periods_pkey" PRIMARY KEY ("city_id", "period_id");



ALTER TABLE ONLY "public"."city_tags"
    ADD CONSTRAINT "city_tags_pkey" PRIMARY KEY ("city_id", "tag_id");



ALTER TABLE ONLY "public"."detail_sections"
    ADD CONSTRAINT "detail_sections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."heritage_sites"
    ADD CONSTRAINT "heritage_sites_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."images"
    ADD CONSTRAINT "images_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."opening_hours"
    ADD CONSTRAINT "opening_hours_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."periods"
    ADD CONSTRAINT "periods_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."site_images"
    ADD CONSTRAINT "site_images_pkey" PRIMARY KEY ("site_id", "image_id");



ALTER TABLE ONLY "public"."site_periods"
    ADD CONSTRAINT "site_periods_pkey" PRIMARY KEY ("site_id", "period_id");



ALTER TABLE ONLY "public"."site_tags"
    ADD CONSTRAINT "site_tags_pkey" PRIMARY KEY ("site_id", "tag_id");



ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."time_slots"
    ADD CONSTRAINT "time_slots_pkey" PRIMARY KEY ("id");



CREATE UNIQUE INDEX "Favorite_userId_siteId_key" ON "public"."Favorite" USING "btree" ("userId", "siteId");



CREATE UNIQUE INDEX "Translation_languageCode_periodId_key" ON "public"."Translation" USING "btree" ("languageCode", "periodId");



CREATE UNIQUE INDEX "Translation_languageCode_siteId_key" ON "public"."Translation" USING "btree" ("languageCode", "siteId");



CREATE UNIQUE INDEX "Translation_languageCode_tourId_key" ON "public"."Translation" USING "btree" ("languageCode", "tourId");



CREATE INDEX "idx_detail_sections_site_id" ON "public"."detail_sections" USING "btree" ("site_id");



CREATE INDEX "idx_heritage_sites_city_id" ON "public"."heritage_sites" USING "btree" ("city_id");



CREATE INDEX "idx_heritage_sites_primary_period" ON "public"."heritage_sites" USING "btree" ("primary_period");



CREATE INDEX "idx_images_contexts" ON "public"."images" USING "gin" ("contexts");



CREATE INDEX "idx_images_period_id" ON "public"."images" USING "btree" ("period_id");



CREATE INDEX "idx_opening_hours_metadata" ON "public"."opening_hours" USING "gin" ("metadata");



CREATE INDEX "idx_opening_hours_site_id" ON "public"."opening_hours" USING "btree" ("site_id");



CREATE INDEX "idx_time_slots_opening_hours_id" ON "public"."time_slots" USING "btree" ("opening_hours_id");



ALTER TABLE ONLY "public"."Favorite"
    ADD CONSTRAINT "Favorite_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "public"."Site"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."Image"
    ADD CONSTRAINT "Image_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "public"."Review"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."Image"
    ADD CONSTRAINT "Image_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "public"."Site"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."Review"
    ADD CONSTRAINT "Review_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "public"."Site"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."Site"
    ADD CONSTRAINT "Site_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "public"."HistoricalPeriod"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."ToursOnSites"
    ADD CONSTRAINT "ToursOnSites_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "public"."Site"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."ToursOnSites"
    ADD CONSTRAINT "ToursOnSites_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "public"."Tour"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."Translation"
    ADD CONSTRAINT "Translation_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "public"."HistoricalPeriod"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."Translation"
    ADD CONSTRAINT "Translation_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "public"."Site"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."Translation"
    ADD CONSTRAINT "Translation_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "public"."Tour"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."city_images"
    ADD CONSTRAINT "city_images_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id");



ALTER TABLE ONLY "public"."city_images"
    ADD CONSTRAINT "city_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id");



ALTER TABLE ONLY "public"."city_periods"
    ADD CONSTRAINT "city_periods_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id");



ALTER TABLE ONLY "public"."city_periods"
    ADD CONSTRAINT "city_periods_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "public"."periods"("id");



ALTER TABLE ONLY "public"."city_tags"
    ADD CONSTRAINT "city_tags_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id");



ALTER TABLE ONLY "public"."city_tags"
    ADD CONSTRAINT "city_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id");



ALTER TABLE ONLY "public"."detail_sections"
    ADD CONSTRAINT "detail_sections_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "public"."heritage_sites"("id");



ALTER TABLE ONLY "public"."heritage_sites"
    ADD CONSTRAINT "heritage_sites_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id");



ALTER TABLE ONLY "public"."images"
    ADD CONSTRAINT "images_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "public"."periods"("id");



ALTER TABLE ONLY "public"."opening_hours"
    ADD CONSTRAINT "opening_hours_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "public"."heritage_sites"("id");



ALTER TABLE ONLY "public"."site_images"
    ADD CONSTRAINT "site_images_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id");



ALTER TABLE ONLY "public"."site_images"
    ADD CONSTRAINT "site_images_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "public"."heritage_sites"("id");



ALTER TABLE ONLY "public"."site_periods"
    ADD CONSTRAINT "site_periods_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "public"."periods"("id");



ALTER TABLE ONLY "public"."site_periods"
    ADD CONSTRAINT "site_periods_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "public"."heritage_sites"("id");



ALTER TABLE ONLY "public"."site_tags"
    ADD CONSTRAINT "site_tags_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "public"."heritage_sites"("id");



ALTER TABLE ONLY "public"."site_tags"
    ADD CONSTRAINT "site_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id");



ALTER TABLE ONLY "public"."time_slots"
    ADD CONSTRAINT "time_slots_opening_hours_id_fkey" FOREIGN KEY ("opening_hours_id") REFERENCES "public"."opening_hours"("id");



CREATE POLICY "Enable full access for all users" ON "public"."cities" USING (true) WITH CHECK (true);



CREATE POLICY "Enable full access for all users" ON "public"."city_images" USING (true) WITH CHECK (true);



CREATE POLICY "Enable full access for all users" ON "public"."city_periods" USING (true) WITH CHECK (true);



CREATE POLICY "Enable full access for all users" ON "public"."city_tags" USING (true) WITH CHECK (true);



CREATE POLICY "Enable full access for all users" ON "public"."detail_sections" USING (true) WITH CHECK (true);



CREATE POLICY "Enable full access for all users" ON "public"."heritage_sites" USING (true) WITH CHECK (true);



CREATE POLICY "Enable full access for all users" ON "public"."images" USING (true) WITH CHECK (true);



CREATE POLICY "Enable full access for all users" ON "public"."opening_hours" USING (true) WITH CHECK (true);



CREATE POLICY "Enable full access for all users" ON "public"."periods" USING (true) WITH CHECK (true);



CREATE POLICY "Enable full access for all users" ON "public"."site_images" USING (true) WITH CHECK (true);



CREATE POLICY "Enable full access for all users" ON "public"."site_periods" USING (true) WITH CHECK (true);



CREATE POLICY "Enable full access for all users" ON "public"."site_tags" USING (true) WITH CHECK (true);



CREATE POLICY "Enable full access for all users" ON "public"."tags" USING (true) WITH CHECK (true);



CREATE POLICY "Enable full access for all users" ON "public"."time_slots" USING (true) WITH CHECK (true);



ALTER TABLE "public"."cities" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."city_images" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."city_periods" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."city_tags" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."detail_sections" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."heritage_sites" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."images" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."opening_hours" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."periods" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."site_images" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."site_periods" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."site_tags" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."tags" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."time_slots" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



































































































































































































GRANT ALL ON TABLE "public"."Favorite" TO "anon";
GRANT ALL ON TABLE "public"."Favorite" TO "authenticated";
GRANT ALL ON TABLE "public"."Favorite" TO "service_role";



GRANT ALL ON TABLE "public"."HistoricalPeriod" TO "anon";
GRANT ALL ON TABLE "public"."HistoricalPeriod" TO "authenticated";
GRANT ALL ON TABLE "public"."HistoricalPeriod" TO "service_role";



GRANT ALL ON TABLE "public"."Image" TO "anon";
GRANT ALL ON TABLE "public"."Image" TO "authenticated";
GRANT ALL ON TABLE "public"."Image" TO "service_role";



GRANT ALL ON TABLE "public"."Review" TO "anon";
GRANT ALL ON TABLE "public"."Review" TO "authenticated";
GRANT ALL ON TABLE "public"."Review" TO "service_role";



GRANT ALL ON TABLE "public"."Site" TO "anon";
GRANT ALL ON TABLE "public"."Site" TO "authenticated";
GRANT ALL ON TABLE "public"."Site" TO "service_role";



GRANT ALL ON TABLE "public"."Tour" TO "anon";
GRANT ALL ON TABLE "public"."Tour" TO "authenticated";
GRANT ALL ON TABLE "public"."Tour" TO "service_role";



GRANT ALL ON TABLE "public"."ToursOnSites" TO "anon";
GRANT ALL ON TABLE "public"."ToursOnSites" TO "authenticated";
GRANT ALL ON TABLE "public"."ToursOnSites" TO "service_role";



GRANT ALL ON TABLE "public"."Translation" TO "anon";
GRANT ALL ON TABLE "public"."Translation" TO "authenticated";
GRANT ALL ON TABLE "public"."Translation" TO "service_role";



GRANT ALL ON TABLE "public"."cities" TO "anon";
GRANT ALL ON TABLE "public"."cities" TO "authenticated";
GRANT ALL ON TABLE "public"."cities" TO "service_role";



GRANT ALL ON TABLE "public"."city_images" TO "anon";
GRANT ALL ON TABLE "public"."city_images" TO "authenticated";
GRANT ALL ON TABLE "public"."city_images" TO "service_role";



GRANT ALL ON TABLE "public"."city_periods" TO "anon";
GRANT ALL ON TABLE "public"."city_periods" TO "authenticated";
GRANT ALL ON TABLE "public"."city_periods" TO "service_role";



GRANT ALL ON TABLE "public"."city_tags" TO "anon";
GRANT ALL ON TABLE "public"."city_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."city_tags" TO "service_role";



GRANT ALL ON TABLE "public"."detail_sections" TO "anon";
GRANT ALL ON TABLE "public"."detail_sections" TO "authenticated";
GRANT ALL ON TABLE "public"."detail_sections" TO "service_role";



GRANT ALL ON TABLE "public"."heritage_sites" TO "anon";
GRANT ALL ON TABLE "public"."heritage_sites" TO "authenticated";
GRANT ALL ON TABLE "public"."heritage_sites" TO "service_role";



GRANT ALL ON TABLE "public"."images" TO "anon";
GRANT ALL ON TABLE "public"."images" TO "authenticated";
GRANT ALL ON TABLE "public"."images" TO "service_role";



GRANT ALL ON TABLE "public"."opening_hours" TO "anon";
GRANT ALL ON TABLE "public"."opening_hours" TO "authenticated";
GRANT ALL ON TABLE "public"."opening_hours" TO "service_role";



GRANT ALL ON TABLE "public"."periods" TO "anon";
GRANT ALL ON TABLE "public"."periods" TO "authenticated";
GRANT ALL ON TABLE "public"."periods" TO "service_role";



GRANT ALL ON TABLE "public"."site_images" TO "anon";
GRANT ALL ON TABLE "public"."site_images" TO "authenticated";
GRANT ALL ON TABLE "public"."site_images" TO "service_role";



GRANT ALL ON TABLE "public"."site_periods" TO "anon";
GRANT ALL ON TABLE "public"."site_periods" TO "authenticated";
GRANT ALL ON TABLE "public"."site_periods" TO "service_role";



GRANT ALL ON TABLE "public"."site_tags" TO "anon";
GRANT ALL ON TABLE "public"."site_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."site_tags" TO "service_role";



GRANT ALL ON TABLE "public"."tags" TO "anon";
GRANT ALL ON TABLE "public"."tags" TO "authenticated";
GRANT ALL ON TABLE "public"."tags" TO "service_role";



GRANT ALL ON TABLE "public"."time_slots" TO "anon";
GRANT ALL ON TABLE "public"."time_slots" TO "authenticated";
GRANT ALL ON TABLE "public"."time_slots" TO "service_role";



























RESET ALL;
