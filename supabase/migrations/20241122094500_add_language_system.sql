-- Phase 2A: Language System Foundation

-- Create languages table
CREATE TABLE "public"."languages" (
    "code" text PRIMARY KEY,
    "name" text NOT NULL,
    "native_name" text NOT NULL,
    "active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT now(),
    "updated_at" timestamp with time zone DEFAULT now()
);

-- Add initial language data
INSERT INTO "public"."languages" (code, name, native_name, active) VALUES
    ('da', 'Danish', 'Dansk', true),
    ('en', 'English', 'English', true),
    ('pt', 'Portuguese', 'Português', true);

-- Create city_languages table
CREATE TABLE "public"."city_languages" (
    "city_id" text REFERENCES cities(id) ON DELETE CASCADE,
    "language_code" text REFERENCES languages(code) ON DELETE CASCADE,
    "is_default" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT now(),
    PRIMARY KEY (city_id, language_code)
);

-- Create a function to enforce single default language per city
CREATE OR REPLACE FUNCTION check_single_default_language()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_default THEN
        -- If this is being set as default, ensure no other language for this city is default
        UPDATE city_languages 
        SET is_default = false
        WHERE city_id = NEW.city_id 
        AND language_code != NEW.language_code;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to enforce single default language
CREATE TRIGGER ensure_single_default_language
    BEFORE INSERT OR UPDATE ON city_languages
    FOR EACH ROW
    EXECUTE FUNCTION check_single_default_language();

-- Enable Row Level Security
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_languages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON languages FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON city_languages FOR SELECT USING (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_city_languages_city_id ON city_languages(city_id);
CREATE INDEX IF NOT EXISTS idx_city_languages_language_code ON city_languages(language_code);
CREATE INDEX IF NOT EXISTS idx_city_languages_is_default ON city_languages(is_default);
