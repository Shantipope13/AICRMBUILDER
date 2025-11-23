/*
  # Create platforms table for Vertex AI

  1. New Tables
    - `platforms`
      - `id` (uuid, primary key) - Unique platform identifier
      - `industry_type` (text) - Type of industry (real-estate, fitness, etc.)
      - `business_name` (text) - Name of the business
      - `generated_at` (timestamptz) - When platform was generated
      - `config` (jsonb) - Full generation configuration
      - `theme` (jsonb) - Theme configuration
      - `features` (jsonb) - All features configuration
      - `user_session` (text) - Session identifier for demo mode
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `platforms` table
    - Add policy for anyone to create platforms (demo mode)
    - Add policy for session-based access to their platforms
*/

CREATE TABLE IF NOT EXISTS platforms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_type text NOT NULL,
  business_name text NOT NULL,
  generated_at timestamptz DEFAULT now(),
  config jsonb NOT NULL,
  theme jsonb NOT NULL,
  features jsonb NOT NULL,
  user_session text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create platforms"
  ON platforms
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view platforms by session"
  ON platforms
  FOR SELECT
  TO public
  USING (
    user_session IS NULL OR
    user_session = current_setting('request.headers', true)::json->>'x-session-id'
  );

CREATE POLICY "Users can update their session platforms"
  ON platforms
  FOR UPDATE
  TO public
  USING (
    user_session IS NULL OR
    user_session = current_setting('request.headers', true)::json->>'x-session-id'
  )
  WITH CHECK (
    user_session IS NULL OR
    user_session = current_setting('request.headers', true)::json->>'x-session-id'
  );

CREATE INDEX IF NOT EXISTS idx_platforms_session ON platforms(user_session);
CREATE INDEX IF NOT EXISTS idx_platforms_created_at ON platforms(created_at DESC);
