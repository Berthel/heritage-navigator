-- Indsæt testdata for Heritage Navigator

-- Indsæt perioder
INSERT INTO periods (id, name_da, name_en, name_pt, description_da, description_en, description_pt, order_number, color, start_year, end_year)
VALUES 
  ('medieval', 'Middelalderen', 'Medieval Period', 'Período Medieval', 
   'Den portugisiske middelalder', 'The Portuguese medieval period', 'O período medieval português',
   1, '#8B4513', 1143, 1495),
  ('islamic', 'Islamisk periode', 'Islamic Period', 'Período Islâmico',
   'Den islamiske periode i Algarve', 'The Islamic period in Algarve', 'O período islâmico no Algarve',
   2, '#C19A6B', 711, 1249);

-- Indsæt billeder
INSERT INTO images (id, url, alt_da, alt_en, alt_pt, caption_da, caption_en, caption_pt,
                   order_number, width, height, contexts)
VALUES 
  ('tavira_main', 'https://example.com/tavira_main.jpg',
   'Tavira bymidte', 'Tavira city center', 'Centro da cidade de Tavira',
   'Taviras smukke bymidte', 'Beautiful Tavira city center', 'Belo centro da cidade de Tavira',
   1, 1920, 1080, ARRAY['banner', 'gallery']),
  ('castle_main', 'https://example.com/castle.jpg',
   'Tavira Slot', 'Tavira Castle', 'Castelo de Tavira',
   'Det historiske slot', 'The historic castle', 'O castelo histórico',
   2, 1920, 1080, ARRAY['gallery']);

-- Indsæt nogle heritage sites
INSERT INTO heritage_sites (id, city_id, name_da, name_en, name_pt, description_da, description_en, description_pt,
                          thumbnail_image, latitude, longitude, primary_period, status)
VALUES 
  ('tavira-castle', 'tavira', 'Tavira Slot', 'Tavira Castle', 'Castelo de Tavira',
   'Det historiske slot i Tavira', 'The historic castle of Tavira', 'O histórico castelo de Tavira',
   'castle.jpg', 37.1257, -7.6506, 'medieval', 'active'),
  ('roman-bridge', 'tavira', 'Romersk Bro', 'Roman Bridge', 'Ponte Romana',
   'Den gamle romerske bro', 'The ancient Roman bridge', 'A antiga ponte Romana',
   'bridge.jpg', 37.1248, -7.6501, 'medieval', 'active');

-- Forbind billeder med heritage sites
INSERT INTO site_images (site_id, image_id)
VALUES 
  ('tavira-castle', 'castle_main'),
  ('roman-bridge', 'tavira_main');

-- Forbind billeder med byen
INSERT INTO city_images (city_id, image_id)
VALUES 
  ('tavira', 'tavira_main');

-- Forbind perioder med byen
INSERT INTO city_periods (city_id, period_id)
VALUES 
  ('tavira', 'medieval'),
  ('tavira', 'islamic');

-- Tilføj nogle tags
INSERT INTO tags (id, name_da, name_en, name_pt, type)
VALUES 
  ('castle', 'Slot', 'Castle', 'Castelo', 'building'),
  ('bridge', 'Bro', 'Bridge', 'Ponte', 'structure');

-- Forbind tags med heritage sites
INSERT INTO site_tags (site_id, tag_id)
VALUES 
  ('tavira-castle', 'castle'),
  ('roman-bridge', 'bridge');
