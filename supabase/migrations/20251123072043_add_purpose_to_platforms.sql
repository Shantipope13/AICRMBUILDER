/*
  # Add Purpose and Onboarding Fields to Platforms

  1. Changes
    - Add `purpose` field to platforms table
    - Add `onboarding_completed` field
    - Add `checklist_completed` field
    - Add default values for existing rows

  2. Notes
    - Existing platforms will have null purpose (can be set later)
    - Onboarding fields default to true for existing platforms
*/

-- Add new columns to platforms table
ALTER TABLE platforms
  ADD COLUMN IF NOT EXISTS purpose text,
  ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS checklist_completed boolean DEFAULT false;

-- Update existing platforms to mark as onboarding completed
UPDATE platforms
SET onboarding_completed = true, checklist_completed = true
WHERE onboarding_completed IS NULL OR onboarding_completed = false;

-- Create index for purpose lookups
CREATE INDEX IF NOT EXISTS idx_platforms_purpose ON platforms(purpose);
