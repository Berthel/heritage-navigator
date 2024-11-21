-- Fix periods in production
DO $$ 
BEGIN
    -- Enable Row Level Security on periods table if not already enabled
    IF EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_name = 'periods' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE periods ENABLE ROW LEVEL SECURITY;

        -- Allow public read access to periods
        DROP POLICY IF EXISTS periods_public_read ON periods;
        CREATE POLICY periods_public_read
            ON periods
            FOR SELECT
            TO public
            USING (true);
    END IF;
END $$;
