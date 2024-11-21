BEGIN;

-- Update Tavira Slot coordinates
UPDATE heritage_sites
SET 
    latitude = 37.125503420524886,
    longitude = -7.651236603510477,
    geom = ST_SetSRID(ST_MakePoint(-7.651236603510477, 37.125503420524886), 4326)
WHERE name_da ILIKE '%slot%' OR name_en ILIKE '%castle%';

-- Update Islamic Museum coordinates
UPDATE heritage_sites
SET 
    latitude = 37.126020956495886,
    longitude = -7.650190072819728,
    geom = ST_SetSRID(ST_MakePoint(-7.650190072819728, 37.126020956495886), 4326)
WHERE name_da ILIKE '%islamisk%' OR name_en ILIKE '%islamic%';

-- Update Roman Bridge coordinates
UPDATE heritage_sites
SET 
    latitude = 37.127041924754806,
    longitude = -7.6499707053647885,
    geom = ST_SetSRID(ST_MakePoint(-7.6499707053647885, 37.127041924754806), 4326)
WHERE name_da ILIKE '%bro%' OR name_en ILIKE '%bridge%';

COMMIT;
