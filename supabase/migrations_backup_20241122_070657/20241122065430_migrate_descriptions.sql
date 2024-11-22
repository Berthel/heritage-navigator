-- Migrate descriptions to detail sections
INSERT INTO "public"."detail_sections" (
    id,
    site_id,
    title_da,
    title_en,
    title_pt,
    content_da,
    content_en,
    content_pt,
    order_number
)
SELECT 
    site.id || '_main',  -- Create a unique ID for each section
    site.id,
    'Beskrivelse',       -- Danish title
    'Description',       -- English title
    'Descrição',        -- Portuguese title
    site.description_da,
    site.description_en,
    site.description_pt,
    0                    -- Make it the first section
FROM "public"."heritage_sites" site;
