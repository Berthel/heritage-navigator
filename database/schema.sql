-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Periods table
CREATE TABLE IF NOT EXISTS periods (
  id TEXT PRIMARY KEY,
  name_da TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_pt TEXT NOT NULL,
  description_da TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_pt TEXT NOT NULL,
  order_number INTEGER NOT NULL,
  color TEXT NOT NULL,
  start_year INTEGER,
  end_year INTEGER
);

-- Cities table
CREATE TABLE IF NOT EXISTS cities (
  id TEXT PRIMARY KEY,
  name_da TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_pt TEXT NOT NULL,
  description_da TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_pt TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  bounds_ne_lat DOUBLE PRECISION NOT NULL,
  bounds_ne_lng DOUBLE PRECISION NOT NULL,
  bounds_sw_lat DOUBLE PRECISION NOT NULL,
  bounds_sw_lng DOUBLE PRECISION NOT NULL,
  default_zoom INTEGER NOT NULL,
  primary_image TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'coming_soon', 'inactive')),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Images table with contexts array
CREATE TABLE IF NOT EXISTS images (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  alt_da TEXT NOT NULL,
  alt_en TEXT NOT NULL,
  alt_pt TEXT NOT NULL,
  caption_da TEXT,
  caption_en TEXT,
  caption_pt TEXT,
  credit TEXT,
  year INTEGER,
  period_id TEXT REFERENCES periods(id),
  order_number INTEGER NOT NULL,
  thumbnail_url TEXT,
  medium_url TEXT,
  large_url TEXT,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  contexts TEXT[] NOT NULL CHECK (contexts <@ ARRAY['thumbnail', 'gallery', 'banner', 'description'])
);

-- Heritage Sites table
CREATE TABLE IF NOT EXISTS heritage_sites (
  id TEXT PRIMARY KEY,
  city_id TEXT NOT NULL REFERENCES cities(id),
  name_da TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_pt TEXT NOT NULL,
  description_da TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_pt TEXT NOT NULL,
  accessibility_da TEXT,
  accessibility_en TEXT,
  accessibility_pt TEXT,
  thumbnail_image TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  address TEXT,
  primary_period TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'temporary_closed', 'permanently_closed')),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name_da TEXT NOT NULL,
  name_en TEXT NOT NULL,
  name_pt TEXT NOT NULL,
  type TEXT
);

-- Opening Hours table
CREATE TABLE IF NOT EXISTS opening_hours (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES heritage_sites(id),
  type TEXT NOT NULL CHECK (type IN ('regular', 'seasonal', 'special')),
  valid_from DATE,
  valid_to DATE,
  metadata JSONB
);

-- Time Slots table
CREATE TABLE IF NOT EXISTS time_slots (
  id TEXT PRIMARY KEY,
  opening_hours_id TEXT NOT NULL REFERENCES opening_hours(id),
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  opens TIME NOT NULL,
  closes TIME NOT NULL
);

-- Detail Sections table
CREATE TABLE IF NOT EXISTS detail_sections (
  id TEXT PRIMARY KEY,
  site_id TEXT NOT NULL REFERENCES heritage_sites(id),
  type TEXT NOT NULL CHECK (type IN ('text', 'image', 'gallery')),
  content_da TEXT,
  content_en TEXT,
  content_pt TEXT,
  image_layout TEXT CHECK (image_layout IN ('left', 'right', 'full')),
  order_number INTEGER NOT NULL,
  gallery_images TEXT[]
);

-- Relation tables
CREATE TABLE IF NOT EXISTS site_periods (
  site_id TEXT NOT NULL REFERENCES heritage_sites(id),
  period_id TEXT NOT NULL REFERENCES periods(id),
  PRIMARY KEY (site_id, period_id)
);

CREATE TABLE IF NOT EXISTS site_images (
  site_id TEXT NOT NULL REFERENCES heritage_sites(id),
  image_id TEXT NOT NULL REFERENCES images(id),
  PRIMARY KEY (site_id, image_id)
);

CREATE TABLE IF NOT EXISTS site_tags (
  site_id TEXT NOT NULL REFERENCES heritage_sites(id),
  tag_id TEXT NOT NULL REFERENCES tags(id),
  PRIMARY KEY (site_id, tag_id)
);

CREATE TABLE IF NOT EXISTS city_periods (
  city_id TEXT NOT NULL REFERENCES cities(id),
  period_id TEXT NOT NULL REFERENCES periods(id),
  PRIMARY KEY (city_id, period_id)
);

CREATE TABLE IF NOT EXISTS city_images (
  city_id TEXT NOT NULL REFERENCES cities(id),
  image_id TEXT NOT NULL REFERENCES images(id),
  PRIMARY KEY (city_id, image_id)
);

CREATE TABLE IF NOT EXISTS city_tags (
  city_id TEXT NOT NULL REFERENCES cities(id),
  tag_id TEXT NOT NULL REFERENCES tags(id),
  PRIMARY KEY (city_id, tag_id)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_heritage_sites_city_id ON heritage_sites(city_id);
CREATE INDEX IF NOT EXISTS idx_heritage_sites_primary_period ON heritage_sites(primary_period);
CREATE INDEX IF NOT EXISTS idx_images_period_id ON images(period_id);
CREATE INDEX IF NOT EXISTS idx_opening_hours_site_id ON opening_hours(site_id);
CREATE INDEX IF NOT EXISTS idx_time_slots_opening_hours_id ON time_slots(opening_hours_id);
CREATE INDEX IF NOT EXISTS idx_detail_sections_site_id ON detail_sections(site_id);

-- Add GiST index for array operations
CREATE INDEX IF NOT EXISTS idx_images_contexts ON images USING gin(contexts);

-- Add GIN index for JSONB operations
CREATE INDEX IF NOT EXISTS idx_opening_hours_metadata ON opening_hours USING gin(metadata);

-- Enable Row Level Security
ALTER TABLE periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE heritage_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE opening_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE detail_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON periods FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON cities FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON images FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON heritage_sites FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON tags FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON opening_hours FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON time_slots FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON detail_sections FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON site_periods FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON site_images FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON site_tags FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON city_periods FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON city_images FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON city_tags FOR SELECT USING (true);
