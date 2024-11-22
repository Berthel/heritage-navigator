
-- Migrer produktionsdata fra gamle tabeller til nye tabeller
BEGIN;

-- Først opretter vi de nye tabeller
CREATE TABLE IF NOT EXISTS cities (
    id text PRIMARY KEY,
    name_da text NOT NULL,
    name_en text NOT NULL,
    name_pt text NOT NULL,
    description_da text NOT NULL,
    description_en text NOT NULL,
    description_pt text NOT NULL,
    country text NOT NULL,
    region text NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    bounds_ne_lat double precision NOT NULL,
    bounds_ne_lng double precision NOT NULL,
    bounds_sw_lat double precision NOT NULL,
    bounds_sw_lng double precision NOT NULL,
    default_zoom integer NOT NULL,
    primary_image text,
    status text NOT NULL
);

CREATE TABLE IF NOT EXISTS periods (
    id text PRIMARY KEY,
    name_da text NOT NULL,
    name_en text NOT NULL,
    name_pt text NOT NULL,
    description_da text NOT NULL,
    description_en text NOT NULL,
    description_pt text NOT NULL,
    order_number integer NOT NULL,
    color text NOT NULL,
    start_year integer,
    end_year integer
);

CREATE TABLE IF NOT EXISTS heritage_sites (
    id text PRIMARY KEY,
    city_id text NOT NULL REFERENCES cities(id),
    name_da text NOT NULL,
    name_en text NOT NULL,
    name_pt text NOT NULL,
    description_da text NOT NULL,
    description_en text NOT NULL,
    description_pt text NOT NULL,
    accessibility_da text,
    accessibility_en text,
    accessibility_pt text,
    thumbnail_image text NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    address text,
    primary_period text NOT NULL REFERENCES periods(id),
    status text NOT NULL,
    last_updated timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS images (
    id text PRIMARY KEY,
    url text NOT NULL,
    alt_da text NOT NULL,
    alt_en text NOT NULL,
    alt_pt text NOT NULL,
    caption_da text,
    caption_en text,
    caption_pt text,
    credit text,
    year integer,
    period_id text REFERENCES periods(id),
    order_number integer NOT NULL,
    thumbnail_url text,
    medium_url text,
    large_url text,
    width integer NOT NULL,
    height integer NOT NULL,
    contexts text[] NOT NULL
);

CREATE TABLE IF NOT EXISTS site_images (
    site_id text NOT NULL REFERENCES heritage_sites(id),
    image_id text NOT NULL REFERENCES images(id),
    PRIMARY KEY (site_id, image_id)
);

CREATE TABLE IF NOT EXISTS city_images (
    city_id text NOT NULL REFERENCES cities(id),
    image_id text NOT NULL REFERENCES images(id),
    PRIMARY KEY (city_id, image_id)
);

-- Så migrerer vi data

-- 1. Migrer HistoricalPeriod til periods
INSERT INTO periods (id, name_da, name_en, name_pt, description_da, description_en, description_pt, order_number, color, start_year, end_year)
SELECT 
    id,
    name as name_da,  -- Brug engelsk som default for dansk
    name as name_en,
    name as name_pt,  -- Brug engelsk som default for portugisisk
    description as description_da,  -- Brug engelsk som default for dansk
    description as description_en,
    description as description_pt,  -- Brug engelsk som default for portugisisk
    ROW_NUMBER() OVER (ORDER BY "startYear") as order_number,
    COALESCE(color, '#000000') as color,
    "startYear" as start_year,
    "endYear" as end_year
FROM "HistoricalPeriod"
ON CONFLICT (id) DO NOTHING;

-- 2. Migrer Image til images
INSERT INTO images (id, url, alt_da, alt_en, alt_pt, caption_da, caption_en, caption_pt, credit, order_number, width, height, contexts)
SELECT 
    id,
    url,
    COALESCE(caption, '') as alt_da,  -- Brug caption som alt text
    COALESCE(caption, '') as alt_en,
    COALESCE(caption, '') as alt_pt,
    caption as caption_da,
    caption as caption_en,
    caption as caption_pt,
    credit,
    ROW_NUMBER() OVER (ORDER BY "createdAt") as order_number,
    1920 as width,  -- Default værdier da de gamle billeder ikke har dimensioner
    1080 as height,
    ARRAY['gallery'] as contexts
FROM "Image"
ON CONFLICT (id) DO NOTHING;

-- 3. Migrer Site til heritage_sites
-- Først opretter vi en dummy by hvis den ikke findes
INSERT INTO cities (id, name_da, name_en, name_pt, description_da, description_en, description_pt, 
                   country, region, latitude, longitude, bounds_ne_lat, bounds_ne_lng, 
                   bounds_sw_lat, bounds_sw_lng, default_zoom, primary_image, status)
SELECT 
    'tavira',
    'Tavira',
    'Tavira',
    'Tavira',
    'En historisk by i Algarve',
    'A historic town in Algarve',
    'Uma cidade histórica no Algarve',
    'Portugal',
    'Algarve',
    37.1283,
    -7.6506,
    37.1383,
    -7.6406,
    37.1183,
    -7.6606,
    14,
    'tavira_main.jpg',
    'active'
WHERE NOT EXISTS (SELECT 1 FROM cities WHERE id = 'tavira');

-- Så migrerer vi sites
INSERT INTO heritage_sites (id, city_id, name_da, name_en, name_pt, description_da, description_en, description_pt,
                          accessibility_da, accessibility_en, accessibility_pt, thumbnail_image, 
                          latitude, longitude, address, primary_period, status)
SELECT 
    id,
    'tavira' as city_id,  -- Alle sites tilknyttes Tavira
    name as name_da,
    name as name_en,
    name as name_pt,
    description as description_da,
    description as description_en,
    description as description_pt,
    accessibility as accessibility_da,
    accessibility as accessibility_en,
    accessibility as accessibility_pt,
    COALESCE((SELECT url FROM "Image" WHERE "siteId" = "Site".id LIMIT 1), 'default.jpg') as thumbnail_image,
    latitude,
    longitude,
    address,
    "periodId" as primary_period,
    'active' as status
FROM "Site"
ON CONFLICT (id) DO NOTHING;

-- 4. Opret relationer mellem sites og billeder
INSERT INTO site_images (site_id, image_id)
SELECT "siteId", id
FROM "Image"
WHERE "siteId" IS NOT NULL
ON CONFLICT DO NOTHING;

COMMIT;