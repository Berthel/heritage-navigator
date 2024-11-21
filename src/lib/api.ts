import { supabase } from './supabase';
import { HeritageSite, City, Period, Image, Tag, OpeningHours } from '@/types/models';

// Helper function to convert database row to model object
function convertRowToLocalizedField(row: any, prefix: string) {
  return {
    da: row[`${prefix}_da`],
    en: row[`${prefix}_en`],
    pt: row[`${prefix}_pt`]
  };
}

// Validate city status
function validateCityStatus(status: string): 'active' | 'coming_soon' | 'inactive' {
  if (status === 'active' || status === 'coming_soon' || status === 'inactive') {
    return status;
  }
  // Default to inactive if invalid status
  console.warn(`Invalid city status: ${status}, defaulting to inactive`);
  return 'inactive';
}

// Validate heritage site status
function validateHeritageStatus(status: string): 'active' | 'temporary_closed' | 'permanently_closed' {
  if (status === 'active' || status === 'temporary_closed' || status === 'permanently_closed') {
    return status;
  }
  // Default to permanently_closed if invalid status
  console.warn(`Invalid heritage site status: ${status}, defaulting to permanently_closed`);
  return 'permanently_closed';
}

// Get all periods
export async function getPeriods(): Promise<Period[]> {
  console.log('Fetching periods...');
  const { data, error } = await supabase
    .from('periods')
    .select('*')
    .order('order_number');

  if (error) {
    console.error('Error fetching periods:', error);
    throw error;
  }

  console.log('Received periods data:', data);

  return data.map(row => ({
    id: row.id,
    name: convertRowToLocalizedField(row, 'name'),
    description: convertRowToLocalizedField(row, 'description'),
    order: row.order_number,
    color: row.color,
    startYear: row.start_year,
    endYear: row.end_year
  }));
}

// Get all cities
export async function getCities(): Promise<City[]> {
  const { data, error } = await supabase
    .from('cities')
    .select(`
      *,
      images:city_images(image_id),
      periods:city_periods(period_id),
      tags:city_tags(tag_id)
    `)
    .eq('status', 'active');

  if (error) throw error;

  return data.map(row => ({
    id: row.id,
    name: convertRowToLocalizedField(row, 'name'),
    description: convertRowToLocalizedField(row, 'description'),
    country: row.country,
    region: row.region,
    location: {
      latitude: row.latitude,
      longitude: row.longitude
    },
    bounds: {
      northeast: {
        latitude: row.bounds_ne_lat,
        longitude: row.bounds_ne_lng
      },
      southwest: {
        latitude: row.bounds_sw_lat,
        longitude: row.bounds_sw_lng
      }
    },
    defaultZoom: row.default_zoom,
    primaryImage: row.primary_image,
    images: row.images?.map((img: any) => img.image_id) || [],
    historicalPeriods: row.periods?.map((p: any) => p.period_id) || [],
    tags: row.tags?.map((t: any) => t.tag_id) || [],
    status: validateCityStatus(row.status),
    lastUpdated: row.last_updated
  }));
}

// Get all heritage sites for a city
export async function getHeritageSites(city: string): Promise<HeritageSite[]> {
  try {
    console.log('Fetching heritage sites for city:', city);
    const { data, error } = await supabase
      .from('heritage_sites')
      .select(`
        *,
        images:site_images(
          images(*)
        ),
        periods:site_periods(
          period_id
        ),
        tags:site_tags(
          tags(*)
        ),
        detail_sections(*)
      `)
      .eq('city_id', city);

    if (error) throw error;

    return data.map(row => ({
      id: row.id,
      cityId: row.city_id,
      name: convertRowToLocalizedField(row, 'name'),
      description: convertRowToLocalizedField(row, 'description'),
      location: {
        latitude: row.latitude,
        longitude: row.longitude
      },
      address: row.address,
      thumbnailImage: row.thumbnail_image,
      images: row.images?.map((img: any) => img.images) || [],
      periods: row.periods?.map((p: any) => p.period_id) || [],
      primaryPeriod: row.primary_period,
      status: validateHeritageStatus(row.status),
      lastUpdated: row.last_updated,
      openingHours: [],
      tags: row.tags?.map((t: any) => t.tags) || [],
      sections: row.detail_sections?.map((section: any) => ({
        id: section.id,
        type: section.type || 'text',
        title: convertRowToLocalizedField(section, 'title'),
        content: convertRowToLocalizedField(section, 'content'),
        order: section.order
      })) || [],
      gallery: [],
      detailedInfo: {
        sections: row.detail_sections?.map((section: any) => ({
          id: section.id,
          type: section.type || 'text',
          title: convertRowToLocalizedField(section, 'title'),
          content: convertRowToLocalizedField(section, 'content'),
          order: section.order
        })) || [],
        gallery: []
      }
    }));
  } catch (error) {
    console.error('Error fetching heritage sites:', error);
    throw error;
  }
}

// Get all images
export async function getImages(): Promise<Image[]> {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .order('order_number');

  if (error) throw error;

  return data.map(row => ({
    id: row.id,
    url: row.url,
    alt: convertRowToLocalizedField(row, 'alt'),
    caption: row.caption_da ? convertRowToLocalizedField(row, 'caption') : undefined,
    credit: row.credit,
    year: row.year,
    periodId: row.period_id,
    order: row.order_number,
    contexts: row.contexts,
    dimensions: {
      width: row.width,
      height: row.height
    },
    thumbnailUrl: row.thumbnail_url,
    mediumUrl: row.medium_url,
    largeUrl: row.large_url
  }));
}

// Get all tags
export async function getTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('*');

  if (error) throw error;

  return data.map(row => ({
    id: row.id,
    name: convertRowToLocalizedField(row, 'name'),
    type: row.type
  }));
}
