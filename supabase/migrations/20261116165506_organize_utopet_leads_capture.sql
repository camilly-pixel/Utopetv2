/*
# Organize lead capture for the vet and tutor pages

Adds the fields needed to capture leads from both pages (/veterinario and /tutor),
plus campaign tracking (UTM) and the page URL. No existing lead is removed.

1. Modified table `utopet_leads` (new columns)
  - `origem` (text, not null) - 'veterinario' or 'tutor'. Existing leads become 'veterinario'.
  - `email` (text) - lead e-mail
  - `cidade` (text) - city (vet form)
  - `consultas_por_dia` (integer, optional) - daily consultations (vet form)
  - `nome_pet` (text) - pet name (tutor form)
  - `especie` (text) - 'cao' or 'gato' (tutor form)
  - `bairro` (text) - neighborhood (tutor form)
  - `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (text)
  - `pagina_url` (text) - page where the form was submitted
  - `criado_em` (timestamptz, default now()) - backfilled from `created_at`
  Existing columns reused: `name` (nome), `contact` (WhatsApp), `clinic` (nome da clinica).

2. Data rules
  - `origem` must be 'veterinario' or 'tutor'; new rows must send it explicitly.
  - `especie` must be 'cao' or 'gato' when present.
  - `consultas_por_dia` must be between 0 and 1000 when present.
  - `email` must look like an e-mail when present.

3. Security
  - RLS stays enabled.
  - Anonymous visitors can only INSERT; SELECT/UPDATE/DELETE privileges are revoked
    from anon and authenticated so leads can never be read from the site.
  - The two duplicate insert policies are consolidated into one.
*/

ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS origem text NOT NULL DEFAULT 'veterinario';
ALTER TABLE utopet_leads ALTER COLUMN origem DROP DEFAULT;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS cidade text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS consultas_por_dia integer;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS nome_pet text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS especie text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS bairro text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS utm_source text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS utm_medium text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS utm_campaign text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS utm_content text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS utm_term text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS pagina_url text;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'utopet_leads' AND column_name = 'criado_em') THEN
    ALTER TABLE utopet_leads ADD COLUMN criado_em timestamptz NOT NULL DEFAULT now();
    UPDATE utopet_leads SET criado_em = created_at WHERE created_at IS NOT NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'utopet_leads_origem_check') THEN
    ALTER TABLE utopet_leads ADD CONSTRAINT utopet_leads_origem_check CHECK (origem IN ('veterinario', 'tutor'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'utopet_leads_especie_check') THEN
    ALTER TABLE utopet_leads ADD CONSTRAINT utopet_leads_especie_check CHECK (especie IS NULL OR especie IN ('cao', 'gato'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'utopet_leads_consultas_check') THEN
    ALTER TABLE utopet_leads ADD CONSTRAINT utopet_leads_consultas_check CHECK (consultas_por_dia IS NULL OR consultas_por_dia BETWEEN 0 AND 1000);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'utopet_leads_email_check') THEN
    ALTER TABLE utopet_leads ADD CONSTRAINT utopet_leads_email_check CHECK (email IS NULL OR email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS utopet_leads_origem_idx ON utopet_leads (origem, criado_em DESC);

REVOKE SELECT, UPDATE, DELETE ON utopet_leads FROM anon, authenticated;
GRANT INSERT ON utopet_leads TO anon;

DROP POLICY IF EXISTS "Anyone can submit a lead" ON utopet_leads;
DROP POLICY IF EXISTS "Anyone can insert a lead" ON utopet_leads;
CREATE POLICY "Anyone can insert a lead"
  ON utopet_leads FOR INSERT
  TO anon
  WITH CHECK (origem IN ('veterinario', 'tutor'));
