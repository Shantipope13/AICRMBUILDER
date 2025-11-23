/*
  # Update Platforms RLS for Authentication

  1. Changes
    - Drop existing RLS policies for session-based access
    - Create new RLS policies for authenticated users
    - Users can only see and manage their own platforms
    - Platforms are tied to auth.uid() instead of session strings

  2. Security
    - Authenticated users can create platforms
    - Users can only view/update/delete their own platforms
    - Public users cannot access any platforms
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create platforms" ON platforms;
DROP POLICY IF EXISTS "Users can view platforms by session" ON platforms;
DROP POLICY IF EXISTS "Users can update their session platforms" ON platforms;

-- Create new policies for authenticated users
CREATE POLICY "Authenticated users can create platforms"
  ON platforms
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_session);

CREATE POLICY "Users can view own platforms"
  ON platforms
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_session);

CREATE POLICY "Users can update own platforms"
  ON platforms
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_session)
  WITH CHECK (auth.uid()::text = user_session);

CREATE POLICY "Users can delete own platforms"
  ON platforms
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = user_session);
