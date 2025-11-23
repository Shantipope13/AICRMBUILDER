import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getPurposesForIndustry } from '../services/onboardingService';
import type { PlatformPurpose } from '../types/onboarding';
import { Toast } from './Toast';

interface PurposeSelectionStepProps {
  industryType: string;
  industryName: string;
  onBack: () => void;
  onNext: (purposeId: string, purposeName: string) => void;
}

export function PurposeSelectionStep({
  industryType,
  industryName,
  onBack,
  onNext,
}: PurposeSelectionStepProps) {
  const [purposes, setPurposes] = useState<PlatformPurpose[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadPurposes();
  }, [industryType]);

  const loadPurposes = async () => {
    setLoading(true);
    try {
      const { data, error } = await getPurposesForIndustry(industryType);
      if (error) throw error;
      setPurposes(data || []);
    } catch (err) {
      console.error('Failed to load purposes:', err);
      setToast({ message: 'Failed to load options. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!selectedPurpose) return;

    const purpose = purposes.find(p => p.id === selectedPurpose);
    if (purpose) {
      onNext(purpose.id, purpose.purpose_name);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-lg font-bold text-gray-600">Loading options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <button onClick={onBack} className="btn-brutal bg-white mb-4 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 bg-yellow-300 rounded-full border-2 border-black"></div>
            <div className="w-2 h-2 bg-yellow-300 rounded-full border-2 border-black"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full border-2 border-black"></div>
          </div>

          <p className="text-center text-sm font-black text-gray-600 mb-2">STEP 2 OF 3</p>
          <h1 className="text-4xl md:text-5xl font-black text-center mb-4">
            What's your main goal?
          </h1>
          <p className="text-xl font-bold text-gray-600 text-center">
            Choose the primary purpose for your {industryName} platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {purposes.map((purpose, index) => {
            const IconComponent = (LucideIcons as any)[purpose.icon] || LucideIcons.Target;
            const isSelected = selectedPurpose === purpose.id;

            return (
              <button
                key={purpose.id}
                onClick={() => setSelectedPurpose(purpose.id)}
                className={`card-brutal text-left transition-all hover:scale-105 animate-scale-in ${
                  isSelected
                    ? 'bg-yellow-300 ring-4 ring-yellow-400'
                    : 'bg-white hover:bg-gray-50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 ${
                      isSelected ? 'bg-black' : 'bg-blue-300'
                    } border-4 border-black flex items-center justify-center flex-shrink-0`}
                  >
                    <IconComponent className={`w-8 h-8 ${isSelected ? 'text-yellow-300' : 'text-black'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-2">{purpose.purpose_name}</h3>
                    <p className="font-bold text-gray-700 leading-relaxed">
                      {purpose.purpose_description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-black border-2 border-white flex items-center justify-center rounded-full flex-shrink-0">
                      <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleNext}
            disabled={!selectedPurpose}
            className="btn-brutal bg-yellow-300 text-xl px-10 py-4 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
          >
            Continue
            <ArrowRight className="w-5 h-5 inline ml-3" />
          </button>
        </div>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
