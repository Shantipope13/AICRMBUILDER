import { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface PlatformNamingStepProps {
  industryName: string;
  purposeName: string;
  onBack: () => void;
  onNext: (platformName: string) => void;
}

export function PlatformNamingStep({
  industryName,
  purposeName,
  onBack,
  onNext,
}: PlatformNamingStepProps) {
  const [platformName, setPlatformName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateName = (name: string): boolean => {
    if (name.length < 2) {
      setError('Name must be at least 2 characters');
      return false;
    }
    if (name.length > 50) {
      setError('Name must be less than 50 characters');
      return false;
    }
    if (!/^[a-zA-Z0-9\s&'-]+$/.test(name)) {
      setError('Only letters, numbers, spaces, &, \', and - allowed');
      return false;
    }
    setError(null);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPlatformName(value);
    if (value.length > 0) {
      validateName(value);
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateName(platformName)) {
      onNext(platformName);
    }
  };

  const handleSkip = () => {
    const defaultName = `My ${industryName} Platform`;
    onNext(defaultName);
  };

  const exampleNames = [
    'Premier Realty Group',
    'Elite Fitness Studio',
    'Bright Solutions Consulting',
    'Swift Home Services',
    'Urban Style Shop',
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <button onClick={onBack} className="btn-brutal bg-white mb-4 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 bg-yellow-300 rounded-full border-2 border-black"></div>
            <div className="w-2 h-2 bg-yellow-300 rounded-full border-2 border-black"></div>
            <div className="w-2 h-2 bg-yellow-300 rounded-full border-2 border-black"></div>
          </div>

          <p className="text-center text-sm font-black text-gray-600 mb-2">STEP 3 OF 3</p>
          <h1 className="text-4xl md:text-5xl font-black text-center mb-4 animate-slide-up">
            Name your platform
          </h1>
          <p className="text-xl font-bold text-gray-600 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            This will be displayed on your dashboard and to your team
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="card-brutal-lg bg-white">
            <label className="block font-black text-lg mb-4">Platform Name</label>
            <input
              type="text"
              value={platformName}
              onChange={handleChange}
              placeholder={exampleNames[Math.floor(Math.random() * exampleNames.length)]}
              className={`w-full px-6 py-4 text-2xl border-4 ${
                error ? 'border-red-500' : 'border-black'
              } font-bold focus:outline-none focus:border-yellow-300 transition-colors`}
              autoFocus
            />
            {error && (
              <p className="mt-3 text-red-600 font-bold text-sm">{error}</p>
            )}
            <div className="mt-4 pt-4 border-t-4 border-black">
              <p className="text-sm font-bold text-gray-600 mb-2">
                Examples: {exampleNames.slice(0, 3).join(', ')}
              </p>
            </div>
          </div>

          <div className="card-brutal bg-gradient-to-r from-blue-100 to-blue-200">
            <div className="flex items-start gap-4">
              <Sparkles className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <p className="font-black mb-1">What you'll get:</p>
                <p className="font-bold text-gray-700 text-sm leading-relaxed">
                  A fully customized {industryName} platform optimized for {purposeName.toLowerCase()},
                  with pre-configured workflows, automations, and industry-specific features.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={handleSkip}
              className="btn-brutal bg-white px-8 py-4 text-lg"
            >
              Skip for Now
            </button>
            <button
              type="submit"
              disabled={!platformName || !!error}
              className="btn-brutal bg-yellow-300 px-10 py-4 text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
            >
              Build My Platform
              <ArrowRight className="w-5 h-5 inline ml-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
