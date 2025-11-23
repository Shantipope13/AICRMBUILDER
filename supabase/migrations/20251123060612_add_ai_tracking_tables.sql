/*
  # Add AI Tracking Tables

  1. New Tables
    - `ai_conversations`
      - `id` (uuid, primary key)
      - `platform_id` (uuid, foreign key to platforms)
      - `industry_type` (text)
      - `conversation_data` (jsonb) - stores full conversation history
      - `created_at` (timestamptz)
    
    - `ai_generation_logs`
      - `id` (uuid, primary key)
      - `platform_id` (uuid, foreign key to platforms)
      - `component_type` (text) - e.g., 'crmFields', 'pipelineStages'
      - `model_used` (text) - AI model identifier
      - `prompt_tokens` (integer) - estimated tokens in prompt
      - `completion_tokens` (integer) - estimated tokens in response
      - `success` (boolean) - whether generation succeeded
      - `error_message` (text, nullable) - error if failed
      - `generation_time_ms` (integer) - time taken in milliseconds
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (for demo purposes)
    - In production, these should be restricted to authenticated users

  3. Indexes
    - Index on platform_id for both tables for faster lookups
    - Index on created_at for time-based queries
*/

-- Create ai_conversations table
CREATE TABLE IF NOT EXISTS ai_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id uuid REFERENCES platforms(id) ON DELETE CASCADE,
  industry_type text NOT NULL,
  conversation_data jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create ai_generation_logs table
CREATE TABLE IF NOT EXISTS ai_generation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id uuid REFERENCES platforms(id) ON DELETE CASCADE,
  component_type text NOT NULL,
  model_used text NOT NULL DEFAULT 'google/flan-t5-base',
  prompt_tokens integer DEFAULT 0,
  completion_tokens integer DEFAULT 0,
  success boolean DEFAULT true,
  error_message text,
  generation_time_ms integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ai_conversations_platform_id ON ai_conversations(platform_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_created_at ON ai_conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_generation_logs_platform_id ON ai_generation_logs(platform_id);
CREATE INDEX IF NOT EXISTS idx_ai_generation_logs_created_at ON ai_generation_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_generation_logs_success ON ai_generation_logs(success);

-- Enable Row Level Security
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generation_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (demo mode)
-- In production, restrict these to authenticated users only
CREATE POLICY "Allow public read access to conversations"
  ON ai_conversations
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to conversations"
  ON ai_conversations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public read access to generation logs"
  ON ai_generation_logs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to generation logs"
  ON ai_generation_logs
  FOR INSERT
  TO public
  WITH CHECK (true);
