-- Start transaction
BEGIN;

-- Create languages table
CREATE TABLE IF NOT EXISTS "public"."languages" (
    "code" text PRIMARY KEY,
    "name" text NOT NULL,
    "native_name" text NOT NULL,
    "active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT now(),
    "updated_at" timestamp with time zone DEFAULT now()
);

-- Create translation tables for each entity type
CREATE TABLE IF NOT EXISTS "public"."heritage_site_translations" (
    "site_id" text REFERENCES heritage_sites(id) ON DELETE CASCADE,
    "language_code" text REFERENCES languages(code) ON DELETE CASCADE,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "accessibility" text,
    "created_at" timestamp with time zone DEFAULT now(),
    "updated_at" timestamp with time zone DEFAULT now(),
    PRIMARY KEY (site_id, language_code)
);

CREATE TABLE IF NOT EXISTS "public"."period_translations" (
    "period_id" text REFERENCES periods(id) ON DELETE CASCADE,
    "language_code" text REFERENCES languages(code) ON DELETE CASCADE,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now(),
    "updated_at" timestamp with time zone DEFAULT now(),
    PRIMARY KEY (period_id, language_code)
);

CREATE TABLE IF NOT EXISTS "public"."city_translations" (
    "city_id" text REFERENCES cities(id) ON DELETE CASCADE,
    "language_code" text REFERENCES languages(code) ON DELETE CASCADE,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now(),
    "updated_at" timestamp with time zone DEFAULT now(),
    PRIMARY KEY (city_id, language_code)
);

CREATE TABLE IF NOT EXISTS "public"."image_translations" (
    "image_id" text REFERENCES images(id) ON DELETE CASCADE,
    "language_code" text REFERENCES languages(code) ON DELETE CASCADE,
    "alt" text NOT NULL,
    "caption" text,
    "created_at" timestamp with time zone DEFAULT now(),
    "updated_at" timestamp with time zone DEFAULT now(),
    PRIMARY KEY (image_id, language_code)
);

-- Create language support tables
CREATE TABLE IF NOT EXISTS "public"."city_languages" (
    "city_id" text REFERENCES cities(id) ON DELETE CASCADE,
    "language_code" text REFERENCES languages(code) ON DELETE CASCADE,
    "is_default" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT now(),
    PRIMARY KEY (city_id, language_code)
);

CREATE TABLE IF NOT EXISTS "public"."heritage_site_languages" (
    "site_id" text REFERENCES heritage_sites(id) ON DELETE CASCADE,
    "language_code" text REFERENCES languages(code) ON DELETE CASCADE,
    "is_default" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT now(),
    PRIMARY KEY (site_id, language_code)
);

-- Create translation status tracking
CREATE TABLE IF NOT EXISTS "public"."translation_status" (
    "entity_type" text NOT NULL,
    "entity_id" text NOT NULL,
    "language_code" text REFERENCES languages(code) ON DELETE CASCADE,
    "status" text NOT NULL,
    "last_updated" timestamp with time zone DEFAULT now(),
    PRIMARY KEY (entity_type, entity_id, language_code),
    CONSTRAINT translation_status_status_check CHECK (status IN ('pending', 'in_progress', 'completed'))
);

-- Insert initial language data
INSERT INTO languages (code, name, native_name, active) VALUES
    ('da', 'Danish', 'Dansk', true),
    ('en', 'English', 'English', true),
    ('pt', 'Portuguese', 'Português', true)
ON CONFLICT (code) DO NOTHING;

-- Migrate existing translations for heritage sites
INSERT INTO heritage_site_translations (site_id, language_code, name, description, accessibility)
SELECT 
    id,
    'da',
    name_da,
    description_da,
    accessibility_da
FROM heritage_sites;

INSERT INTO heritage_site_translations (site_id, language_code, name, description, accessibility)
SELECT 
    id,
    'en',
    name_en,
    description_en,
    accessibility_en
FROM heritage_sites;

INSERT INTO heritage_site_translations (site_id, language_code, name, description, accessibility)
SELECT 
    id,
    'pt',
    name_pt,
    description_pt,
    accessibility_pt
FROM heritage_sites;

-- Migrate existing translations for cities
INSERT INTO city_translations (city_id, language_code, name, description)
SELECT 
    id,
    'da',
    name_da,
    description_da
FROM cities;

INSERT INTO city_translations (city_id, language_code, name, description)
SELECT 
    id,
    'en',
    name_en,
    description_en
FROM cities;

INSERT INTO city_translations (city_id, language_code, name, description)
SELECT 
    id,
    'pt',
    name_pt,
    description_pt
FROM cities;

-- Migrate existing translations for periods
INSERT INTO period_translations (period_id, language_code, name, description)
SELECT 
    id,
    'da',
    name_da,
    description_da
FROM periods;

INSERT INTO period_translations (period_id, language_code, name, description)
SELECT 
    id,
    'en',
    name_en,
    description_en
FROM periods;

INSERT INTO period_translations (period_id, language_code, name, description)
SELECT 
    id,
    'pt',
    name_pt,
    description_pt
FROM periods;

-- Migrate existing translations for images
INSERT INTO image_translations (image_id, language_code, alt, caption)
SELECT 
    id,
    'da',
    alt_da,
    caption_da
FROM images;

INSERT INTO image_translations (image_id, language_code, alt, caption)
SELECT 
    id,
    'en',
    alt_en,
    caption_en
FROM images;

INSERT INTO image_translations (image_id, language_code, alt, caption)
SELECT 
    id,
    'pt',
    alt_pt,
    caption_pt
FROM images;

-- Set up language support for existing content
INSERT INTO city_languages (city_id, language_code, is_default)
SELECT 
    id as city_id,
    'en' as language_code,
    true as is_default
FROM cities;

INSERT INTO heritage_site_languages (site_id, language_code, is_default)
SELECT 
    id as site_id,
    'en' as language_code,
    true as is_default
FROM heritage_sites;

-- Add non-default languages
INSERT INTO city_languages (city_id, language_code, is_default)
SELECT id, 'da', false FROM cities
UNION
SELECT id, 'pt', false FROM cities;

INSERT INTO heritage_site_languages (site_id, language_code, is_default)
SELECT id, 'da', false FROM heritage_sites
UNION
SELECT id, 'pt', false FROM heritage_sites;

-- Set all existing translations as completed
INSERT INTO translation_status (entity_type, entity_id, language_code, status)
SELECT DISTINCT 'heritage_site', site_id, language_code, 'completed' 
FROM heritage_site_translations;

INSERT INTO translation_status (entity_type, entity_id, language_code, status)
SELECT DISTINCT 'city', city_id, language_code, 'completed' 
FROM city_translations;

INSERT INTO translation_status (entity_type, entity_id, language_code, status)
SELECT DISTINCT 'period', period_id, language_code, 'completed' 
FROM period_translations;

INSERT INTO translation_status (entity_type, entity_id, language_code, status)
SELECT DISTINCT 'image', image_id, language_code, 'completed' 
FROM image_translations;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_heritage_site_translations_lang ON heritage_site_translations(language_code);
CREATE INDEX IF NOT EXISTS idx_city_translations_lang ON city_translations(language_code);
CREATE INDEX IF NOT EXISTS idx_period_translations_lang ON period_translations(language_code);
CREATE INDEX IF NOT EXISTS idx_image_translations_lang ON image_translations(language_code);
CREATE INDEX IF NOT EXISTS idx_translation_status_entity ON translation_status(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_translation_status_language ON translation_status(language_code);
CREATE INDEX IF NOT EXISTS idx_city_languages_city ON city_languages(city_id);
CREATE INDEX IF NOT EXISTS idx_heritage_site_languages_site ON heritage_site_languages(site_id);

-- Add RLS policies
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE heritage_site_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE period_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE heritage_site_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_status ENABLE ROW LEVEL SECURITY;

-- Create read-only policies
CREATE POLICY "Enable read access for all users" ON languages FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON heritage_site_translations FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON city_translations FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON period_translations FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON image_translations FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON city_languages FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON heritage_site_languages FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON translation_status FOR SELECT USING (true);

-- Grant permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE languages;
ALTER PUBLICATION supabase_realtime ADD TABLE heritage_site_translations;
ALTER PUBLICATION supabase_realtime ADD TABLE city_translations;
ALTER PUBLICATION supabase_realtime ADD TABLE period_translations;
ALTER PUBLICATION supabase_realtime ADD TABLE image_translations;
ALTER PUBLICATION supabase_realtime ADD TABLE city_languages;
ALTER PUBLICATION supabase_realtime ADD TABLE heritage_site_languages;
ALTER PUBLICATION supabase_realtime ADD TABLE translation_status;

COMMIT;