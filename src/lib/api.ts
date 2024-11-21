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
  const { data, error } = await supabase
    .from('periods')
    .select('*')
    .order('order_number');

  if (error) throw error;

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
export async function getHeritageSites(cityId: string): Promise<HeritageSite[]> {
  console.log('Fetching heritage sites for city:', cityId);
  
  const { data: siteData, error: siteError } = await supabase
    .from('heritage_sites')
    .select(`
      *,
      images:heritage_site_images(image_id),
      periods:heritage_site_periods(period_id),
      tags:heritage_site_tags(tag_id),
      opening_hours
    `)
    .eq('city_id', cityId)
    .eq('status', 'active');

  if (siteError) throw siteError;

  return siteData.map(row => ({
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
    images: row.images?.map((img: any) => img.image_id) || [],
    periods: row.periods?.map((p: any) => p.period_id) || [],
    primaryPeriod: row.primary_period,
    status: validateHeritageStatus(row.status),
    lastUpdated: row.last_updated,
    openingHours: row.opening_hours || [],
    tags: row.tags?.map((t: any) => t.tag_id) || [],
    sections: [],
    gallery: [],
    detailedInfo: {
      sections: [],
      gallery: []
    }
  }));
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
