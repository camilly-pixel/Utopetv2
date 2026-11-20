/*
# US veterinarian leads

1. Modified Tables
- `utopet_leads`:
  - `origem` now also accepts 'veterinario_us' (leads from /en/veterinarians).
  - New nullable column `pets_por_dia` (text): pets seen per day, one of 'under_10', '10_20', '21_40', 'over_40'.
  - US state is stored in the existing `uf` column (two uppercase letters, already constrained).

2. Security
- Anonymous visitors can still only INSERT, never read.
- Insert policy recreated to include the new origem value.

3. Important notes
1. Existing rows are untouched; the new column is nullable.
*/

ALTER TABLE utopet_leads ADD COLUMN IF NOT EXISTS pets_por_dia text;

ALTER TABLE utopet_leads DROP CONSTRAINT IF EXISTS utopet_leads_pets_por_dia_check;
ALTER TABLE utopet_leads ADD CONSTRAINT utopet_leads_pets_por_dia_check CHECK (pets_por_dia IS NULL OR pets_por_dia IN ('under_10', '10_20', '21_40', 'over_40'));

ALTER TABLE utopet_leads DROP CONSTRAINT IF EXISTS utopet_leads_origem_check;
ALTER TABLE utopet_leads ADD CONSTRAINT utopet_leads_origem_check CHECK (origem IN ('veterinario', 'tutor', 'representante', 'veterinario_us'));

DROP POLICY IF EXISTS "Anyone can insert a lead" ON utopet_leads;
CREATE POLICY "Anyone can insert a lead"
ON utopet_leads FOR INSERT
TO anon
WITH CHECK (origem IN ('veterinario', 'tutor', 'representante', 'veterinario_us'));
