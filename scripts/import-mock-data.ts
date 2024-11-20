import 'dotenv/config';
import { supabase } from '../src/lib/supabase';
import { mockPeriods, mockImages, mockTags, mockCities, mockSites, regularOpeningHours, summerOpeningHours } from '../src/lib/mockData';

async function importMockData() {
  try {
    // Import periods
    console.log('Importing periods...');
    for (const period of mockPeriods) {
      const { error } = await supabase.from('periods').upsert({
        id: period.id,
        name_da: period.name.da,
        name_en: period.name.en,
        name_pt: period.name.pt,
        description_da: period.description.da,
        description_en: period.description.en,
        description_pt: period.description.pt,
        order_number: period.order,
        color: period.color,
        start_year: period.startYear,
        end_year: period.endYear
      });
      if (error) throw error;
    }
    console.log('✓ Periods imported');

    // Import cities
    console.log('Importing cities...');
    for (const city of mockCities) {
      const { error } = await supabase.from('cities').upsert({
        id: city.id,
        name_da: city.name.da,
        name_en: city.name.en,
        name_pt: city.name.pt,
        description_da: city.description.da,
        description_en: city.description.en,
        description_pt: city.description.pt,
        country: city.country,
        region: city.region,
        latitude: city.location.latitude,
        longitude: city.location.longitude,
        bounds_ne_lat: city.bounds.northeast.latitude,
        bounds_ne_lng: city.bounds.northeast.longitude,
        bounds_sw_lat: city.bounds.southwest.latitude,
        bounds_sw_lng: city.bounds.southwest.longitude,
        default_zoom: city.defaultZoom,
        primary_image: city.primaryImage,
        status: 'active'
      });
      if (error) throw error;
    }
    console.log('✓ Cities imported');

    // Import images
    console.log('Importing images...');
    for (const image of mockImages) {
      const { error } = await supabase.from('images').upsert({
        id: image.id,
        url: image.url,
        alt_da: image.alt.da,
        alt_en: image.alt.en,
        alt_pt: image.alt.pt,
        caption_da: image.caption?.da,
        caption_en: image.caption?.en,
        caption_pt: image.caption?.pt,
        credit: image.credit,
        year: image.year,
        period_id: image.periodId,
        order_number: image.order,
        thumbnail_url: image.thumbnailUrl,
        medium_url: image.mediumUrl,
        large_url: image.largeUrl,
        width: image.dimensions.width,
        height: image.dimensions.height,
        contexts: image.contexts
      });
      if (error) throw error;
    }
    console.log('✓ Images imported');

    // Import tags
    console.log('Importing tags...');
    for (const tag of mockTags) {
      const { error } = await supabase.from('tags').upsert({
        id: tag.id,
        name_da: tag.name.da,
        name_en: tag.name.en,
        name_pt: tag.name.pt,
        type: tag.type
      });
      if (error) throw error;
    }
    console.log('✓ Tags imported');

    // Import heritage sites
    console.log('Importing heritage sites...');
    for (const site of mockSites) {
      // Insert the main site data
      const { error: siteError } = await supabase.from('heritage_sites').upsert({
        id: site.id,
        city_id: site.cityId,
        name_da: site.name.da,
        name_en: site.name.en,
        name_pt: site.name.pt,
        description_da: site.description.da,
        description_en: site.description.en,
        description_pt: site.description.pt,
        thumbnail_image: site.thumbnailImage,
        latitude: site.location.latitude,
        longitude: site.location.longitude,
        primary_period: site.primaryPeriod,
        status: site.status || 'active'
      });
      if (siteError) throw siteError;

      // Insert site periods
      if (site.periods) {
        for (const periodId of site.periods) {
          const { error } = await supabase.from('site_periods').upsert({
            site_id: site.id,
            period_id: periodId
          });
          if (error) throw error;
        }
      }

      // Insert site images
      if (site.images) {
        for (const imageId of site.images) {
          const { error } = await supabase.from('site_images').upsert({
            site_id: site.id,
            image_id: imageId
          });
          if (error) throw error;
        }
      }

      // Insert site tags
      if (site.tags) {
        for (const tagId of site.tags) {
          const { error } = await supabase.from('site_tags').upsert({
            site_id: site.id,
            tag_id: tagId
          });
          if (error) throw error;
        }
      }

      // Insert opening hours
      const hours = [regularOpeningHours, summerOpeningHours];
      for (const openingHours of hours) {
        const { data: hoursData, error: hoursError } = await supabase
          .from('opening_hours')
          .upsert({
            id: `${site.id}-${openingHours.type}`,
            site_id: site.id,
            type: openingHours.type,
            valid_from: openingHours.validFrom,
            valid_to: openingHours.validTo,
            metadata: {}
          })
          .select();
        if (hoursError) throw hoursError;

        // Insert time slots
        for (const slot of openingHours.slots) {
          const { error: slotError } = await supabase.from('time_slots').upsert({
            id: `${hoursData![0].id}-${slot.dayOfWeek}`,
            opening_hours_id: hoursData![0].id,
            day_of_week: slot.dayOfWeek,
            opens: slot.opens,
            closes: slot.closes
          });
          if (slotError) throw slotError;
        }
      }
    }
    console.log('✓ Heritage sites imported');

    console.log('All mock data imported successfully!');
  } catch (error) {
    console.error('Error importing mock data:', error);
    throw error;
  }
}

// Run the import
importMockData();
