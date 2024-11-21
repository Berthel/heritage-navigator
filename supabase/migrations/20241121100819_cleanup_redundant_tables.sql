-- Migration fil: supabase/migrations/[timestamp]_cleanup_redundant_tables.sql
BEGIN;

-- Først verificerer vi at vi kan migrere data hvis nødvendigt
DO $$ 
BEGIN
    -- Check om der er data der skal migreres
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'Site' 
        AND table_schema = 'public'
    ) THEN
        -- Log at vi fandt tabellen
        RAISE NOTICE 'Found Site table, checking for data...';
        
        -- Check om der er data der skal migreres
        IF EXISTS (SELECT 1 FROM "Site" LIMIT 1) THEN
            RAISE EXCEPTION 'Site table contains data that needs to be migrated first';
        END IF;
    END IF;

    -- Gentag for HistoricalPeriod
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'HistoricalPeriod' 
        AND table_schema = 'public'
    ) THEN
        IF EXISTS (SELECT 1 FROM "HistoricalPeriod" LIMIT 1) THEN
            RAISE EXCEPTION 'HistoricalPeriod table contains data that needs to be migrated first';
        END IF;
    END IF;

    -- Gentag for Image
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'Image' 
        AND table_schema = 'public'
    ) THEN
        IF EXISTS (SELECT 1 FROM "Image" LIMIT 1) THEN
            RAISE EXCEPTION 'Image table contains data that needs to be migrated first';
        END IF;
    END IF;
END $$;

-- Hvis vi når hertil er der ingen data der skal migreres
DROP TABLE IF EXISTS "Site" CASCADE;
DROP TABLE IF EXISTS "HistoricalPeriod" CASCADE;
DROP TABLE IF EXISTS "Image" CASCADE;

-- Drop related constraints/tables that might have been created
DROP TABLE IF EXISTS "ToursOnSites" CASCADE;
DROP TABLE IF EXISTS "Translation" CASCADE;
DROP TABLE IF EXISTS "Tour" CASCADE;
DROP TABLE IF EXISTS "Review" CASCADE;
DROP TABLE IF EXISTS "Favorite" CASCADE;

COMMIT;