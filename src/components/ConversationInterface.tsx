import { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { ConversationMessage, IndustryType, GenerationConfig } from '../types';
import { AIQuestion } from '../types/bytez';
import { generateQuestion } from '../services/aiService';
import { industryQuestions } from '../data/industries';

interface ConversationInterfaceProps {
  industry: IndustryType;
  onComplete: (config: GenerationConfig) => void;
}

export function ConversationInterface({ industry, onComplete }: ConversationInterfaceProps) {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState<AIQuestion | null>(null);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const TOTAL_QUESTIONS = 5;

  useEffect(() => {
    const welcomeMessage: ConversationMessage = {
      id: '1',
      role: 'ai',
      content: `Hi! I'm your AI assistant. I'll help you create a custom business platform tailored specifically for your ${industry.replace('-', ' ')} business. Let me ask you a few questions to understand your needs better.`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);

    setTimeout(() => {
      askNextQuestion();
    }, 1500);
  }, [industry]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const askNextQuestion = async () => {
    if (currentQuestionIndex < TOTAL_QUESTIONS) {
      setIsTyping(true);
      setIsGeneratingQuestion(true);

      const question = await generateQuestion(industry, currentQuestionIndex + 1);

      if (question) {
        setCurrentQuestion(question);
        const aiMessage: ConversationMessage = {
          id: Date.now().toString(),
          role: 'ai',
          content: question.question,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        const fallbackQuestions = industryQuestions[industry];
        const fallbackQuestion = fallbackQuestions?.[currentQuestionIndex];
        if (fallbackQuestion) {
          setCurrentQuestion(fallbackQuestion);
          const aiMessage: ConversationMessage = {
            id: Date.now().toString(),
            role: 'ai',
            content: fallbackQuestion.question,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiMessage]);
        }
      }

      setIsTyping(false);
      setIsGeneratingQuestion(false);
    } else {
      finishConversation();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: currentInput,
      timestamp: new Date()
    };

    if (currentQuestion) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: currentInput
      }));
    }

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setCurrentQuestionIndex(prev => prev + 1);

    setTimeout(() => {
      askNextQuestion();
    }, 500);
  };

  const finishConversation = () => {
    setIsTyping(true);
    setTimeout(() => {
      const finalMessage: ConversationMessage = {
        id: Date.now().toString(),
        role: 'ai',
        content: 'Perfect! I have everything I need. Let me generate your custom platform now...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, finalMessage]);
      setIsTyping(false);

      setTimeout(() => {
        const config: GenerationConfig = {
          industry,
          businessName: answers['business-name'] || 'Your Business',
          businessModel: answers['business-model'] || '',
          teamSize: answers['team-size'] || '',
          primaryGoal: answers['primary-goal'] || '',
          currentTools: answers['current-tools'] || '',
          painPoints: answers['pain-points'] || ''
        };
        onComplete(config);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="border-b-4 border-black bg-yellow-300 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-xl font-black">INFLUXX</h2>
              <p className="text-xs font-bold uppercase">Platform Generator</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold">Question {Math.min(currentQuestionIndex + 1, TOTAL_QUESTIONS)} of {TOTAL_QUESTIONS}</div>
            <div className="text-xs font-bold text-gray-700">
              {Math.min(Math.round(((currentQuestionIndex) / TOTAL_QUESTIONS) * 100), 100)}% Complete
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`animate-slide-up ${message.role === 'ai' ? 'mr-12' : 'ml-12'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                {message.role === 'ai' && (
                  <div className="w-10 h-10 bg-yellow-300 border-4 border-black flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                )}
                <div className={`card-brutal ${message.role === 'ai' ? 'bg-gray-50' : 'bg-blue-100'} flex-1`}>
                  <p className="font-bold leading-relaxed">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-10 h-10 bg-blue-300 border-4 border-black flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 bg-black rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="mr-12 animate-slide-up">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-yellow-300 border-4 border-black flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="card-brutal bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-bold text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {currentQuestionIndex < TOTAL_QUESTIONS && !isTyping && !isGeneratingQuestion && (
        <div className="border-t-4 border-black bg-gray-50 px-6 py-6">
          <div className="max-w-4xl mx-auto">
            {currentQuestion && (
              <div className="mb-4">
                <p className="text-sm font-bold text-gray-600 mb-1">{currentQuestion.hint}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder={currentQuestion?.placeholder || 'Type your answer...'}
                className="input-brutal flex-1"
                autoFocus
              />
              <button
                type="submit"
                className="btn-brutal bg-yellow-300 px-8"
                disabled={!currentInput.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
