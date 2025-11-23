export interface PlatformPurpose {
  id: string;
  industry_type: string;
  purpose_name: string;
  purpose_description: string;
  icon: string;
  default_automations: any[];
  display_order: number;
}

export interface OnboardingStatus {
  id: string;
  user_id: string;
  completed_welcome: boolean;
  completed_industry_selection: boolean;
  completed_purpose_selection: boolean;
  completed_platform_naming: boolean;
  checklist_items_completed: string[];
  current_step: string;
  created_at: string;
  updated_at: string;
}

export interface OnboardingData {
  industry?: string;
  purpose?: string;
  platformName?: string;
}

export type OnboardingStep = 'welcome' | 'industry' | 'purpose' | 'name' | 'generating' | 'complete';
