import { supabase } from './supabase';

async function setupDatabase() {
  try {
    // Periods table
    const { error: periodsError } = await supabase.from('periods').select('*').limit(1);
    if (periodsError) {
      const { error } = await supabase.from('periods').insert({
        id: 'test',
        name_da: 'Test',
        name_en: 'Test',
        name_pt: 'Test',
        description_da: 'Test',
        description_en: 'Test',
        description_pt: 'Test',
        order_number: 1,
        color: '#000000'
      }).select();
      if (error) throw error;
    }
    console.log('✓ Periods table verified');

    // Cities table
    const { error: citiesError } = await supabase.from('cities').select('*').limit(1);
    if (citiesError) {
      const { error } = await supabase.from('cities').insert({
        id: 'test',
        name_da: 'Test',
        name_en: 'Test',
        name_pt: 'Test',
        description_da: 'Test',
        description_en: 'Test',
        description_pt: 'Test',
        country: 'Test',
        latitude: 0,
        longitude: 0,
        bounds_ne_lat: 0,
        bounds_ne_lng: 0,
        bounds_sw_lat: 0,
        bounds_sw_lng: 0,
        default_zoom: 10,
        primary_image: 'test',
        status: 'active'
      }).select();
      if (error) throw error;
    }
    console.log('✓ Cities table verified');

    // Images table
    const { error: imagesError } = await supabase.from('images').select('*').limit(1);
    if (imagesError) {
      const { error } = await supabase.from('images').insert({
        id: 'test',
        url: 'test',
        alt_da: 'Test',
        alt_en: 'Test',
        alt_pt: 'Test',
        order_number: 1,
        width: 100,
        height: 100,
        contexts: ['thumbnail']
      }).select();
      if (error) throw error;
    }
    console.log('✓ Images table verified');

    // Heritage Sites table
    const { error: sitesError } = await supabase.from('heritage_sites').select('*').limit(1);
    if (sitesError) {
      const { error } = await supabase.from('heritage_sites').insert({
        id: 'test',
        city_id: 'test',
        name_da: 'Test',
        name_en: 'Test',
        name_pt: 'Test',
        description_da: 'Test',
        description_en: 'Test',
        description_pt: 'Test',
        thumbnail_image: 'test',
        latitude: 0,
        longitude: 0,
        primary_period: 'test',
        status: 'active'
      }).select();
      if (error) throw error;
    }
    console.log('✓ Heritage Sites table verified');

    // Tags table
    const { error: tagsError } = await supabase.from('tags').select('*').limit(1);
    if (tagsError) {
      const { error } = await supabase.from('tags').insert({
        id: 'test',
        name_da: 'Test',
        name_en: 'Test',
        name_pt: 'Test'
      }).select();
      if (error) throw error;
    }
    console.log('✓ Tags table verified');

    // Opening Hours table
    const { error: openingHoursError } = await supabase.from('opening_hours').select('*').limit(1);
    if (openingHoursError) {
      const { error } = await supabase.from('opening_hours').insert({
        id: 'test',
        site_id: 'test',
        type: 'regular'
      }).select();
      if (error) throw error;
    }
    console.log('✓ Opening Hours table verified');

    // Time Slots table
    const { error: timeSlotsError } = await supabase.from('time_slots').select('*').limit(1);
    if (timeSlotsError) {
      const { error } = await supabase.from('time_slots').insert({
        id: 'test',
        opening_hours_id: 'test',
        day_of_week: 0,
        opens: '09:00',
        closes: '17:00'
      }).select();
      if (error) throw error;
    }
    console.log('✓ Time Slots table verified');

    // Detail Sections table
    const { error: detailSectionsError } = await supabase.from('detail_sections').select('*').limit(1);
    if (detailSectionsError) {
      const { error } = await supabase.from('detail_sections').insert({
        id: 'test',
        site_id: 'test',
        type: 'text',
        order_number: 1
      }).select();
      if (error) throw error;
    }
    console.log('✓ Detail Sections table verified');

    // Relation tables
    const relationTables = [
      'site_periods',
      'site_images',
      'site_tags',
      'city_periods',
      'city_images',
      'city_tags'
    ];

    for (const table of relationTables) {
      const { error: relationError } = await supabase.from(table).select('*').limit(1);
      if (relationError) {
        console.log(`Creating ${table} table...`);
        const { error } = await supabase.from(table).insert({}).select();
        if (error) throw error;
      } else {
        console.log(`✓ ${table} table verified`);
      }
    }

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  }
}

export { setupDatabase };
