-- Create city_tags table (many-to-many between cities and tags)
CREATE TABLE "public"."city_tags" (
    "city_id" text NOT NULL REFERENCES "public"."cities"("id"),
    "tag_id" text NOT NULL REFERENCES "public"."tags"("id"),
    "created_at" timestamp with time zone DEFAULT now(),
    PRIMARY KEY ("city_id", "tag_id")
);
