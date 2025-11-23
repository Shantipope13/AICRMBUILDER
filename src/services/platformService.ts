import { supabase } from '../lib/supabase';

async function getUserId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export interface SavedPlatform {
  id: string;
  industry_type: string;
  business_name: string;
  generated_at: string;
  config: any;
  theme: any;
  features: any;
  created_at: string;
  updated_at: string;
}

export async function savePlatform(
  industryType: string,
  businessName: string,
  config: any,
  theme: any,
  features: any
): Promise<{ data: SavedPlatform | null; error: any }> {
  const userId = await getUserId();

  if (!userId) {
    return { data: null, error: new Error('User must be logged in to save platforms') };
  }

  const { data, error } = await supabase
    .from('platforms')
    .insert({
      industry_type: industryType,
      business_name: businessName,
      config,
      theme,
      features,
      user_session: userId,
    })
    .select()
    .maybeSingle();

  return { data, error };
}

export async function getUserPlatforms(): Promise<{
  data: SavedPlatform[] | null;
  error: any;
}> {
  const { data, error } = await supabase
    .from('platforms')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function getPlatformById(
  id: string
): Promise<{ data: SavedPlatform | null; error: any }> {
  const { data, error } = await supabase
    .from('platforms')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  return { data, error };
}

export async function updatePlatform(
  id: string,
  updates: Partial<SavedPlatform>
): Promise<{ data: SavedPlatform | null; error: any }> {
  const { data, error } = await supabase
    .from('platforms')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .maybeSingle();

  return { data, error };
}

export async function deletePlatform(id: string): Promise<{ error: any }> {
  const { error } = await supabase.from('platforms').delete().eq('id', id);

  return { error };
}

export async function saveConversation(
  platformId: string,
  industryType: string,
  conversationData: any[]
): Promise<{ error: any }> {
  const { error } = await supabase.from('ai_conversations').insert({
    platform_id: platformId,
    industry_type: industryType,
    conversation_data: conversationData,
  });

  return { error };
}

export async function logGeneration(
  platformId: string,
  componentType: string,
  modelUsed: string,
  success: boolean,
  generationTimeMs: number,
  errorMessage?: string,
  promptTokens?: number,
  completionTokens?: number
): Promise<{ error: any }> {
  const { error } = await supabase.from('ai_generation_logs').insert({
    platform_id: platformId,
    component_type: componentType,
    model_used: modelUsed,
    success,
    generation_time_ms: generationTimeMs,
    error_message: errorMessage,
    prompt_tokens: promptTokens,
    completion_tokens: completionTokens,
  });

  return { error };
}
