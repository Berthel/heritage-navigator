import { supabase } from './supabase';

async function setupDatabase() {
  try {
    // Periods table
    const { error: periodsError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS periods (
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
        end_year INTEGER
      );
    `);
    
    if (periodsError) throw periodsError;
    console.log('✓ Periods table created');

    // Cities table
    const { error: citiesError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS cities (
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
        status TEXT NOT NULL CHECK (status IN ('active', 'coming_soon', 'inactive')),
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    
    if (citiesError) throw citiesError;
    console.log('✓ Cities table created');

    // Images table with contexts array
    const { error: imagesError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS images (
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
        period_id TEXT REFERENCES periods(id),
        order_number INTEGER NOT NULL,
        thumbnail_url TEXT,
        medium_url TEXT,
        large_url TEXT,
        width INTEGER NOT NULL,
        height INTEGER NOT NULL,
        contexts TEXT[] NOT NULL CHECK (contexts <@ ARRAY['thumbnail', 'gallery', 'banner', 'description'])
      );
    `);
    
    if (imagesError) throw imagesError;
    console.log('✓ Images table created');

    // Heritage Sites table
    const { error: sitesError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS heritage_sites (
        id TEXT PRIMARY KEY,
        city_id TEXT NOT NULL REFERENCES cities(id),
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
        primary_period TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('active', 'temporary_closed', 'permanently_closed')),
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    
    if (sitesError) throw sitesError;
    console.log('✓ Heritage Sites table created');

    // Tags table
    const { error: tagsError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS tags (
        id TEXT PRIMARY KEY,
        name_da TEXT NOT NULL,
        name_en TEXT NOT NULL,
        name_pt TEXT NOT NULL,
        type TEXT
      );
    `);
    
    if (tagsError) throw tagsError;
    console.log('✓ Tags table created');

    // Opening Hours table
    const { error: openingHoursError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS opening_hours (
        id TEXT PRIMARY KEY,
        site_id TEXT NOT NULL REFERENCES heritage_sites(id),
        type TEXT NOT NULL CHECK (type IN ('regular', 'seasonal', 'special')),
        valid_from DATE,
        valid_to DATE,
        metadata JSONB
      );
    `);
    
    if (openingHoursError) throw openingHoursError;
    console.log('✓ Opening Hours table created');

    // Time Slots table
    const { error: timeSlotsError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS time_slots (
        id TEXT PRIMARY KEY,
        opening_hours_id TEXT NOT NULL REFERENCES opening_hours(id),
        day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
        opens TIME NOT NULL,
        closes TIME NOT NULL
      );
    `);
    
    if (timeSlotsError) throw timeSlotsError;
    console.log('✓ Time Slots table created');

    // Detail Sections table
    const { error: detailSectionsError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS detail_sections (
        id TEXT PRIMARY KEY,
        site_id TEXT NOT NULL REFERENCES heritage_sites(id),
        type TEXT NOT NULL CHECK (type IN ('text', 'image', 'gallery')),
        content_da TEXT,
        content_en TEXT,
        content_pt TEXT,
        image_layout TEXT CHECK (image_layout IN ('left', 'right', 'full')),
        order_number INTEGER NOT NULL,
        gallery_images TEXT[]
      );
    `);
    
    if (detailSectionsError) throw detailSectionsError;
    console.log('✓ Detail Sections table created');

    // Relation tables
    const relationTables = [
      {
        name: 'site_periods',
        sql: `
          CREATE TABLE IF NOT EXISTS site_periods (
            site_id TEXT NOT NULL REFERENCES heritage_sites(id),
            period_id TEXT NOT NULL REFERENCES periods(id),
            PRIMARY KEY (site_id, period_id)
          );
        `
      },
      {
        name: 'site_images',
        sql: `
          CREATE TABLE IF NOT EXISTS site_images (
            site_id TEXT NOT NULL REFERENCES heritage_sites(id),
            image_id TEXT NOT NULL REFERENCES images(id),
            PRIMARY KEY (site_id, image_id)
          );
        `
      },
      {
        name: 'site_tags',
        sql: `
          CREATE TABLE IF NOT EXISTS site_tags (
            site_id TEXT NOT NULL REFERENCES heritage_sites(id),
            tag_id TEXT NOT NULL REFERENCES tags(id),
            PRIMARY KEY (site_id, tag_id)
          );
        `
      },
      {
        name: 'city_periods',
        sql: `
          CREATE TABLE IF NOT EXISTS city_periods (
            city_id TEXT NOT NULL REFERENCES cities(id),
            period_id TEXT NOT NULL REFERENCES periods(id),
            PRIMARY KEY (city_id, period_id)
          );
        `
      },
      {
        name: 'city_images',
        sql: `
          CREATE TABLE IF NOT EXISTS city_images (
            city_id TEXT NOT NULL REFERENCES cities(id),
            image_id TEXT NOT NULL REFERENCES images(id),
            PRIMARY KEY (city_id, image_id)
          );
        `
      },
      {
        name: 'city_tags',
        sql: `
          CREATE TABLE IF NOT EXISTS city_tags (
            city_id TEXT NOT NULL REFERENCES cities(id),
            tag_id TEXT NOT NULL REFERENCES tags(id),
            PRIMARY KEY (city_id, tag_id)
          );
        `
      }
    ];

    for (const table of relationTables) {
      const { error } = await supabase.query(table.sql);
      if (error) throw error;
      console.log(`✓ ${table.name} relation table created`);
    }

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
}

export { setupDatabase };
