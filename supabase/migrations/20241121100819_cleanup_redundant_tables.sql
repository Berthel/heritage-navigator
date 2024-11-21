-- Migration fil: supabase/migrations/[timestamp]_cleanup_redundant_tables.sql
BEGIN;

-- Først verificerer vi at data er blevet migreret korrekt
DO $$ 
DECLARE
    site_count integer;
    heritage_site_count integer;
    period_count integer;
    image_count integer;
BEGIN
    -- Check Site data
    SELECT COUNT(*) INTO site_count FROM "Site" WHERE EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'Site' 
        AND table_schema = 'public'
    );
    
    SELECT COUNT(*) INTO heritage_site_count FROM heritage_sites;
    
    IF site_count > heritage_site_count THEN
        RAISE EXCEPTION 'Not all Site data has been migrated (% sites vs % heritage_sites)', site_count, heritage_site_count;
    END IF;
    
    -- Check HistoricalPeriod data
    SELECT COUNT(*) INTO period_count FROM "HistoricalPeriod" WHERE EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'HistoricalPeriod' 
        AND table_schema = 'public'
    );
    
    IF period_count > (SELECT COUNT(*) FROM periods) THEN
        RAISE EXCEPTION 'Not all HistoricalPeriod data has been migrated';
    END IF;
    
    -- Check Image data
    SELECT COUNT(*) INTO image_count FROM "Image" WHERE EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'Image' 
        AND table_schema = 'public'
    );
    
    IF image_count > (SELECT COUNT(*) FROM images) THEN
        RAISE EXCEPTION 'Not all Image data has been migrated';
    END IF;
END $$;

-- Hvis vi når hertil er al data migreret korrekt
DROP TABLE IF EXISTS "Site" CASCADE;
DROP TABLE IF EXISTS "HistoricalPeriod" CASCADE;
DROP TABLE IF EXISTS "Image" CASCADE;

-- Drop related constraints/tables that might have been created
DROP TABLE IF EXISTS "ToursOnSites" CASCADE;
DROP TABLE IF EXISTS "Translation" CASCADE;
DROP TABLE IF EXISTS "Favorite" CASCADE;
DROP TABLE IF EXISTS "Review" CASCADE;
DROP TABLE IF EXISTS "Tour" CASCADE;

COMMIT;