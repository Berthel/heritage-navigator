-- Create policies for insert access
CREATE POLICY "Enable insert access for authenticated users" ON periods FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for authenticated users" ON cities FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for authenticated users" ON images FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for authenticated users" ON heritage_sites FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for authenticated users" ON tags FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for authenticated users" ON opening_hours FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for authenticated users" ON time_slots FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for authenticated users" ON detail_sections FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for authenticated users" ON site_periods FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for authenticated users" ON site_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for authenticated users" ON site_tags FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for authenticated users" ON city_periods FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for authenticated users" ON city_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert access for authenticated users" ON city_tags FOR INSERT WITH CHECK (true);
