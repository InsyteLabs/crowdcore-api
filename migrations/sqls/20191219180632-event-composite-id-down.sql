
ALTER TABLE IF EXISTS event.event

DROP COLUMN IF EXISTS slug_id,

ALTER COLUMN title DROP NOT NULL,
ALTER COLUMN slug DROP NOT NULL;