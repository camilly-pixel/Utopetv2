/*
  # Create utopet_leads table

  1. New Tables
    - `utopet_leads`
      - `id` (uuid, primary key)
      - `name` (text) - vet/clinic owner name
      - `clinic` (text) - clinic or establishment name
      - `contact` (text) - WhatsApp or e-mail
      - `source` (text) - which form submitted (hero or cta)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow anonymous inserts (public lead capture form)
    - No reads for anonymous users
*/

CREATE TABLE IF NOT EXISTS utopet_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  clinic text NOT NULL DEFAULT '',
  contact text NOT NULL DEFAULT '',
  source text NOT NULL DEFAULT 'hero',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE utopet_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert a lead"
  ON utopet_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);
