/*
  # Create Onboarding Tables

  1. New Tables
    - `user_onboarding_status`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `completed_welcome` (boolean) - Has user seen welcome screen
      - `completed_industry_selection` (boolean) - Has user selected industry
      - `completed_purpose_selection` (boolean) - Has user selected purpose
      - `completed_platform_naming` (boolean) - Has user named platform
      - `checklist_items_completed` (jsonb) - Array of completed checklist items
      - `current_step` (text) - Current onboarding step
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `platform_purposes`
      - `id` (uuid, primary key)
      - `industry_type` (text) - Industry this purpose belongs to
      - `purpose_name` (text) - Name of the purpose
      - `purpose_description` (text) - Description of purpose
      - `icon` (text) - Lucide icon name
      - `default_automations` (jsonb) - Pre-configured automations
      - `display_order` (integer) - Sort order

  2. Security
    - Enable RLS on both tables
    - Users can only view/update their own onboarding status
    - Platform purposes are readable by all authenticated users

  3. Indexes
    - Index on user_id for onboarding_status
    - Index on industry_type for platform_purposes
*/

-- Create user_onboarding_status table
CREATE TABLE IF NOT EXISTS user_onboarding_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  completed_welcome boolean DEFAULT false,
  completed_industry_selection boolean DEFAULT false,
  completed_purpose_selection boolean DEFAULT false,
  completed_platform_naming boolean DEFAULT false,
  checklist_items_completed jsonb DEFAULT '[]'::jsonb,
  current_step text DEFAULT 'welcome',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create platform_purposes table
CREATE TABLE IF NOT EXISTS platform_purposes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_type text NOT NULL,
  purpose_name text NOT NULL,
  purpose_description text NOT NULL,
  icon text NOT NULL,
  default_automations jsonb DEFAULT '[]'::jsonb,
  display_order integer DEFAULT 0
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_onboarding_status_user_id ON user_onboarding_status(user_id);
CREATE INDEX IF NOT EXISTS idx_platform_purposes_industry ON platform_purposes(industry_type);

-- Enable RLS
ALTER TABLE user_onboarding_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_purposes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_onboarding_status
CREATE POLICY "Users can view own onboarding status"
  ON user_onboarding_status
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own onboarding status"
  ON user_onboarding_status
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding status"
  ON user_onboarding_status
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for platform_purposes
CREATE POLICY "Authenticated users can view platform purposes"
  ON platform_purposes
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default platform purposes
INSERT INTO platform_purposes (industry_type, purpose_name, purpose_description, icon, display_order) VALUES
  ('real-estate', 'Lead Generation', 'Capture and nurture potential property buyers and sellers', 'Target', 1),
  ('real-estate', 'Client Management', 'Manage relationships with buyers, sellers, and investors', 'Users', 2),
  ('real-estate', 'Transaction Tracking', 'Track deals from listing to closing with automated workflows', 'FileText', 3),
  ('real-estate', 'Team Collaboration', 'Coordinate with agents, lenders, and title companies', 'MessageSquare', 4),
  
  ('fitness', 'Member Management', 'Track memberships, attendance, and member progress', 'Users', 1),
  ('fitness', 'Class Scheduling', 'Manage class bookings, instructors, and capacity', 'Calendar', 2),
  ('fitness', 'Nutrition Tracking', 'Monitor client nutrition plans and progress', 'Apple', 3),
  ('fitness', 'Personal Training', 'Manage 1-on-1 sessions, programs, and client goals', 'Dumbbell', 4),
  
  ('professional-services', 'Client Portal', 'Centralized hub for client communication and documents', 'Briefcase', 1),
  ('professional-services', 'Project Management', 'Track deliverables, timelines, and team assignments', 'Trello', 2),
  ('professional-services', 'Invoice & Billing', 'Automate invoicing, payments, and financial tracking', 'DollarSign', 3),
  ('professional-services', 'Appointment Booking', 'Schedule consultations and meetings with clients', 'Calendar', 4),
  
  ('home-services', 'Job Scheduling', 'Dispatch technicians and manage service appointments', 'CalendarCheck', 1),
  ('home-services', 'Customer CRM', 'Track customer history, preferences, and service records', 'UserCheck', 2),
  ('home-services', 'Quote Management', 'Create, send, and track service estimates', 'FileText', 3),
  ('home-services', 'Technician Dispatch', 'Route optimization and real-time job assignments', 'MapPin', 4),
  
  ('ecommerce', 'Inventory Management', 'Track stock levels, suppliers, and reorder points', 'Package', 1),
  ('ecommerce', 'Order Processing', 'Automate order fulfillment and shipping workflows', 'ShoppingCart', 2),
  ('ecommerce', 'Customer Support', 'Manage tickets, returns, and customer inquiries', 'MessageCircle', 3),
  ('ecommerce', 'Marketing Automation', 'Email campaigns, abandoned cart recovery, and promotions', 'Megaphone', 4)
ON CONFLICT DO NOTHING;
