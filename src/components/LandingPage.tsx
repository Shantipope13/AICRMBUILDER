import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap, Target, Rocket, ExternalLink, Clock, User } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { industries } from '../data/industries';
import { IndustryType, PlatformConfig } from '../types';
import { loadRecentPlatforms } from '../lib/platformStorage';

interface LandingPageProps {
  onQuickDemo?: () => void;
  onSignIn: () => void;
  user: any;
  onViewAccount: () => void;
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

export function LandingPage({ onQuickDemo, onSignIn, user, onViewAccount }: LandingPageProps) {
  const [hoveredIndustry, setHoveredIndustry] = useState<IndustryType | null>(null);
  const [recentPlatforms, setRecentPlatforms] = useState<PlatformConfig[]>([]);

  useEffect(() => {
    loadRecentPlatforms(6).then(result => {
      if (result.success && result.platforms) {
        setRecentPlatforms(result.platforms);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-5"></div>

        <nav className="relative border-b-4 border-black bg-yellow-300">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">INFLUXX</h1>
                <p className="text-xs font-bold uppercase tracking-wider">Industry-Specific Platforms</p>
              </div>
            </div>
            <div className="flex gap-3">
              {onQuickDemo && (
                <button
                  onClick={onQuickDemo}
                  className="btn-brutal bg-green-300 text-sm"
                >
                  <Zap className="w-4 h-4 inline mr-1" />
                  Quick Demo
                </button>
              )}
              {user ? (
                <button
                  onClick={onViewAccount}
                  className="btn-brutal bg-blue-300 text-sm"
                >
                  <User className="w-4 h-4 inline mr-1" />
                  Account
                </button>
              ) : (
                <button
                  onClick={onSignIn}
                  className="btn-brutal bg-black text-white text-sm"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </nav>

        <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block mb-6">
              <div className="tag-brutal bg-yellow-300 animate-bounce-in">
                AI-Powered Platform Generator
              </div>
            </div>

            <h1 className="mb-6">
              Your Industry Deserves
              <br />
              <span className="relative inline-block">
                <span className="text-gradient from-yellow-400 to-yellow-600">
                  Its Own INFLUXX
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-4 bg-yellow-300 -rotate-1"></div>
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-bold max-w-3xl mx-auto mb-8 leading-relaxed">
              We use AI to generate custom all-in-one business platforms
              tailored specifically for your industry - in under 5 minutes.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 card-brutal bg-green-200 px-4 py-2">
                <Zap className="w-5 h-5" />
                <span className="font-black">5-Min Setup</span>
              </div>
              <div className="flex items-center gap-2 card-brutal bg-blue-200 px-4 py-2">
                <Target className="w-5 h-5" />
                <span className="font-black">Industry-Specific</span>
              </div>
              <div className="flex items-center gap-2 card-brutal bg-pink-200 px-4 py-2">
                <Rocket className="w-5 h-5" />
                <span className="font-black">Production-Ready</span>
              </div>
            </div>
          </div>

          <div className="mb-12 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl md:text-4xl mb-4">Select Your Industry</h2>
            <p className="text-lg font-bold text-gray-600">
              Choose your business type to start generating your custom platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {industries.map((industry, index) => {
              const IconComponent = (LucideIcons as any)[industry.icon];
              const isHovered = hoveredIndustry === industry.id;

              return (
                <div
                  key={industry.id}
                  onMouseEnter={() => setHoveredIndustry(industry.id)}
                  onMouseLeave={() => setHoveredIndustry(null)}
                  className="card-brutal bg-white text-left transition-all duration-200 group animate-scale-in"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 ${industry.color} border-4 border-black flex items-center justify-center transform transition-transform ${isHovered ? 'scale-110 rotate-6' : ''}`}>
                      {IconComponent && <IconComponent className="w-8 h-8 text-black" />}
                    </div>
                    <ArrowRight className={`w-6 h-6 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                  </div>

                  <h3 className="text-2xl mb-2">{industry.name}</h3>
                  <p className="font-bold text-gray-600 mb-4 leading-relaxed">
                    {industry.description}
                  </p>

                  <div className="space-y-2">
                    {industry.examples.slice(0, 3).map((example, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <div className="w-1.5 h-1.5 bg-black"></div>
                        <span>{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {recentPlatforms.length > 0 && (
            <div className="mt-20 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="text-center mb-10">
                <h2 className="text-4xl mb-3">Recently Generated Platforms</h2>
                <p className="text-xl font-bold text-gray-600">
                  Join businesses already using InfluxX
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {recentPlatforms.map((platform, index) => {
                  const industry = industries.find(i => i.id === platform.industryType);
                  const IconComponent = industry?.icon ? (LucideIcons as any)[industry.icon] : Sparkles;
                  const timeAgo = getTimeAgo(platform.generatedAt);

                  return (
                    <a
                      key={platform.id}
                      href={`/?platform=${platform.id}`}
                      className="card-brutal bg-white hover:bg-gray-50 transition-all group"
                      style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 ${industry?.color || 'bg-gray-300'} border-4 border-black flex items-center justify-center`}>
                          {IconComponent && <IconComponent className="w-6 h-6 text-black" />}
                        </div>
                        <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <h3 className="text-xl font-black mb-2">{platform.businessName}</h3>
                      <p className="font-bold text-gray-600 mb-3 text-sm capitalize">
                        {platform.industryType.replace('-', ' ')}
                      </p>

                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Generated {timeAgo}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="card-brutal-lg bg-gradient-to-br from-yellow-200 via-green-200 to-blue-200 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-black mb-2">5 Min</div>
                  <div className="font-bold text-gray-700">Average Generation Time</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2">100%</div>
                  <div className="font-bold text-gray-700">Customized To Your Business</div>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2">$0</div>
                  <div className="font-bold text-gray-700">To Try During Beta</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="border-t-4 border-black bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">How It Works</h2>
            <p className="text-xl font-bold text-gray-600">Three simple steps to your custom platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-brutal bg-white">
              <div className="w-12 h-12 bg-yellow-300 border-4 border-black flex items-center justify-center mb-4 text-2xl font-black">
                1
              </div>
              <h3 className="text-2xl mb-3">Answer Questions</h3>
              <p className="font-bold text-gray-600 leading-relaxed">
                Our AI asks 5 smart questions about your business, goals, and workflows.
              </p>
            </div>

            <div className="card-brutal bg-white">
              <div className="w-12 h-12 bg-green-300 border-4 border-black flex items-center justify-center mb-4 text-2xl font-black">
                2
              </div>
              <h3 className="text-2xl mb-3">Watch It Generate</h3>
              <p className="font-bold text-gray-600 leading-relaxed">
                See your custom platform being built in real-time with all features tailored to your industry.
              </p>
            </div>

            <div className="card-brutal bg-white">
              <div className="w-12 h-12 bg-blue-300 border-4 border-black flex items-center justify-center mb-4 text-2xl font-black">
                3
              </div>
              <h3 className="text-2xl mb-3">Start Using It</h3>
              <p className="font-bold text-gray-600 leading-relaxed">
                Your fully functional platform is ready. Add your data and start managing your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-4 border-black bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="font-black text-xl">INFLUXX</span>
          </div>
          <p className="font-bold text-sm text-gray-400">
            Built for the future of industry-specific business platforms
          </p>
        </div>
      </footer>
    </div>
  );
}
