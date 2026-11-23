/*
# Add preferred screening location to tutor leads

1. Modified Tables
- `utopet_leads`
- `local_preferido` (text, nullable): where the tutor prefers the screening to happen.
Allowed values: 'casa' (at home), 'lugar_publico' (public place or square), 'veterinario' (at their trusted vet).

2. Security
- No policy changes. The existing table-level INSERT grant for anon/authenticated already covers the new column,
and the existing "Anyone can insert a lead" policy still applies. There is still no SELECT for anon/authenticated.

3. Notes
1. Column is nullable so existing rows and other forms (veterinario, representante, veterinario_us) are unaffected.
2. A check constraint limits values to the three options above.
*/

ALTER TABLE public.utopet_leads ADD COLUMN IF NOT EXISTS local_preferido text;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'utopet_leads_local_preferido_check') THEN
    ALTER TABLE public.utopet_leads ADD CONSTRAINT utopet_leads_local_preferido_check
      CHECK (local_preferido IS NULL OR local_preferido IN ('casa', 'lugar_publico', 'veterinario'));
  END IF;
END $$;
