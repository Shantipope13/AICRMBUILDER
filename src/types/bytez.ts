export interface BytezResponse<T = any> {
  error: string | null;
  output: T;
}

export interface BytezModelConfig {
  max_new_tokens?: number;
  min_new_tokens?: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  do_sample?: boolean;
}

export interface AIQuestion {
  id: string;
  question: string;
  hint: string;
  placeholder: string;
}

export interface AIGeneratedConfig {
  crmFields: any[];
  pipelineStages: any[];
  dashboardWidgets: any[];
  emailTemplates: any[];
  automations: any[];
}
