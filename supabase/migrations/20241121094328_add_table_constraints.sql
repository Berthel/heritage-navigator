-- Initial schema setup and constraints for Heritage Navigator
BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create cities table
CREATE TABLE cities (
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
    status TEXT NOT NULL,
    last_updated TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT cities_status_check CHECK (status IN ('active', 'coming_soon', 'inactive'))
);

-- Create periods table
CREATE TABLE periods (
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
    end_year INTEGER,
    CONSTRAINT periods_time_check CHECK (start_year IS NULL OR end_year IS NULL OR start_year < end_year)
);

-- Create heritage_sites table
CREATE TABLE heritage_sites (
    id TEXT PRIMARY KEY,
    city_id TEXT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
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
    primary_period TEXT NOT NULL REFERENCES periods(id),
    status TEXT NOT NULL,
    last_updated TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT heritage_sites_status_check CHECK (status IN ('active', 'temporary_closed', 'permanently_closed'))
);

-- Create tags table
CREATE TABLE tags (
    id TEXT PRIMARY KEY,
    name_da TEXT NOT NULL,
    name_en TEXT NOT NULL,
    name_pt TEXT NOT NULL,
    type TEXT
);

-- Create images table
CREATE TABLE images (
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
    period_id TEXT REFERENCES periods(id) ON DELETE SET NULL,
    order_number INTEGER NOT NULL,
    thumbnail_url TEXT,
    medium_url TEXT,
    large_url TEXT,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    contexts TEXT[] NOT NULL
);

-- Create opening_hours table
CREATE TABLE opening_hours (
    id TEXT PRIMARY KEY,
    site_id TEXT NOT NULL REFERENCES heritage_sites(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    valid_from DATE,
    valid_to DATE,
    metadata JSONB,
    CONSTRAINT opening_hours_type_check CHECK (type IN ('regular', 'seasonal', 'special'))
);

-- Create time_slots table
CREATE TABLE time_slots (
    id TEXT PRIMARY KEY,
    opening_hours_id TEXT NOT NULL REFERENCES opening_hours(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL,
    opens TIME NOT NULL,
    closes TIME NOT NULL,
    CONSTRAINT time_slots_day_check CHECK (day_of_week BETWEEN 0 AND 6)
);

-- Create detail sections table
CREATE TABLE detail_sections (
    id TEXT PRIMARY KEY,
    site_id TEXT NOT NULL REFERENCES heritage_sites(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('text', 'image', 'gallery')),
    content_da TEXT,
    content_en TEXT,
    content_pt TEXT,
    image_layout TEXT,
    order_number INTEGER NOT NULL,
    gallery_images TEXT[],
    CONSTRAINT detail_sections_layout_check CHECK (image_layout IS NULL OR image_layout IN ('left', 'right', 'full'))
);

-- Create junction tables with appropriate constraints
CREATE TABLE site_periods (
    site_id TEXT NOT NULL REFERENCES heritage_sites(id) ON DELETE CASCADE,
    period_id TEXT NOT NULL REFERENCES periods(id) ON DELETE CASCADE,
    PRIMARY KEY (site_id, period_id)
);

CREATE TABLE site_images (
    site_id TEXT NOT NULL REFERENCES heritage_sites(id) ON DELETE CASCADE,
    image_id TEXT NOT NULL REFERENCES images(id) ON DELETE CASCADE,
    PRIMARY KEY (site_id, image_id)
);

CREATE TABLE site_tags (
    site_id TEXT NOT NULL REFERENCES heritage_sites(id) ON DELETE CASCADE,
    tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (site_id, tag_id)
);

CREATE TABLE city_periods (
    city_id TEXT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    period_id TEXT NOT NULL REFERENCES periods(id) ON DELETE CASCADE,
    PRIMARY KEY (city_id, period_id)
);

CREATE TABLE city_images (
    city_id TEXT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    image_id TEXT NOT NULL REFERENCES images(id) ON DELETE CASCADE,
    PRIMARY KEY (city_id, image_id)
);

CREATE TABLE city_tags (
    city_id TEXT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
    tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (city_id, tag_id)
);

COMMIT;

-- Down migration
BEGIN;

DROP TABLE IF EXISTS city_tags;
DROP TABLE IF EXISTS city_images;
DROP TABLE IF EXISTS city_periods;
DROP TABLE IF EXISTS site_tags;
DROP TABLE IF EXISTS site_images;
DROP TABLE IF EXISTS site_periods;
DROP TABLE IF EXISTS detail_sections;
DROP TABLE IF EXISTS time_slots;
DROP TABLE IF EXISTS opening_hours;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS heritage_sites;
DROP TABLE IF EXISTS periods;
DROP TABLE IF EXISTS cities;

COMMIT;