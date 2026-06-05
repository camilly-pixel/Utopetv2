/*
  # Create utopet_leads table

  1. New Tables
    - `utopet_leads`
      - `id` (uuid, primary key)
      - `name` (text) - nome do contato
      - `clinic` (text) - nome da clínica ou estabelecimento
      - `contact` (text) - WhatsApp ou e-mail
      - `source` (text) - origem do formulário (hero ou cta)
      - `created_at` (timestamptz) - data de cadastro

  2. Security
    - Enable RLS
    - Allow anonymous inserts (formulário público)
    - Deny public reads (dados só acessíveis via dashboard Supabase)
*/

CREATE TABLE IF NOT EXISTS utopet_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  clinic text NOT NULL DEFAULT '',
  contact text NOT NULL DEFAULT '',
  source text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE utopet_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON utopet_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);
