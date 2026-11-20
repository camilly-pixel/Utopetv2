/*
# Leads de representantes comerciais

1. Modified Tables
- `utopet_leads`: new optional (nullable) columns for the /representantes form:
  - `uf` (text): state abbreviation, two uppercase letters
  - `segmento` (text): what the rep sells today (racao_nutricao, medicamentos, equipamentos_hospitalares, outro)
  - `clinicas_mes` (text): clinics visited per month (ate_10, 11_30, 31_60, mais_60)
  - `empresa` (text): company or brands represented
  - `linkedin` (text): LinkedIn profile
  - `cidade` already exists and is reused.
- `origem` now also accepts 'representante'.

2. Security
- RLS unchanged in spirit: anonymous visitors can only INSERT, never read.
- The insert policy is recreated to allow origem 'representante'.

3. Important notes
1. Existing rows are untouched; all new columns are nullable.
2. Checks only apply when a value is present, so /veterinario and /tutor keep working.
*/

ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS uf text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS segmento text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS clinicas_mes text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS empresa text;
ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS linkedin text;

ALTER TABLE utopet_leads DROP CONSTRAINT IF EXISTS utopet_leads_origem_check;
ALTER TABLE utopet_leads ADD CONSTRAINT utopet_leads_origem_check CHECK (origem IN ('veterinario', 'tutor', 'representante'));

ALTER TABLE utopet_leads DROP CONSTRAINT IF EXISTS utopet_leads_uf_check;
ALTER TABLE utopet_leads ADD CONSTRAINT utopet_leads_uf_check CHECK (uf IS NULL OR uf ~ '^[A-Z]{2}$');

ALTER TABLE utopet_leads DROP CONSTRAINT IF EXISTS utopet_leads_segmento_check;
ALTER TABLE utopet_leads ADD CONSTRAINT utopet_leads_segmento_check CHECK (segmento IS NULL OR segmento IN ('racao_nutricao', 'medicamentos', 'equipamentos_hospitalares', 'outro'));

ALTER TABLE utopet_leads DROP CONSTRAINT IF EXISTS utopet_leads_clinicas_mes_check;
ALTER TABLE utopet_leads ADD CONSTRAINT utopet_leads_clinicas_mes_check CHECK (clinicas_mes IS NULL OR clinicas_mes IN ('ate_10', '11_30', '31_60', 'mais_60'));

ALTER TABLE utopet_leads DROP CONSTRAINT IF EXISTS utopet_leads_empresa_len_check;
ALTER TABLE utopet_leads ADD CONSTRAINT utopet_leads_empresa_len_check CHECK (empresa IS NULL OR char_length(empresa) <= 300);

ALTER TABLE utopet_leads DROP CONSTRAINT IF EXISTS utopet_leads_linkedin_len_check;
ALTER TABLE utopet_leads ADD CONSTRAINT utopet_leads_linkedin_len_check CHECK (linkedin IS NULL OR char_length(linkedin) <= 300);

DROP POLICY IF EXISTS "Anyone can insert a lead" ON utopet_leads;
CREATE POLICY "Anyone can insert a lead"
ON utopet_leads FOR INSERT
TO anon
WITH CHECK (origem IN ('veterinario', 'tutor', 'representante'));
