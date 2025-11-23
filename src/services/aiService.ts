import { getBytezClient, isBytezAvailable } from '../lib/bytezClient';
import { BytezResponse, AIQuestion, BytezModelConfig } from '../types/bytez';
import { IndustryType, GenerationConfig } from '../types';
import { getQuestionGenerationPrompt, getConfigGenerationPrompt } from './promptTemplates';
import { industryQuestions } from '../data/industries';
import { getIndustryTemplate } from '../data/industryTemplates';

const DEFAULT_MODEL = 'google/flan-t5-base';

const MODEL_CONFIG: BytezModelConfig = {
  max_new_tokens: 500,
  min_new_tokens: 50,
  temperature: 0.7,
  do_sample: true
};

async function runBytezModel(prompt: string): Promise<string | null> {
  const client = getBytezClient();

  if (!client) {
    console.warn('Bytez client not available, using fallback');
    return null;
  }

  try {
    const model = client.model(DEFAULT_MODEL);

    const { error, output } = await model.run(prompt, MODEL_CONFIG) as BytezResponse<string>;

    if (error) {
      console.error('Bytez API error:', error);
      return null;
    }

    return output;
  } catch (error) {
    console.error('Error calling Bytez API:', error);
    return null;
  }
}

function cleanJsonResponse(text: string): string {
  const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (jsonMatch) {
    return jsonMatch[0];
  }
  return text;
}

export async function generateQuestion(
  industry: IndustryType,
  questionNumber: number
): Promise<AIQuestion | null> {
  if (!isBytezAvailable()) {
    const fallbackQuestions = industryQuestions[industry];
    if (fallbackQuestions && fallbackQuestions[questionNumber - 1]) {
      return fallbackQuestions[questionNumber - 1];
    }
    return null;
  }

  const prompt = getQuestionGenerationPrompt(industry, questionNumber);
  const response = await runBytezModel(prompt);

  if (!response) {
    const fallbackQuestions = industryQuestions[industry];
    return fallbackQuestions?.[questionNumber - 1] || null;
  }

  try {
    const cleanedResponse = cleanJsonResponse(response);
    const questionData = JSON.parse(cleanedResponse);

    return {
      id: `ai-question-${questionNumber}`,
      question: questionData.question,
      hint: questionData.hint,
      placeholder: questionData.placeholder
    };
  } catch (error) {
    console.error('Error parsing AI question response:', error);
    const fallbackQuestions = industryQuestions[industry];
    return fallbackQuestions?.[questionNumber - 1] || null;
  }
}

export async function generateCRMFields(config: GenerationConfig): Promise<any[]> {
  if (!isBytezAvailable()) {
    const template = getIndustryTemplate(config.industry);
    return template.crmFields;
  }

  const prompt = getConfigGenerationPrompt(config, 'crmFields');
  const response = await runBytezModel(prompt);

  if (!response) {
    const template = getIndustryTemplate(config.industry);
    return template.crmFields;
  }

  try {
    const cleanedResponse = cleanJsonResponse(response);
    const fields = JSON.parse(cleanedResponse);
    return Array.isArray(fields) ? fields : [];
  } catch (error) {
    console.error('Error parsing CRM fields:', error);
    const template = getIndustryTemplate(config.industry);
    return template.crmFields;
  }
}

export async function generatePipelineStages(config: GenerationConfig): Promise<any[]> {
  if (!isBytezAvailable()) {
    const template = getIndustryTemplate(config.industry);
    return template.pipelineStages;
  }

  const prompt = getConfigGenerationPrompt(config, 'pipelineStages');
  const response = await runBytezModel(prompt);

  if (!response) {
    const template = getIndustryTemplate(config.industry);
    return template.pipelineStages;
  }

  try {
    const cleanedResponse = cleanJsonResponse(response);
    const stages = JSON.parse(cleanedResponse);
    return Array.isArray(stages) ? stages : [];
  } catch (error) {
    console.error('Error parsing pipeline stages:', error);
    const template = getIndustryTemplate(config.industry);
    return template.pipelineStages;
  }
}

export async function generateEmailTemplates(config: GenerationConfig): Promise<any[]> {
  if (!isBytezAvailable()) {
    const template = getIndustryTemplate(config.industry);
    return template.emailTemplates;
  }

  const prompt = getConfigGenerationPrompt(config, 'emailTemplates');
  const response = await runBytezModel(prompt);

  if (!response) {
    const template = getIndustryTemplate(config.industry);
    return template.emailTemplates;
  }

  try {
    const cleanedResponse = cleanJsonResponse(response);
    const templates = JSON.parse(cleanedResponse);
    return Array.isArray(templates) ? templates : [];
  } catch (error) {
    console.error('Error parsing email templates:', error);
    const template = getIndustryTemplate(config.industry);
    return template.emailTemplates;
  }
}

export async function generateAutomations(config: GenerationConfig): Promise<any[]> {
  if (!isBytezAvailable()) {
    const template = getIndustryTemplate(config.industry);
    return template.automations;
  }

  const prompt = getConfigGenerationPrompt(config, 'automations');
  const response = await runBytezModel(prompt);

  if (!response) {
    const template = getIndustryTemplate(config.industry);
    return template.automations;
  }

  try {
    const cleanedResponse = cleanJsonResponse(response);
    const automations = JSON.parse(cleanedResponse);
    return Array.isArray(automations) ? automations : [];
  } catch (error) {
    console.error('Error parsing automations:', error);
    const template = getIndustryTemplate(config.industry);
    return template.automations;
  }
}

export async function generateDashboardWidgets(config: GenerationConfig): Promise<any[]> {
  if (!isBytezAvailable()) {
    const template = getIndustryTemplate(config.industry);
    return template.dashboardWidgets;
  }

  const prompt = getConfigGenerationPrompt(config, 'dashboardWidgets');
  const response = await runBytezModel(prompt);

  if (!response) {
    const template = getIndustryTemplate(config.industry);
    return template.dashboardWidgets;
  }

  try {
    const cleanedResponse = cleanJsonResponse(response);
    const widgets = JSON.parse(cleanedResponse);
    return Array.isArray(widgets) ? widgets : [];
  } catch (error) {
    console.error('Error parsing dashboard widgets:', error);
    const template = getIndustryTemplate(config.industry);
    return template.dashboardWidgets;
  }
}

export async function generatePlatformConfig(config: GenerationConfig): Promise<any> {
  const [crmFields, pipelineStages, emailTemplates, automations, dashboardWidgets] = await Promise.all([
    generateCRMFields(config),
    generatePipelineStages(config),
    generateEmailTemplates(config),
    generateAutomations(config),
    generateDashboardWidgets(config)
  ]);

  return {
    crmFields,
    pipelineStages,
    emailTemplates,
    automations,
    dashboardWidgets
  };
}
