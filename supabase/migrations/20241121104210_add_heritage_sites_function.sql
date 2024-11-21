-- Create a function to get heritage sites with coordinates
CREATE OR REPLACE FUNCTION get_heritage_sites_with_coords(input_city_id text)
RETURNS TABLE (
  id text,
  city_id text,
  name_da text,
  name_en text,
  name_pt text,
  description_da text,
  description_en text,
  description_pt text,
  geom geometry,
  latitude double precision,
  longitude double precision,
  address text,
  thumbnail_image text,
  primary_period text,
  status text,
  last_updated timestamp with time zone,
  images json,
  periods json,
  tags json,
  detail_sections json
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    hs.id,
    hs.city_id,
    hs.name_da,
    hs.name_en,
    hs.name_pt,
    hs.description_da,
    hs.description_en,
    hs.description_pt,
    hs.geom,
    ST_Y(hs.geom::geometry) as latitude,
    ST_X(hs.geom::geometry) as longitude,
    hs.address,
    hs.thumbnail_image,
    hs.primary_period,
    hs.status,
    hs.last_updated,
    (
      SELECT jsonb_agg(
        json_build_object(
          'id', img.id,
          'url', img.url,
          'alt', json_build_object(
            'da', img.alt_da,
            'en', img.alt_en,
            'pt', img.alt_pt
          ),
          'credit', img.credit,
          'year', img.year,
          'thumbnailUrl', img.thumbnail_url,
          'mediumUrl', img.medium_url,
          'largeUrl', img.large_url,
          'orderNumber', img.order_number
        ) ORDER BY img.order_number
      )
      FROM site_images si
      LEFT JOIN images img ON si.image_id = img.id
      WHERE si.site_id = hs.id
    ) as images,
    (
      SELECT jsonb_agg(
        json_build_object(
          'period_id', sp.period_id
        )
      )
      FROM site_periods sp
      WHERE sp.site_id = hs.id
    ) as periods,
    (
      SELECT jsonb_agg(
        json_build_object(
          'id', t.id,
          'name', json_build_object(
            'da', t.name_da,
            'en', t.name_en,
            'pt', t.name_pt
          ),
          'type', t.type
        )
      )
      FROM site_tags st
      LEFT JOIN tags t ON st.tag_id = t.id
      WHERE st.site_id = hs.id
    ) as tags,
    (
      SELECT jsonb_agg(
        json_build_object(
          'id', ds.id,
          'type', ds.type,
          'content', json_build_object(
            'da', ds.content_da,
            'en', ds.content_en,
            'pt', ds.content_pt
          ),
          'imageLayout', ds.image_layout,
          'orderNumber', ds.order_number,
          'galleryImages', ds.gallery_images
        ) ORDER BY ds.order_number
      )
      FROM detail_sections ds
      WHERE ds.site_id = hs.id
    ) as detail_sections
  FROM heritage_sites hs
  WHERE hs.city_id = input_city_id;
END;
$$;
