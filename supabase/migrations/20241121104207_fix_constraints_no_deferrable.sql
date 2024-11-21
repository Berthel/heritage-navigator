-- Fix constraints without DEFERRABLE
BEGIN;

-- Drop existing constraint hvis den findes
ALTER TABLE periods 
DROP CONSTRAINT IF EXISTS periods_time_check;

-- Tilføj constraint uden DEFERRABLE
ALTER TABLE periods 
ADD CONSTRAINT periods_time_check 
CHECK (
    (start_year IS NULL AND end_year IS NULL) OR
    (start_year IS NULL AND end_year IS NOT NULL) OR
    (start_year IS NOT NULL AND end_year IS NULL) OR
    (start_year < end_year)
);

-- Verificer at point extension er tilgængelig
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tilføj spatial index
CREATE INDEX IF NOT EXISTS idx_heritage_sites_location 
ON heritage_sites USING gist (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326));

-- Tilføj performance indexes
CREATE INDEX IF NOT EXISTS idx_heritage_sites_status 
ON heritage_sites(status);

CREATE INDEX IF NOT EXISTS idx_heritage_sites_city_period 
ON heritage_sites(city_id, primary_period);

CREATE INDEX IF NOT EXISTS idx_periods_timespan 
ON periods(order_number, start_year, end_year);

-- Opdater images index til at bruge GIN
DROP INDEX IF EXISTS idx_images_contexts;
CREATE INDEX IF NOT EXISTS idx_images_contexts_gin 
ON images USING gin(contexts);

-- Tilføj manglende constraints på opening_hours
ALTER TABLE opening_hours
DROP CONSTRAINT IF EXISTS opening_hours_dates_check,
ADD CONSTRAINT opening_hours_dates_check
CHECK (
    (type = 'regular' AND valid_from IS NULL AND valid_to IS NULL) OR
    (type IN ('seasonal', 'special') AND valid_from IS NOT NULL AND valid_to IS NOT NULL AND valid_from <= valid_to)
);

COMMIT;

-- Rollback hvis noget går galt
BEGIN;

DROP INDEX IF EXISTS idx_heritage_sites_location;
DROP INDEX IF EXISTS idx_heritage_sites_status;
DROP INDEX IF EXISTS idx_heritage_sites_city_period;
DROP INDEX IF EXISTS idx_periods_timespan;
DROP INDEX IF EXISTS idx_images_contexts_gin;

ALTER TABLE periods 
DROP CONSTRAINT IF EXISTS periods_time_check;

ALTER TABLE opening_hours
DROP CONSTRAINT IF EXISTS opening_hours_dates_check;

COMMIT;