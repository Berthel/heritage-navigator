-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON periods;
DROP POLICY IF EXISTS "Enable read access for all users" ON cities;
DROP POLICY IF EXISTS "Enable read access for all users" ON images;
DROP POLICY IF EXISTS "Enable read access for all users" ON heritage_sites;
DROP POLICY IF EXISTS "Enable read access for all users" ON tags;
DROP POLICY IF EXISTS "Enable read access for all users" ON opening_hours;
DROP POLICY IF EXISTS "Enable read access for all users" ON time_slots;
DROP POLICY IF EXISTS "Enable read access for all users" ON detail_sections;
DROP POLICY IF EXISTS "Enable read access for all users" ON site_periods;
DROP POLICY IF EXISTS "Enable read access for all users" ON site_images;
DROP POLICY IF EXISTS "Enable read access for all users" ON site_tags;
DROP POLICY IF EXISTS "Enable read access for all users" ON city_periods;
DROP POLICY IF EXISTS "Enable read access for all users" ON city_images;
DROP POLICY IF EXISTS "Enable read access for all users" ON city_tags;

-- Create new policies for full access
CREATE POLICY "Enable full access for all users" ON periods FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable full access for all users" ON cities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable full access for all users" ON images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable full access for all users" ON heritage_sites FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable full access for all users" ON tags FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable full access for all users" ON opening_hours FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable full access for all users" ON time_slots FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable full access for all users" ON detail_sections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable full access for all users" ON site_periods FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable full access for all users" ON site_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable full access for all users" ON site_tags FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable full access for all users" ON city_periods FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable full access for all users" ON city_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable full access for all users" ON city_tags FOR ALL USING (true) WITH CHECK (true);
