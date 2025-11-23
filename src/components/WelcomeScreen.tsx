import { Sparkles, Zap, Target, Rocket, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  userName?: string;
  onGetStarted: () => void;
}

export function WelcomeScreen({ userName, onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in">
          <div className="w-24 h-24 bg-yellow-300 border-4 border-black mx-auto mb-8 flex items-center justify-center animate-bounce-in">
            <Sparkles className="w-12 h-12" />
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6 animate-slide-up">
            Welcome{userName ? `, ${userName}` : ''}!
          </h1>

          <p className="text-2xl md:text-3xl font-bold text-gray-700 mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Let's build your perfect <span className="text-yellow-600">Command Center</span> in under 30 seconds
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="card-brutal bg-white animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-green-300 border-4 border-black mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black mb-2">Lightning Fast</h3>
              <p className="font-bold text-gray-600">
                Your custom platform ready in 30 seconds
              </p>
            </div>

            <div className="card-brutal bg-white animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-blue-300 border-4 border-black mx-auto mb-4 flex items-center justify-center">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black mb-2">Built For You</h3>
              <p className="font-bold text-gray-600">
                Tailored specifically to your industry needs
              </p>
            </div>

            <div className="card-brutal bg-white animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-pink-300 border-4 border-black mx-auto mb-4 flex items-center justify-center">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black mb-2">Ready to Use</h3>
              <p className="font-bold text-gray-600">
                Pre-configured automations and workflows
              </p>
            </div>
          </div>

          <button
            onClick={onGetStarted}
            className="btn-brutal bg-yellow-300 text-2xl px-12 py-6 hover:scale-105 transition-transform animate-scale-in"
            style={{ animationDelay: '0.5s' }}
          >
            Get Started
            <ArrowRight className="w-6 h-6 inline ml-3" />
          </button>

          <p className="mt-8 text-sm font-bold text-gray-500 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Just 3 simple steps to your perfect platform
          </p>
        </div>
      </div>
    </div>
  );
}
