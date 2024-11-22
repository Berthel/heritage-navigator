-- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- Add geometry columns and convert existing coordinates
BEGIN;

-- Add geometry column to cities if it doesn't exist
ALTER TABLE cities ADD COLUMN IF NOT EXISTS geom geometry(Point, 4326);

-- Convert existing lat/long to geometry
UPDATE cities 
SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
WHERE geom IS NULL;

-- Create spatial index
CREATE INDEX IF NOT EXISTS idx_cities_geom ON cities USING GIST (geom);

-- Add trigger to keep lat/long in sync with geometry
CREATE OR REPLACE FUNCTION sync_cities_coords()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR NEW.geom IS NULL THEN
        NEW.geom := ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
    ELSE
        NEW.latitude := ST_Y(NEW.geom);
        NEW.longitude := ST_X(NEW.geom);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS cities_sync_coords ON cities;
CREATE TRIGGER cities_sync_coords
BEFORE INSERT OR UPDATE ON cities
FOR EACH ROW EXECUTE FUNCTION sync_cities_coords();

-- Add geometry column to heritage_sites if it doesn't exist
ALTER TABLE heritage_sites ADD COLUMN IF NOT EXISTS geom geometry(Point, 4326);

-- Convert existing lat/long to geometry
UPDATE heritage_sites 
SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
WHERE geom IS NULL;

-- Create spatial index
CREATE INDEX IF NOT EXISTS idx_heritage_sites_geom ON heritage_sites USING GIST (geom);

-- Add trigger to keep lat/long in sync with geometry
CREATE OR REPLACE FUNCTION sync_heritage_sites_coords()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR NEW.geom IS NULL THEN
        NEW.geom := ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
    ELSE
        NEW.latitude := ST_Y(NEW.geom);
        NEW.longitude := ST_X(NEW.geom);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS heritage_sites_sync_coords ON heritage_sites;
CREATE TRIGGER heritage_sites_sync_coords
BEFORE INSERT OR UPDATE ON heritage_sites
FOR EACH ROW EXECUTE FUNCTION sync_heritage_sites_coords();

COMMIT;
