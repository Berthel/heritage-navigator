create table "public"."Favorite" (
    "id" text not null,
    "userId" text not null,
    "siteId" text not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP
);


create table "public"."HistoricalPeriod" (
    "id" text not null,
    "name" text not null,
    "startYear" integer not null,
    "endYear" integer not null,
    "description" text not null,
    "color" text,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null
);


create table "public"."Image" (
    "id" text not null,
    "url" text not null,
    "caption" text,
    "credit" text,
    "siteId" text,
    "reviewId" text,
    "userId" text,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null
);


create table "public"."Review" (
    "id" text not null,
    "rating" smallint not null,
    "comment" text,
    "siteId" text not null,
    "userId" text not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null
);


create table "public"."Site" (
    "id" text not null,
    "name" text not null,
    "description" text not null,
    "periodId" text not null,
    "latitude" double precision not null,
    "longitude" double precision not null,
    "address" text not null,
    "openHours" text,
    "website" text,
    "accessibility" text,
    "facilities" text[],
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null
);


create table "public"."Tour" (
    "id" text not null,
    "name" text not null,
    "description" text not null,
    "duration" integer not null,
    "distance" double precision not null,
    "type" text not null,
    "theme" text,
    "season" text,
    "accessibility" text,
    "difficulty" text not null,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null
);


create table "public"."ToursOnSites" (
    "tourId" text not null,
    "siteId" text not null,
    "order" integer not null,
    "description" text,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null
);


create table "public"."Translation" (
    "id" text not null,
    "languageCode" text not null,
    "name" text,
    "description" text,
    "siteId" text,
    "periodId" text,
    "tourId" text,
    "createdAt" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone not null
);


create table "public"."cities" (
    "id" text not null,
    "name_da" text not null,
    "name_en" text not null,
    "name_pt" text not null,
    "description_da" text not null,
    "description_en" text not null,
    "description_pt" text not null,
    "country" text not null,
    "region" text,
    "latitude" double precision not null,
    "longitude" double precision not null,
    "bounds_ne_lat" double precision not null,
    "bounds_ne_lng" double precision not null,
    "bounds_sw_lat" double precision not null,
    "bounds_sw_lng" double precision not null,
    "default_zoom" integer not null,
    "primary_image" text not null,
    "status" text not null,
    "last_updated" timestamp with time zone default now()
);


alter table "public"."cities" enable row level security;

create table "public"."city_images" (
    "city_id" text not null,
    "image_id" text not null
);


alter table "public"."city_images" enable row level security;

create table "public"."city_periods" (
    "city_id" text not null,
    "period_id" text not null
);


alter table "public"."city_periods" enable row level security;

create table "public"."city_tags" (
    "city_id" text not null,
    "tag_id" text not null
);


alter table "public"."city_tags" enable row level security;

create table "public"."detail_sections" (
    "id" text not null,
    "site_id" text not null,
    "type" text not null,
    "content_da" text,
    "content_en" text,
    "content_pt" text,
    "image_layout" text,
    "order_number" integer not null,
    "gallery_images" text[]
);


alter table "public"."detail_sections" enable row level security;

create table "public"."heritage_sites" (
    "id" text not null,
    "city_id" text not null,
    "name_da" text not null,
    "name_en" text not null,
    "name_pt" text not null,
    "description_da" text not null,
    "description_en" text not null,
    "description_pt" text not null,
    "accessibility_da" text,
    "accessibility_en" text,
    "accessibility_pt" text,
    "thumbnail_image" text not null,
    "latitude" double precision not null,
    "longitude" double precision not null,
    "address" text,
    "primary_period" text not null,
    "status" text not null,
    "last_updated" timestamp with time zone default now()
);


alter table "public"."heritage_sites" enable row level security;

create table "public"."images" (
    "id" text not null,
    "url" text not null,
    "alt_da" text not null,
    "alt_en" text not null,
    "alt_pt" text not null,
    "caption_da" text,
    "caption_en" text,
    "caption_pt" text,
    "credit" text,
    "year" integer,
    "period_id" text,
    "order_number" integer not null,
    "thumbnail_url" text,
    "medium_url" text,
    "large_url" text,
    "width" integer not null,
    "height" integer not null,
    "contexts" text[] not null
);


alter table "public"."images" enable row level security;

create table "public"."opening_hours" (
    "id" text not null,
    "site_id" text not null,
    "type" text not null,
    "valid_from" date,
    "valid_to" date,
    "metadata" jsonb
);


alter table "public"."opening_hours" enable row level security;

create table "public"."periods" (
    "id" text not null,
    "name_da" text not null,
    "name_en" text not null,
    "name_pt" text not null,
    "description_da" text not null,
    "description_en" text not null,
    "description_pt" text not null,
    "order_number" integer not null,
    "color" text not null,
    "start_year" integer,
    "end_year" integer
);


alter table "public"."periods" enable row level security;

create table "public"."site_images" (
    "site_id" text not null,
    "image_id" text not null
);


alter table "public"."site_images" enable row level security;

create table "public"."site_periods" (
    "site_id" text not null,
    "period_id" text not null
);


alter table "public"."site_periods" enable row level security;

create table "public"."site_tags" (
    "site_id" text not null,
    "tag_id" text not null
);


alter table "public"."site_tags" enable row level security;

create table "public"."tags" (
    "id" text not null,
    "name_da" text not null,
    "name_en" text not null,
    "name_pt" text not null,
    "type" text
);


alter table "public"."tags" enable row level security;

create table "public"."time_slots" (
    "id" text not null,
    "opening_hours_id" text not null,
    "day_of_week" integer not null,
    "opens" time without time zone not null,
    "closes" time without time zone not null
);


alter table "public"."time_slots" enable row level security;

CREATE UNIQUE INDEX "Favorite_pkey" ON public."Favorite" USING btree (id);

CREATE UNIQUE INDEX "Favorite_userId_siteId_key" ON public."Favorite" USING btree ("userId", "siteId");

CREATE UNIQUE INDEX "HistoricalPeriod_pkey" ON public."HistoricalPeriod" USING btree (id);

CREATE UNIQUE INDEX "Image_pkey" ON public."Image" USING btree (id);

CREATE UNIQUE INDEX "Review_pkey" ON public."Review" USING btree (id);

CREATE UNIQUE INDEX "Site_pkey" ON public."Site" USING btree (id);

CREATE UNIQUE INDEX "Tour_pkey" ON public."Tour" USING btree (id);

CREATE UNIQUE INDEX "ToursOnSites_pkey" ON public."ToursOnSites" USING btree ("tourId", "siteId");

CREATE UNIQUE INDEX "Translation_languageCode_periodId_key" ON public."Translation" USING btree ("languageCode", "periodId");

CREATE UNIQUE INDEX "Translation_languageCode_siteId_key" ON public."Translation" USING btree ("languageCode", "siteId");

CREATE UNIQUE INDEX "Translation_languageCode_tourId_key" ON public."Translation" USING btree ("languageCode", "tourId");

CREATE UNIQUE INDEX "Translation_pkey" ON public."Translation" USING btree (id);

CREATE UNIQUE INDEX cities_pkey ON public.cities USING btree (id);

CREATE UNIQUE INDEX city_images_pkey ON public.city_images USING btree (city_id, image_id);

CREATE UNIQUE INDEX city_periods_pkey ON public.city_periods USING btree (city_id, period_id);

CREATE UNIQUE INDEX city_tags_pkey ON public.city_tags USING btree (city_id, tag_id);

CREATE UNIQUE INDEX detail_sections_pkey ON public.detail_sections USING btree (id);

CREATE UNIQUE INDEX heritage_sites_pkey ON public.heritage_sites USING btree (id);

CREATE INDEX idx_detail_sections_site_id ON public.detail_sections USING btree (site_id);

CREATE INDEX idx_heritage_sites_city_id ON public.heritage_sites USING btree (city_id);

CREATE INDEX idx_heritage_sites_primary_period ON public.heritage_sites USING btree (primary_period);

CREATE INDEX idx_images_contexts ON public.images USING gin (contexts);

CREATE INDEX idx_images_period_id ON public.images USING btree (period_id);

CREATE INDEX idx_opening_hours_metadata ON public.opening_hours USING gin (metadata);

CREATE INDEX idx_opening_hours_site_id ON public.opening_hours USING btree (site_id);

CREATE INDEX idx_time_slots_opening_hours_id ON public.time_slots USING btree (opening_hours_id);

CREATE UNIQUE INDEX images_pkey ON public.images USING btree (id);

CREATE UNIQUE INDEX opening_hours_pkey ON public.opening_hours USING btree (id);

CREATE UNIQUE INDEX periods_pkey ON public.periods USING btree (id);

CREATE UNIQUE INDEX site_images_pkey ON public.site_images USING btree (site_id, image_id);

CREATE UNIQUE INDEX site_periods_pkey ON public.site_periods USING btree (site_id, period_id);

CREATE UNIQUE INDEX site_tags_pkey ON public.site_tags USING btree (site_id, tag_id);

CREATE UNIQUE INDEX tags_pkey ON public.tags USING btree (id);

CREATE UNIQUE INDEX time_slots_pkey ON public.time_slots USING btree (id);

alter table "public"."Favorite" add constraint "Favorite_pkey" PRIMARY KEY using index "Favorite_pkey";

alter table "public"."HistoricalPeriod" add constraint "HistoricalPeriod_pkey" PRIMARY KEY using index "HistoricalPeriod_pkey";

alter table "public"."Image" add constraint "Image_pkey" PRIMARY KEY using index "Image_pkey";

alter table "public"."Review" add constraint "Review_pkey" PRIMARY KEY using index "Review_pkey";

alter table "public"."Site" add constraint "Site_pkey" PRIMARY KEY using index "Site_pkey";

alter table "public"."Tour" add constraint "Tour_pkey" PRIMARY KEY using index "Tour_pkey";

alter table "public"."ToursOnSites" add constraint "ToursOnSites_pkey" PRIMARY KEY using index "ToursOnSites_pkey";

alter table "public"."Translation" add constraint "Translation_pkey" PRIMARY KEY using index "Translation_pkey";

alter table "public"."cities" add constraint "cities_pkey" PRIMARY KEY using index "cities_pkey";

alter table "public"."city_images" add constraint "city_images_pkey" PRIMARY KEY using index "city_images_pkey";

alter table "public"."city_periods" add constraint "city_periods_pkey" PRIMARY KEY using index "city_periods_pkey";

alter table "public"."city_tags" add constraint "city_tags_pkey" PRIMARY KEY using index "city_tags_pkey";

alter table "public"."detail_sections" add constraint "detail_sections_pkey" PRIMARY KEY using index "detail_sections_pkey";

alter table "public"."heritage_sites" add constraint "heritage_sites_pkey" PRIMARY KEY using index "heritage_sites_pkey";

alter table "public"."images" add constraint "images_pkey" PRIMARY KEY using index "images_pkey";

alter table "public"."opening_hours" add constraint "opening_hours_pkey" PRIMARY KEY using index "opening_hours_pkey";

alter table "public"."periods" add constraint "periods_pkey" PRIMARY KEY using index "periods_pkey";

alter table "public"."site_images" add constraint "site_images_pkey" PRIMARY KEY using index "site_images_pkey";

alter table "public"."site_periods" add constraint "site_periods_pkey" PRIMARY KEY using index "site_periods_pkey";

alter table "public"."site_tags" add constraint "site_tags_pkey" PRIMARY KEY using index "site_tags_pkey";

alter table "public"."tags" add constraint "tags_pkey" PRIMARY KEY using index "tags_pkey";

alter table "public"."time_slots" add constraint "time_slots_pkey" PRIMARY KEY using index "time_slots_pkey";

alter table "public"."Favorite" add constraint "Favorite_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Favorite" validate constraint "Favorite_siteId_fkey";

alter table "public"."Image" add constraint "Image_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."Image" validate constraint "Image_reviewId_fkey";

alter table "public"."Image" add constraint "Image_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."Image" validate constraint "Image_siteId_fkey";

alter table "public"."Review" add constraint "Review_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Review" validate constraint "Review_siteId_fkey";

alter table "public"."Site" add constraint "Site_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "HistoricalPeriod"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."Site" validate constraint "Site_periodId_fkey";

alter table "public"."ToursOnSites" add constraint "ToursOnSites_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."ToursOnSites" validate constraint "ToursOnSites_siteId_fkey";

alter table "public"."ToursOnSites" add constraint "ToursOnSites_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."ToursOnSites" validate constraint "ToursOnSites_tourId_fkey";

alter table "public"."Translation" add constraint "Translation_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "HistoricalPeriod"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."Translation" validate constraint "Translation_periodId_fkey";

alter table "public"."Translation" add constraint "Translation_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."Translation" validate constraint "Translation_siteId_fkey";

alter table "public"."Translation" add constraint "Translation_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."Translation" validate constraint "Translation_tourId_fkey";

alter table "public"."cities" add constraint "cities_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'coming_soon'::text, 'inactive'::text]))) not valid;

alter table "public"."cities" validate constraint "cities_status_check";

alter table "public"."city_images" add constraint "city_images_city_id_fkey" FOREIGN KEY (city_id) REFERENCES cities(id) not valid;

alter table "public"."city_images" validate constraint "city_images_city_id_fkey";

alter table "public"."city_images" add constraint "city_images_image_id_fkey" FOREIGN KEY (image_id) REFERENCES images(id) not valid;

alter table "public"."city_images" validate constraint "city_images_image_id_fkey";

alter table "public"."city_periods" add constraint "city_periods_city_id_fkey" FOREIGN KEY (city_id) REFERENCES cities(id) not valid;

alter table "public"."city_periods" validate constraint "city_periods_city_id_fkey";

alter table "public"."city_periods" add constraint "city_periods_period_id_fkey" FOREIGN KEY (period_id) REFERENCES periods(id) not valid;

alter table "public"."city_periods" validate constraint "city_periods_period_id_fkey";

alter table "public"."city_tags" add constraint "city_tags_city_id_fkey" FOREIGN KEY (city_id) REFERENCES cities(id) not valid;

alter table "public"."city_tags" validate constraint "city_tags_city_id_fkey";

alter table "public"."city_tags" add constraint "city_tags_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES tags(id) not valid;

alter table "public"."city_tags" validate constraint "city_tags_tag_id_fkey";

alter table "public"."detail_sections" add constraint "detail_sections_image_layout_check" CHECK ((image_layout = ANY (ARRAY['left'::text, 'right'::text, 'full'::text]))) not valid;

alter table "public"."detail_sections" validate constraint "detail_sections_image_layout_check";

alter table "public"."detail_sections" add constraint "detail_sections_site_id_fkey" FOREIGN KEY (site_id) REFERENCES heritage_sites(id) not valid;

alter table "public"."detail_sections" validate constraint "detail_sections_site_id_fkey";

alter table "public"."detail_sections" add constraint "detail_sections_type_check" CHECK ((type = ANY (ARRAY['text'::text, 'image'::text, 'gallery'::text]))) not valid;

alter table "public"."detail_sections" validate constraint "detail_sections_type_check";

alter table "public"."heritage_sites" add constraint "heritage_sites_city_id_fkey" FOREIGN KEY (city_id) REFERENCES cities(id) not valid;

alter table "public"."heritage_sites" validate constraint "heritage_sites_city_id_fkey";

alter table "public"."heritage_sites" add constraint "heritage_sites_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'temporary_closed'::text, 'permanently_closed'::text]))) not valid;

alter table "public"."heritage_sites" validate constraint "heritage_sites_status_check";

alter table "public"."images" add constraint "images_contexts_check" CHECK ((contexts <@ ARRAY['thumbnail'::text, 'gallery'::text, 'banner'::text, 'description'::text])) not valid;

alter table "public"."images" validate constraint "images_contexts_check";

alter table "public"."images" add constraint "images_period_id_fkey" FOREIGN KEY (period_id) REFERENCES periods(id) not valid;

alter table "public"."images" validate constraint "images_period_id_fkey";

alter table "public"."opening_hours" add constraint "opening_hours_site_id_fkey" FOREIGN KEY (site_id) REFERENCES heritage_sites(id) not valid;

alter table "public"."opening_hours" validate constraint "opening_hours_site_id_fkey";

alter table "public"."opening_hours" add constraint "opening_hours_type_check" CHECK ((type = ANY (ARRAY['regular'::text, 'seasonal'::text, 'special'::text]))) not valid;

alter table "public"."opening_hours" validate constraint "opening_hours_type_check";

alter table "public"."site_images" add constraint "site_images_image_id_fkey" FOREIGN KEY (image_id) REFERENCES images(id) not valid;

alter table "public"."site_images" validate constraint "site_images_image_id_fkey";

alter table "public"."site_images" add constraint "site_images_site_id_fkey" FOREIGN KEY (site_id) REFERENCES heritage_sites(id) not valid;

alter table "public"."site_images" validate constraint "site_images_site_id_fkey";

alter table "public"."site_periods" add constraint "site_periods_period_id_fkey" FOREIGN KEY (period_id) REFERENCES periods(id) not valid;

alter table "public"."site_periods" validate constraint "site_periods_period_id_fkey";

alter table "public"."site_periods" add constraint "site_periods_site_id_fkey" FOREIGN KEY (site_id) REFERENCES heritage_sites(id) not valid;

alter table "public"."site_periods" validate constraint "site_periods_site_id_fkey";

alter table "public"."site_tags" add constraint "site_tags_site_id_fkey" FOREIGN KEY (site_id) REFERENCES heritage_sites(id) not valid;

alter table "public"."site_tags" validate constraint "site_tags_site_id_fkey";

alter table "public"."site_tags" add constraint "site_tags_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES tags(id) not valid;

alter table "public"."site_tags" validate constraint "site_tags_tag_id_fkey";

alter table "public"."time_slots" add constraint "time_slots_day_of_week_check" CHECK (((day_of_week >= 0) AND (day_of_week <= 6))) not valid;

alter table "public"."time_slots" validate constraint "time_slots_day_of_week_check";

alter table "public"."time_slots" add constraint "time_slots_opening_hours_id_fkey" FOREIGN KEY (opening_hours_id) REFERENCES opening_hours(id) not valid;

alter table "public"."time_slots" validate constraint "time_slots_opening_hours_id_fkey";

grant delete on table "public"."Favorite" to "anon";

grant insert on table "public"."Favorite" to "anon";

grant references on table "public"."Favorite" to "anon";

grant select on table "public"."Favorite" to "anon";

grant trigger on table "public"."Favorite" to "anon";

grant truncate on table "public"."Favorite" to "anon";

grant update on table "public"."Favorite" to "anon";

grant delete on table "public"."Favorite" to "authenticated";

grant insert on table "public"."Favorite" to "authenticated";

grant references on table "public"."Favorite" to "authenticated";

grant select on table "public"."Favorite" to "authenticated";

grant trigger on table "public"."Favorite" to "authenticated";

grant truncate on table "public"."Favorite" to "authenticated";

grant update on table "public"."Favorite" to "authenticated";

grant delete on table "public"."Favorite" to "service_role";

grant insert on table "public"."Favorite" to "service_role";

grant references on table "public"."Favorite" to "service_role";

grant select on table "public"."Favorite" to "service_role";

grant trigger on table "public"."Favorite" to "service_role";

grant truncate on table "public"."Favorite" to "service_role";

grant update on table "public"."Favorite" to "service_role";

grant delete on table "public"."HistoricalPeriod" to "anon";

grant insert on table "public"."HistoricalPeriod" to "anon";

grant references on table "public"."HistoricalPeriod" to "anon";

grant select on table "public"."HistoricalPeriod" to "anon";

grant trigger on table "public"."HistoricalPeriod" to "anon";

grant truncate on table "public"."HistoricalPeriod" to "anon";

grant update on table "public"."HistoricalPeriod" to "anon";

grant delete on table "public"."HistoricalPeriod" to "authenticated";

grant insert on table "public"."HistoricalPeriod" to "authenticated";

grant references on table "public"."HistoricalPeriod" to "authenticated";

grant select on table "public"."HistoricalPeriod" to "authenticated";

grant trigger on table "public"."HistoricalPeriod" to "authenticated";

grant truncate on table "public"."HistoricalPeriod" to "authenticated";

grant update on table "public"."HistoricalPeriod" to "authenticated";

grant delete on table "public"."HistoricalPeriod" to "service_role";

grant insert on table "public"."HistoricalPeriod" to "service_role";

grant references on table "public"."HistoricalPeriod" to "service_role";

grant select on table "public"."HistoricalPeriod" to "service_role";

grant trigger on table "public"."HistoricalPeriod" to "service_role";

grant truncate on table "public"."HistoricalPeriod" to "service_role";

grant update on table "public"."HistoricalPeriod" to "service_role";

grant delete on table "public"."Image" to "anon";

grant insert on table "public"."Image" to "anon";

grant references on table "public"."Image" to "anon";

grant select on table "public"."Image" to "anon";

grant trigger on table "public"."Image" to "anon";

grant truncate on table "public"."Image" to "anon";

grant update on table "public"."Image" to "anon";

grant delete on table "public"."Image" to "authenticated";

grant insert on table "public"."Image" to "authenticated";

grant references on table "public"."Image" to "authenticated";

grant select on table "public"."Image" to "authenticated";

grant trigger on table "public"."Image" to "authenticated";

grant truncate on table "public"."Image" to "authenticated";

grant update on table "public"."Image" to "authenticated";

grant delete on table "public"."Image" to "service_role";

grant insert on table "public"."Image" to "service_role";

grant references on table "public"."Image" to "service_role";

grant select on table "public"."Image" to "service_role";

grant trigger on table "public"."Image" to "service_role";

grant truncate on table "public"."Image" to "service_role";

grant update on table "public"."Image" to "service_role";

grant delete on table "public"."Review" to "anon";

grant insert on table "public"."Review" to "anon";

grant references on table "public"."Review" to "anon";

grant select on table "public"."Review" to "anon";

grant trigger on table "public"."Review" to "anon";

grant truncate on table "public"."Review" to "anon";

grant update on table "public"."Review" to "anon";

grant delete on table "public"."Review" to "authenticated";

grant insert on table "public"."Review" to "authenticated";

grant references on table "public"."Review" to "authenticated";

grant select on table "public"."Review" to "authenticated";

grant trigger on table "public"."Review" to "authenticated";

grant truncate on table "public"."Review" to "authenticated";

grant update on table "public"."Review" to "authenticated";

grant delete on table "public"."Review" to "service_role";

grant insert on table "public"."Review" to "service_role";

grant references on table "public"."Review" to "service_role";

grant select on table "public"."Review" to "service_role";

grant trigger on table "public"."Review" to "service_role";

grant truncate on table "public"."Review" to "service_role";

grant update on table "public"."Review" to "service_role";

grant delete on table "public"."Site" to "anon";

grant insert on table "public"."Site" to "anon";

grant references on table "public"."Site" to "anon";

grant select on table "public"."Site" to "anon";

grant trigger on table "public"."Site" to "anon";

grant truncate on table "public"."Site" to "anon";

grant update on table "public"."Site" to "anon";

grant delete on table "public"."Site" to "authenticated";

grant insert on table "public"."Site" to "authenticated";

grant references on table "public"."Site" to "authenticated";

grant select on table "public"."Site" to "authenticated";

grant trigger on table "public"."Site" to "authenticated";

grant truncate on table "public"."Site" to "authenticated";

grant update on table "public"."Site" to "authenticated";

grant delete on table "public"."Site" to "service_role";

grant insert on table "public"."Site" to "service_role";

grant references on table "public"."Site" to "service_role";

grant select on table "public"."Site" to "service_role";

grant trigger on table "public"."Site" to "service_role";

grant truncate on table "public"."Site" to "service_role";

grant update on table "public"."Site" to "service_role";

grant delete on table "public"."Tour" to "anon";

grant insert on table "public"."Tour" to "anon";

grant references on table "public"."Tour" to "anon";

grant select on table "public"."Tour" to "anon";

grant trigger on table "public"."Tour" to "anon";

grant truncate on table "public"."Tour" to "anon";

grant update on table "public"."Tour" to "anon";

grant delete on table "public"."Tour" to "authenticated";

grant insert on table "public"."Tour" to "authenticated";

grant references on table "public"."Tour" to "authenticated";

grant select on table "public"."Tour" to "authenticated";

grant trigger on table "public"."Tour" to "authenticated";

grant truncate on table "public"."Tour" to "authenticated";

grant update on table "public"."Tour" to "authenticated";

grant delete on table "public"."Tour" to "service_role";

grant insert on table "public"."Tour" to "service_role";

grant references on table "public"."Tour" to "service_role";

grant select on table "public"."Tour" to "service_role";

grant trigger on table "public"."Tour" to "service_role";

grant truncate on table "public"."Tour" to "service_role";

grant update on table "public"."Tour" to "service_role";

grant delete on table "public"."ToursOnSites" to "anon";

grant insert on table "public"."ToursOnSites" to "anon";

grant references on table "public"."ToursOnSites" to "anon";

grant select on table "public"."ToursOnSites" to "anon";

grant trigger on table "public"."ToursOnSites" to "anon";

grant truncate on table "public"."ToursOnSites" to "anon";

grant update on table "public"."ToursOnSites" to "anon";

grant delete on table "public"."ToursOnSites" to "authenticated";

grant insert on table "public"."ToursOnSites" to "authenticated";

grant references on table "public"."ToursOnSites" to "authenticated";

grant select on table "public"."ToursOnSites" to "authenticated";

grant trigger on table "public"."ToursOnSites" to "authenticated";

grant truncate on table "public"."ToursOnSites" to "authenticated";

grant update on table "public"."ToursOnSites" to "authenticated";

grant delete on table "public"."ToursOnSites" to "service_role";

grant insert on table "public"."ToursOnSites" to "service_role";

grant references on table "public"."ToursOnSites" to "service_role";

grant select on table "public"."ToursOnSites" to "service_role";

grant trigger on table "public"."ToursOnSites" to "service_role";

grant truncate on table "public"."ToursOnSites" to "service_role";

grant update on table "public"."ToursOnSites" to "service_role";

grant delete on table "public"."Translation" to "anon";

grant insert on table "public"."Translation" to "anon";

grant references on table "public"."Translation" to "anon";

grant select on table "public"."Translation" to "anon";

grant trigger on table "public"."Translation" to "anon";

grant truncate on table "public"."Translation" to "anon";

grant update on table "public"."Translation" to "anon";

grant delete on table "public"."Translation" to "authenticated";

grant insert on table "public"."Translation" to "authenticated";

grant references on table "public"."Translation" to "authenticated";

grant select on table "public"."Translation" to "authenticated";

grant trigger on table "public"."Translation" to "authenticated";

grant truncate on table "public"."Translation" to "authenticated";

grant update on table "public"."Translation" to "authenticated";

grant delete on table "public"."Translation" to "service_role";

grant insert on table "public"."Translation" to "service_role";

grant references on table "public"."Translation" to "service_role";

grant select on table "public"."Translation" to "service_role";

grant trigger on table "public"."Translation" to "service_role";

grant truncate on table "public"."Translation" to "service_role";

grant update on table "public"."Translation" to "service_role";

grant delete on table "public"."cities" to "anon";

grant insert on table "public"."cities" to "anon";

grant references on table "public"."cities" to "anon";

grant select on table "public"."cities" to "anon";

grant trigger on table "public"."cities" to "anon";

grant truncate on table "public"."cities" to "anon";

grant update on table "public"."cities" to "anon";

grant delete on table "public"."cities" to "authenticated";

grant insert on table "public"."cities" to "authenticated";

grant references on table "public"."cities" to "authenticated";

grant select on table "public"."cities" to "authenticated";

grant trigger on table "public"."cities" to "authenticated";

grant truncate on table "public"."cities" to "authenticated";

grant update on table "public"."cities" to "authenticated";

grant delete on table "public"."cities" to "service_role";

grant insert on table "public"."cities" to "service_role";

grant references on table "public"."cities" to "service_role";

grant select on table "public"."cities" to "service_role";

grant trigger on table "public"."cities" to "service_role";

grant truncate on table "public"."cities" to "service_role";

grant update on table "public"."cities" to "service_role";

grant delete on table "public"."city_images" to "anon";

grant insert on table "public"."city_images" to "anon";

grant references on table "public"."city_images" to "anon";

grant select on table "public"."city_images" to "anon";

grant trigger on table "public"."city_images" to "anon";

grant truncate on table "public"."city_images" to "anon";

grant update on table "public"."city_images" to "anon";

grant delete on table "public"."city_images" to "authenticated";

grant insert on table "public"."city_images" to "authenticated";

grant references on table "public"."city_images" to "authenticated";

grant select on table "public"."city_images" to "authenticated";

grant trigger on table "public"."city_images" to "authenticated";

grant truncate on table "public"."city_images" to "authenticated";

grant update on table "public"."city_images" to "authenticated";

grant delete on table "public"."city_images" to "service_role";

grant insert on table "public"."city_images" to "service_role";

grant references on table "public"."city_images" to "service_role";

grant select on table "public"."city_images" to "service_role";

grant trigger on table "public"."city_images" to "service_role";

grant truncate on table "public"."city_images" to "service_role";

grant update on table "public"."city_images" to "service_role";

grant delete on table "public"."city_periods" to "anon";

grant insert on table "public"."city_periods" to "anon";

grant references on table "public"."city_periods" to "anon";

grant select on table "public"."city_periods" to "anon";

grant trigger on table "public"."city_periods" to "anon";

grant truncate on table "public"."city_periods" to "anon";

grant update on table "public"."city_periods" to "anon";

grant delete on table "public"."city_periods" to "authenticated";

grant insert on table "public"."city_periods" to "authenticated";

grant references on table "public"."city_periods" to "authenticated";

grant select on table "public"."city_periods" to "authenticated";

grant trigger on table "public"."city_periods" to "authenticated";

grant truncate on table "public"."city_periods" to "authenticated";

grant update on table "public"."city_periods" to "authenticated";

grant delete on table "public"."city_periods" to "service_role";

grant insert on table "public"."city_periods" to "service_role";

grant references on table "public"."city_periods" to "service_role";

grant select on table "public"."city_periods" to "service_role";

grant trigger on table "public"."city_periods" to "service_role";

grant truncate on table "public"."city_periods" to "service_role";

grant update on table "public"."city_periods" to "service_role";

grant delete on table "public"."city_tags" to "anon";

grant insert on table "public"."city_tags" to "anon";

grant references on table "public"."city_tags" to "anon";

grant select on table "public"."city_tags" to "anon";

grant trigger on table "public"."city_tags" to "anon";

grant truncate on table "public"."city_tags" to "anon";

grant update on table "public"."city_tags" to "anon";

grant delete on table "public"."city_tags" to "authenticated";

grant insert on table "public"."city_tags" to "authenticated";

grant references on table "public"."city_tags" to "authenticated";

grant select on table "public"."city_tags" to "authenticated";

grant trigger on table "public"."city_tags" to "authenticated";

grant truncate on table "public"."city_tags" to "authenticated";

grant update on table "public"."city_tags" to "authenticated";

grant delete on table "public"."city_tags" to "service_role";

grant insert on table "public"."city_tags" to "service_role";

grant references on table "public"."city_tags" to "service_role";

grant select on table "public"."city_tags" to "service_role";

grant trigger on table "public"."city_tags" to "service_role";

grant truncate on table "public"."city_tags" to "service_role";

grant update on table "public"."city_tags" to "service_role";

grant delete on table "public"."detail_sections" to "anon";

grant insert on table "public"."detail_sections" to "anon";

grant references on table "public"."detail_sections" to "anon";

grant select on table "public"."detail_sections" to "anon";

grant trigger on table "public"."detail_sections" to "anon";

grant truncate on table "public"."detail_sections" to "anon";

grant update on table "public"."detail_sections" to "anon";

grant delete on table "public"."detail_sections" to "authenticated";

grant insert on table "public"."detail_sections" to "authenticated";

grant references on table "public"."detail_sections" to "authenticated";

grant select on table "public"."detail_sections" to "authenticated";

grant trigger on table "public"."detail_sections" to "authenticated";

grant truncate on table "public"."detail_sections" to "authenticated";

grant update on table "public"."detail_sections" to "authenticated";

grant delete on table "public"."detail_sections" to "service_role";

grant insert on table "public"."detail_sections" to "service_role";

grant references on table "public"."detail_sections" to "service_role";

grant select on table "public"."detail_sections" to "service_role";

grant trigger on table "public"."detail_sections" to "service_role";

grant truncate on table "public"."detail_sections" to "service_role";

grant update on table "public"."detail_sections" to "service_role";

grant delete on table "public"."heritage_sites" to "anon";

grant insert on table "public"."heritage_sites" to "anon";

grant references on table "public"."heritage_sites" to "anon";

grant select on table "public"."heritage_sites" to "anon";

grant trigger on table "public"."heritage_sites" to "anon";

grant truncate on table "public"."heritage_sites" to "anon";

grant update on table "public"."heritage_sites" to "anon";

grant delete on table "public"."heritage_sites" to "authenticated";

grant insert on table "public"."heritage_sites" to "authenticated";

grant references on table "public"."heritage_sites" to "authenticated";

grant select on table "public"."heritage_sites" to "authenticated";

grant trigger on table "public"."heritage_sites" to "authenticated";

grant truncate on table "public"."heritage_sites" to "authenticated";

grant update on table "public"."heritage_sites" to "authenticated";

grant delete on table "public"."heritage_sites" to "service_role";

grant insert on table "public"."heritage_sites" to "service_role";

grant references on table "public"."heritage_sites" to "service_role";

grant select on table "public"."heritage_sites" to "service_role";

grant trigger on table "public"."heritage_sites" to "service_role";

grant truncate on table "public"."heritage_sites" to "service_role";

grant update on table "public"."heritage_sites" to "service_role";

grant delete on table "public"."images" to "anon";

grant insert on table "public"."images" to "anon";

grant references on table "public"."images" to "anon";

grant select on table "public"."images" to "anon";

grant trigger on table "public"."images" to "anon";

grant truncate on table "public"."images" to "anon";

grant update on table "public"."images" to "anon";

grant delete on table "public"."images" to "authenticated";

grant insert on table "public"."images" to "authenticated";

grant references on table "public"."images" to "authenticated";

grant select on table "public"."images" to "authenticated";

grant trigger on table "public"."images" to "authenticated";

grant truncate on table "public"."images" to "authenticated";

grant update on table "public"."images" to "authenticated";

grant delete on table "public"."images" to "service_role";

grant insert on table "public"."images" to "service_role";

grant references on table "public"."images" to "service_role";

grant select on table "public"."images" to "service_role";

grant trigger on table "public"."images" to "service_role";

grant truncate on table "public"."images" to "service_role";

grant update on table "public"."images" to "service_role";

grant delete on table "public"."opening_hours" to "anon";

grant insert on table "public"."opening_hours" to "anon";

grant references on table "public"."opening_hours" to "anon";

grant select on table "public"."opening_hours" to "anon";

grant trigger on table "public"."opening_hours" to "anon";

grant truncate on table "public"."opening_hours" to "anon";

grant update on table "public"."opening_hours" to "anon";

grant delete on table "public"."opening_hours" to "authenticated";

grant insert on table "public"."opening_hours" to "authenticated";

grant references on table "public"."opening_hours" to "authenticated";

grant select on table "public"."opening_hours" to "authenticated";

grant trigger on table "public"."opening_hours" to "authenticated";

grant truncate on table "public"."opening_hours" to "authenticated";

grant update on table "public"."opening_hours" to "authenticated";

grant delete on table "public"."opening_hours" to "service_role";

grant insert on table "public"."opening_hours" to "service_role";

grant references on table "public"."opening_hours" to "service_role";

grant select on table "public"."opening_hours" to "service_role";

grant trigger on table "public"."opening_hours" to "service_role";

grant truncate on table "public"."opening_hours" to "service_role";

grant update on table "public"."opening_hours" to "service_role";

grant delete on table "public"."periods" to "anon";

grant insert on table "public"."periods" to "anon";

grant references on table "public"."periods" to "anon";

grant select on table "public"."periods" to "anon";

grant trigger on table "public"."periods" to "anon";

grant truncate on table "public"."periods" to "anon";

grant update on table "public"."periods" to "anon";

grant delete on table "public"."periods" to "authenticated";

grant insert on table "public"."periods" to "authenticated";

grant references on table "public"."periods" to "authenticated";

grant select on table "public"."periods" to "authenticated";

grant trigger on table "public"."periods" to "authenticated";

grant truncate on table "public"."periods" to "authenticated";

grant update on table "public"."periods" to "authenticated";

grant delete on table "public"."periods" to "service_role";

grant insert on table "public"."periods" to "service_role";

grant references on table "public"."periods" to "service_role";

grant select on table "public"."periods" to "service_role";

grant trigger on table "public"."periods" to "service_role";

grant truncate on table "public"."periods" to "service_role";

grant update on table "public"."periods" to "service_role";

grant delete on table "public"."site_images" to "anon";

grant insert on table "public"."site_images" to "anon";

grant references on table "public"."site_images" to "anon";

grant select on table "public"."site_images" to "anon";

grant trigger on table "public"."site_images" to "anon";

grant truncate on table "public"."site_images" to "anon";

grant update on table "public"."site_images" to "anon";

grant delete on table "public"."site_images" to "authenticated";

grant insert on table "public"."site_images" to "authenticated";

grant references on table "public"."site_images" to "authenticated";

grant select on table "public"."site_images" to "authenticated";

grant trigger on table "public"."site_images" to "authenticated";

grant truncate on table "public"."site_images" to "authenticated";

grant update on table "public"."site_images" to "authenticated";

grant delete on table "public"."site_images" to "service_role";

grant insert on table "public"."site_images" to "service_role";

grant references on table "public"."site_images" to "service_role";

grant select on table "public"."site_images" to "service_role";

grant trigger on table "public"."site_images" to "service_role";

grant truncate on table "public"."site_images" to "service_role";

grant update on table "public"."site_images" to "service_role";

grant delete on table "public"."site_periods" to "anon";

grant insert on table "public"."site_periods" to "anon";

grant references on table "public"."site_periods" to "anon";

grant select on table "public"."site_periods" to "anon";

grant trigger on table "public"."site_periods" to "anon";

grant truncate on table "public"."site_periods" to "anon";

grant update on table "public"."site_periods" to "anon";

grant delete on table "public"."site_periods" to "authenticated";

grant insert on table "public"."site_periods" to "authenticated";

grant references on table "public"."site_periods" to "authenticated";

grant select on table "public"."site_periods" to "authenticated";

grant trigger on table "public"."site_periods" to "authenticated";

grant truncate on table "public"."site_periods" to "authenticated";

grant update on table "public"."site_periods" to "authenticated";

grant delete on table "public"."site_periods" to "service_role";

grant insert on table "public"."site_periods" to "service_role";

grant references on table "public"."site_periods" to "service_role";

grant select on table "public"."site_periods" to "service_role";

grant trigger on table "public"."site_periods" to "service_role";

grant truncate on table "public"."site_periods" to "service_role";

grant update on table "public"."site_periods" to "service_role";

grant delete on table "public"."site_tags" to "anon";

grant insert on table "public"."site_tags" to "anon";

grant references on table "public"."site_tags" to "anon";

grant select on table "public"."site_tags" to "anon";

grant trigger on table "public"."site_tags" to "anon";

grant truncate on table "public"."site_tags" to "anon";

grant update on table "public"."site_tags" to "anon";

grant delete on table "public"."site_tags" to "authenticated";

grant insert on table "public"."site_tags" to "authenticated";

grant references on table "public"."site_tags" to "authenticated";

grant select on table "public"."site_tags" to "authenticated";

grant trigger on table "public"."site_tags" to "authenticated";

grant truncate on table "public"."site_tags" to "authenticated";

grant update on table "public"."site_tags" to "authenticated";

grant delete on table "public"."site_tags" to "service_role";

grant insert on table "public"."site_tags" to "service_role";

grant references on table "public"."site_tags" to "service_role";

grant select on table "public"."site_tags" to "service_role";

grant trigger on table "public"."site_tags" to "service_role";

grant truncate on table "public"."site_tags" to "service_role";

grant update on table "public"."site_tags" to "service_role";

grant delete on table "public"."tags" to "anon";

grant insert on table "public"."tags" to "anon";

grant references on table "public"."tags" to "anon";

grant select on table "public"."tags" to "anon";

grant trigger on table "public"."tags" to "anon";

grant truncate on table "public"."tags" to "anon";

grant update on table "public"."tags" to "anon";

grant delete on table "public"."tags" to "authenticated";

grant insert on table "public"."tags" to "authenticated";

grant references on table "public"."tags" to "authenticated";

grant select on table "public"."tags" to "authenticated";

grant trigger on table "public"."tags" to "authenticated";

grant truncate on table "public"."tags" to "authenticated";

grant update on table "public"."tags" to "authenticated";

grant delete on table "public"."tags" to "service_role";

grant insert on table "public"."tags" to "service_role";

grant references on table "public"."tags" to "service_role";

grant select on table "public"."tags" to "service_role";

grant trigger on table "public"."tags" to "service_role";

grant truncate on table "public"."tags" to "service_role";

grant update on table "public"."tags" to "service_role";

grant delete on table "public"."time_slots" to "anon";

grant insert on table "public"."time_slots" to "anon";

grant references on table "public"."time_slots" to "anon";

grant select on table "public"."time_slots" to "anon";

grant trigger on table "public"."time_slots" to "anon";

grant truncate on table "public"."time_slots" to "anon";

grant update on table "public"."time_slots" to "anon";

grant delete on table "public"."time_slots" to "authenticated";

grant insert on table "public"."time_slots" to "authenticated";

grant references on table "public"."time_slots" to "authenticated";

grant select on table "public"."time_slots" to "authenticated";

grant trigger on table "public"."time_slots" to "authenticated";

grant truncate on table "public"."time_slots" to "authenticated";

grant update on table "public"."time_slots" to "authenticated";

grant delete on table "public"."time_slots" to "service_role";

grant insert on table "public"."time_slots" to "service_role";

grant references on table "public"."time_slots" to "service_role";

grant select on table "public"."time_slots" to "service_role";

grant trigger on table "public"."time_slots" to "service_role";

grant truncate on table "public"."time_slots" to "service_role";

grant update on table "public"."time_slots" to "service_role";

create policy "Enable full access for all users"
on "public"."cities"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable full access for all users"
on "public"."city_images"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable full access for all users"
on "public"."city_periods"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable full access for all users"
on "public"."city_tags"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable full access for all users"
on "public"."detail_sections"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable full access for all users"
on "public"."heritage_sites"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable full access for all users"
on "public"."images"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable full access for all users"
on "public"."opening_hours"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable full access for all users"
on "public"."periods"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable full access for all users"
on "public"."site_images"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable full access for all users"
on "public"."site_periods"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable full access for all users"
on "public"."site_tags"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable full access for all users"
on "public"."tags"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable full access for all users"
on "public"."time_slots"
as permissive
for all
to public
using (true)
with check (true);



