-- I en ny migration fil
CREATE TABLE "public"."languages" (
    "code" text PRIMARY KEY,
    "name" text NOT NULL,
    "native_name" text NOT NULL,
    "active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT now(),
    "updated_at" timestamp with time zone DEFAULT now()
);

-- Indsæt initial data
INSERT INTO "public"."languages" (code, name, native_name, active) VALUES
    ('da', 'Danish', 'Dansk', true),
    ('en', 'English', 'English', true),
    ('pt', 'Portuguese', 'Português', true);