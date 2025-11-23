export type IndustryType =
  | 'real-estate'
  | 'fitness'
  | 'professional-services'
  | 'home-services'
  | 'ecommerce';

export interface Industry {
  id: IndustryType;
  name: string;
  icon: string;
  description: string;
  color: string;
  examples: string[];
}

export interface ConversationMessage {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

export interface GenerationConfig {
  industry: IndustryType;
  businessName: string;
  businessModel: string;
  teamSize: string;
  primaryGoal: string;
  currentTools: string;
  painPoints: string;
}

export interface PlatformConfig {
  id: string;
  industryType: IndustryType;
  businessName: string;
  generatedAt: Date;
  config: GenerationConfig;
  theme: ThemeConfig;
  features: FeatureConfig;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoText: string;
}

export interface FeatureConfig {
  crmFields: CRMField[];
  pipelineStages: PipelineStage[];
  dashboardWidgets: DashboardWidget[];
  emailTemplates: EmailTemplate[];
  automations: Automation[];
}

export interface CRMField {
  id: string;
  name: string;
  type: 'text' | 'email' | 'phone' | 'number' | 'date' | 'select' | 'multiselect';
  required: boolean;
  options?: string[];
}

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  order: number;
}

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'list' | 'activity';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  config: Record<string, any>;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  trigger: string;
}

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  enabled: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  stage: string;
  value?: number;
  customFields: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Opportunity {
  id: string;
  title: string;
  contactId: string;
  stage: string;
  value: number;
  probability: number;
  expectedCloseDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  contactId?: string;
  startTime: Date;
  endTime: Date;
  type: 'meeting' | 'call' | 'task' | 'deadline';
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  contactId?: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string;
}
