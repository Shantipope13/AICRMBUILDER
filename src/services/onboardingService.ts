import { supabase } from '../lib/supabase';
import type { OnboardingStatus, PlatformPurpose, OnboardingStep } from '../types/onboarding';

export async function getOnboardingStatus(): Promise<{
  data: OnboardingStatus | null;
  error: any;
}> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: new Error('User not authenticated') };
  }

  const { data, error } = await supabase
    .from('user_onboarding_status')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  return { data, error };
}

export async function createOnboardingStatus(): Promise<{
  data: OnboardingStatus | null;
  error: any;
}> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: new Error('User not authenticated') };
  }

  const { data, error } = await supabase
    .from('user_onboarding_status')
    .insert({
      user_id: user.id,
      current_step: 'welcome',
    })
    .select()
    .maybeSingle();

  return { data, error };
}

export async function updateOnboardingStep(step: OnboardingStep, completed: boolean = true): Promise<{
  error: any;
}> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: new Error('User not authenticated') };
  }

  const updates: any = {
    current_step: step,
    updated_at: new Date().toISOString(),
  };

  if (step === 'welcome' && completed) {
    updates.completed_welcome = true;
  } else if (step === 'industry' && completed) {
    updates.completed_industry_selection = true;
  } else if (step === 'purpose' && completed) {
    updates.completed_purpose_selection = true;
  } else if (step === 'name' && completed) {
    updates.completed_platform_naming = true;
  }

  const { error } = await supabase
    .from('user_onboarding_status')
    .update(updates)
    .eq('user_id', user.id);

  return { error };
}

export async function getPurposesForIndustry(industryType: string): Promise<{
  data: PlatformPurpose[] | null;
  error: any;
}> {
  const { data, error } = await supabase
    .from('platform_purposes')
    .select('*')
    .eq('industry_type', industryType)
    .order('display_order', { ascending: true });

  return { data, error };
}

export async function updateChecklistItem(itemId: string, completed: boolean): Promise<{
  error: any;
}> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: new Error('User not authenticated') };
  }

  const { data: status } = await getOnboardingStatus();

  if (!status) {
    return { error: new Error('Onboarding status not found') };
  }

  const currentItems = status.checklist_items_completed || [];
  const updatedItems = completed
    ? [...currentItems, itemId]
    : currentItems.filter(id => id !== itemId);

  const { error } = await supabase
    .from('user_onboarding_status')
    .update({
      checklist_items_completed: updatedItems,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id);

  return { error };
}

export async function getOrCreateOnboardingStatus(): Promise<{
  data: OnboardingStatus | null;
  error: any;
}> {
  let { data, error } = await getOnboardingStatus();

  if (error || !data) {
    const result = await createOnboardingStatus();
    data = result.data;
    error = result.error;
  }

  return { data, error };
}
