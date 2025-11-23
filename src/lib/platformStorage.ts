import { supabase } from './supabase';
import { PlatformConfig } from '../types';

function getSessionId(): string {
  let sessionId = localStorage.getItem('vertex-session-id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('vertex-session-id', sessionId);
  }
  return sessionId;
}

export async function savePlatform(platform: PlatformConfig): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const sessionId = getSessionId();

    const { data, error } = await supabase
      .from('platforms')
      .insert({
        id: platform.id,
        industry_type: platform.industryType,
        business_name: platform.businessName,
        generated_at: platform.generatedAt.toISOString(),
        config: platform.config,
        theme: platform.theme,
        features: platform.features,
        user_session: sessionId
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error saving platform:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Error saving platform:', error);
    return { success: false, error: 'Failed to save platform' };
  }
}

export async function loadPlatforms(): Promise<{ success: boolean; platforms?: PlatformConfig[]; error?: string }> {
  try {
    const sessionId = getSessionId();

    const { data, error } = await supabase
      .from('platforms')
      .select('*')
      .eq('user_session', sessionId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading platforms:', error);
      return { success: false, error: error.message };
    }

    const platforms: PlatformConfig[] = (data || []).map(row => ({
      id: row.id,
      industryType: row.industry_type,
      businessName: row.business_name,
      generatedAt: new Date(row.generated_at),
      config: row.config,
      theme: row.theme,
      features: row.features
    }));

    return { success: true, platforms };
  } catch (error) {
    console.error('Error loading platforms:', error);
    return { success: false, error: 'Failed to load platforms' };
  }
}

export async function loadPlatformById(id: string): Promise<{ success: boolean; platform?: PlatformConfig; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('platforms')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error loading platform:', error);
      return { success: false, error: error.message };
    }

    if (!data) {
      return { success: false, error: 'Platform not found' };
    }

    const platform: PlatformConfig = {
      id: data.id,
      industryType: data.industry_type,
      businessName: data.business_name,
      generatedAt: new Date(data.generated_at),
      config: data.config,
      theme: data.theme,
      features: data.features
    };

    return { success: true, platform };
  } catch (error) {
    console.error('Error loading platform:', error);
    return { success: false, error: 'Failed to load platform' };
  }
}

export async function loadRecentPlatforms(limit: number = 6): Promise<{ success: boolean; platforms?: PlatformConfig[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('platforms')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error loading recent platforms:', error);
      return { success: false, error: error.message };
    }

    const platforms: PlatformConfig[] = (data || []).map(row => ({
      id: row.id,
      industryType: row.industry_type,
      businessName: row.business_name,
      generatedAt: new Date(row.generated_at),
      config: row.config,
      theme: row.theme,
      features: row.features
    }));

    return { success: true, platforms };
  } catch (error) {
    console.error('Error loading recent platforms:', error);
    return { success: false, error: 'Failed to load recent platforms' };
  }
}
