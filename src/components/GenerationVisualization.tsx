import { useState, useEffect } from 'react';
import { Sparkles, Database, Layout, Zap, CheckCircle2 } from 'lucide-react';
import { GenerationConfig, PlatformConfig } from '../types';
import { generatePlatformConfig } from '../services/aiService';

interface GenerationVisualizationProps {
  config: GenerationConfig;
  onComplete: (platformConfig: PlatformConfig) => void;
}

interface GenerationStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  duration: number;
  color: string;
}

const generationSteps: GenerationStep[] = [
  {
    id: 'analyze',
    title: 'Analyzing your industry...',
    description: 'Understanding your business needs and goals',
    icon: Sparkles,
    duration: 1500,
    color: 'bg-yellow-300'
  },
  {
    id: 'workflow',
    title: 'Customizing your workflows...',
    description: 'Building pipeline stages and processes',
    icon: Layout,
    duration: 2000,
    color: 'bg-blue-300'
  },
  {
    id: 'dashboard',
    title: 'Building your dashboard...',
    description: 'Creating custom fields and analytics',
    icon: Database,
    duration: 2000,
    color: 'bg-green-300'
  },
  {
    id: 'automation',
    title: 'Setting up automations...',
    description: 'Configuring smart workflows and triggers',
    icon: Zap,
    duration: 1500,
    color: 'bg-orange-300'
  }
];

export function GenerationVisualization({ config, onComplete }: GenerationVisualizationProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStepIndex < generationSteps.length) {
      const currentStep = generationSteps[currentStepIndex];

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const increment = 100 / (currentStep.duration / 50);
          return Math.min(prev + increment, 100);
        });
      }, 50);

      const timer = setTimeout(() => {
        clearInterval(progressInterval);
        setCompletedSteps(prev => [...prev, currentStep.id]);
        setProgress(0);
        setCurrentStepIndex(prev => prev + 1);
      }, currentStep.duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    } else {
      (async () => {
        const features = await generatePlatformConfig(config);

        const platformConfig: PlatformConfig = {
          id: Date.now().toString(),
          industryType: config.industry,
          businessName: config.businessName,
          generatedAt: new Date(),
          config,
          theme: {
            primaryColor: '#000000',
            secondaryColor: '#FFD700',
            accentColor: '#00FF94',
            logoText: config.businessName
          },
          features
        };
        onComplete(platformConfig);
      })();
    }
  }, [currentStepIndex, config, onComplete]);

  const totalProgress = ((currentStepIndex + (progress / 100)) / generationSteps.length) * 100;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-yellow-300 border-4 border-black flex items-center justify-center animate-bounce-in">
              <Sparkles className="w-10 h-10 animate-spin" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">
            Generating Your Platform
          </h2>
          <p className="text-xl font-bold text-gray-600">
            Building a custom solution for {config.businessName}
          </p>
        </div>

        <div className="card-brutal-lg bg-white mb-8 animate-scale-in">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-black text-lg">Overall Progress</span>
              <span className="font-black text-lg">{Math.round(totalProgress)}%</span>
            </div>
            <div className="h-6 bg-gray-200 border-4 border-black overflow-hidden">
              <div
                className="h-full bg-yellow-300 transition-all duration-300 flex items-center justify-end px-2"
                style={{ width: `${totalProgress}%` }}
              >
                {totalProgress > 10 && (
                  <div className="w-3 h-3 bg-black animate-pulse"></div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {generationSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStepIndex === index;
              const IconComponent = step.icon;

              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-4 p-4 border-4 border-black transition-all duration-300 ${
                    isCurrent
                      ? `${step.color} scale-105`
                      : isCompleted
                      ? 'bg-gray-100'
                      : 'bg-white opacity-50'
                  }`}
                  style={{
                    transform: isCurrent ? 'translateX(8px)' : 'translateX(0)'
                  }}
                >
                  <div className={`w-12 h-12 border-4 border-black flex items-center justify-center flex-shrink-0 ${
                    isCompleted ? 'bg-green-400' : 'bg-white'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <IconComponent className={`w-6 h-6 ${isCurrent ? 'animate-pulse' : ''}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black mb-1">{step.title}</h3>
                    <p className="font-bold text-gray-700">{step.description}</p>
                    {isCurrent && (
                      <div className="mt-3">
                        <div className="h-3 bg-white border-2 border-black overflow-hidden">
                          <div
                            className="h-full bg-black transition-all duration-100"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 animate-fade-in">
          <div className="card-brutal bg-yellow-100 text-center p-4">
            <div className="text-2xl font-black mb-1">{completedSteps.length}</div>
            <div className="text-sm font-bold text-gray-700">Steps Complete</div>
          </div>
          <div className="card-brutal bg-blue-100 text-center p-4">
            <div className="text-2xl font-black mb-1">{generationSteps.length - completedSteps.length}</div>
            <div className="text-sm font-bold text-gray-700">Steps Remaining</div>
          </div>
          <div className="card-brutal bg-green-100 text-center p-4">
            <div className="text-2xl font-black mb-1">~2m</div>
            <div className="text-sm font-bold text-gray-700">Time Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
}
