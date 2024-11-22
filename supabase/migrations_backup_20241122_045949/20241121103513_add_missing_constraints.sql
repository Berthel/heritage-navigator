-- Tilføj constraints til periods tabellen og opdater foreign key behavior
BEGIN;

-- Tilføj tidspan check til periods
ALTER TABLE periods 
ADD CONSTRAINT periods_time_check 
CHECK (start_year IS NULL OR end_year IS NULL OR start_year < end_year);

-- Tilføj GiST index for geografisk søgning
CREATE INDEX IF NOT EXISTS idx_heritage_sites_location 
ON heritage_sites USING gist (point(longitude, latitude));

-- Tilføj indexes for bedre performance på ofte brugte queries
CREATE INDEX IF NOT EXISTS idx_heritage_sites_status ON heritage_sites(status);
CREATE INDEX IF NOT EXISTS idx_heritage_sites_city_period 
ON heritage_sites(city_id, primary_period);

-- Tilføj index på periods for tidsperiode søgning
CREATE INDEX IF NOT EXISTS idx_periods_timespan 
ON periods(order_number, start_year, end_year);

-- Tilføj index på images for hurtigere context filtrering
CREATE INDEX IF NOT EXISTS idx_images_contexts_gin 
ON images USING gin(contexts);

COMMIT;

-- Rollback i tilfælde af fejl
BEGIN;

DROP INDEX IF EXISTS idx_heritage_sites_location;
DROP INDEX IF EXISTS idx_heritage_sites_status;
DROP INDEX IF EXISTS idx_heritage_sites_city_period;
DROP INDEX IF EXISTS idx_periods_timespan;
DROP INDEX IF EXISTS idx_images_contexts_gin;

ALTER TABLE periods 
DROP CONSTRAINT IF EXISTS periods_time_check;

COMMIT;