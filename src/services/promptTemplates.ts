import { IndustryType, GenerationConfig } from '../types';

export function getQuestionGenerationPrompt(industry: IndustryType, questionNumber: number): string {
  const industryContext = {
    'real-estate': 'real estate agencies, property management, or real estate sales',
    'fitness': 'fitness centers, gyms, personal training, or wellness coaching',
    'professional-services': 'consulting firms, law practices, accounting services, or professional advisory',
    'home-services': 'home repair, landscaping, cleaning services, or home improvement',
    'ecommerce': 'online retail, e-commerce stores, or digital product sales'
  };

  const questionFocus = [
    'their business name and primary service offering',
    'their business model and how they generate revenue',
    'their team size and organizational structure',
    'their primary business goals and what success looks like',
    'their current tools and biggest operational pain points'
  ];

  return `You are helping build a custom business management platform for a ${industryContext[industry]} business.

Generate question ${questionNumber} of 5 to understand ${questionFocus[questionNumber - 1]}.

Requirements:
- Ask ONE clear, specific question
- Keep it conversational and friendly
- Focus on ${questionFocus[questionNumber - 1]}
- The question should be answerable in 1-2 sentences
- Don't use technical jargon

Format your response as JSON with these fields:
{
  "question": "the question text",
  "hint": "a brief hint about what kind of answer you're looking for",
  "placeholder": "example placeholder text for the input field"
}

Generate the question now:`;
}

export function getConfigGenerationPrompt(config: GenerationConfig, componentType: string): string {
  const prompts = {
    crmFields: `Based on this ${config.industry} business:
- Business Name: ${config.businessName}
- Business Model: ${config.businessModel}
- Team Size: ${config.teamSize}
- Primary Goal: ${config.primaryGoal}

Generate 8-12 custom CRM fields that would be essential for managing their contacts and deals.

Return ONLY a valid JSON array with this structure:
[
  {
    "id": "field-id-kebab-case",
    "name": "Field Display Name",
    "type": "text|email|phone|number|date|select|multiselect",
    "required": true|false,
    "options": ["option1", "option2"] (only for select/multiselect types)
  }
]

Always include these base fields: name, email, phone. Then add industry-specific fields.`,

    pipelineStages: `Based on this ${config.industry} business:
- Business Name: ${config.businessName}
- Business Model: ${config.businessModel}
- Primary Goal: ${config.primaryGoal}

Generate 5-7 pipeline stages that represent their sales/project workflow from initial contact to completion.

Return ONLY a valid JSON array with this structure:
[
  {
    "id": "stage-id-kebab-case",
    "name": "Stage Name",
    "color": "bg-color-300",
    "order": 1
  }
]

Use these Tailwind colors: gray, blue, yellow, orange, purple, green, red. The last stage should be "Closed Won" or similar.`,

    emailTemplates: `Based on this ${config.industry} business:
- Business Name: ${config.businessName}
- Business Model: ${config.businessModel}
- Current Pain Points: ${config.painPoints}

Generate 3-4 email templates for common scenarios in their workflow.

Return ONLY a valid JSON array with this structure:
[
  {
    "id": "template-id-kebab-case",
    "name": "Template Name",
    "subject": "Email Subject Line",
    "body": "Email body with {{name}}, {{company}}, etc. for variables",
    "trigger": "When to send this email"
  }
]

Include templates for: welcome/introduction, follow-up, and status update scenarios.`,

    automations: `Based on this ${config.industry} business:
- Business Name: ${config.businessName}
- Primary Goal: ${config.primaryGoal}
- Pain Points: ${config.painPoints}
- Current Tools: ${config.currentTools}

Generate 4-6 automation rules that would solve their pain points and help achieve their goals.

Return ONLY a valid JSON array with this structure:
[
  {
    "id": "automation-id-kebab-case",
    "name": "Automation Name",
    "trigger": "What triggers this automation",
    "actions": ["Action 1", "Action 2"],
    "enabled": true
  }
]

Focus on automations that reduce manual work and prevent leads from falling through cracks.`,

    dashboardWidgets: `Based on this ${config.industry} business:
- Business Name: ${config.businessName}
- Business Model: ${config.businessModel}
- Primary Goal: ${config.primaryGoal}

Generate 6-8 dashboard widgets/metrics that would be most valuable for tracking their success.

Return ONLY a valid JSON array with this structure:
[
  {
    "id": "widget-id-kebab-case",
    "type": "metric|chart|list|activity",
    "title": "Widget Title",
    "position": {"x": 0, "y": 0, "w": 1, "h": 1},
    "config": {"metricType": "description of what it tracks"}
  }
]

Position: x and y are grid positions (0-2), w and h are width and height (1-2). Include revenue, pipeline, activity metrics.`
  };

  return prompts[componentType as keyof typeof prompts] || '';
}
