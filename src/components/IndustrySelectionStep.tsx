import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { industries } from '../data/industries';
import type { IndustryType } from '../types';

interface IndustrySelectionStepProps {
  onNext: (industry: IndustryType, industryName: string) => void;
}

export function IndustrySelectionStep({ onNext }: IndustrySelectionStepProps) {
  const [hoveredIndustry, setHoveredIndustry] = useState<IndustryType | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 bg-yellow-300 rounded-full border-2 border-black"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full border-2 border-black"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full border-2 border-black"></div>
          </div>

          <p className="text-center text-sm font-black text-gray-600 mb-2">STEP 1 OF 3</p>
          <h1 className="text-4xl md:text-5xl font-black text-center mb-4 animate-slide-up">
            Select Your Industry
          </h1>
          <p className="text-xl font-bold text-gray-600 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Choose your business type to start building your platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => {
            const IconComponent = (LucideIcons as any)[industry.icon];
            const isHovered = hoveredIndustry === industry.id;

            return (
              <button
                key={industry.id}
                onClick={() => onNext(industry.id, industry.name)}
                onMouseEnter={() => setHoveredIndustry(industry.id)}
                onMouseLeave={() => setHoveredIndustry(null)}
                className="card-brutal bg-white hover:bg-gray-50 text-left transition-all duration-200 group animate-scale-in hover:scale-105"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-16 h-16 ${industry.color} border-4 border-black flex items-center justify-center transform transition-transform ${
                      isHovered ? 'scale-110 rotate-6' : ''
                    }`}
                  >
                    {IconComponent && <IconComponent className="w-8 h-8 text-black" />}
                  </div>
                  <ArrowRight
                    className={`w-6 h-6 transition-transform ${isHovered ? 'translate-x-1' : ''}`}
                  />
                </div>

                <h3 className="text-2xl mb-2">{industry.name}</h3>
                <p className="font-bold text-gray-600 mb-4 leading-relaxed">
                  {industry.description}
                </p>

                <div className="space-y-2">
                  {industry.examples.slice(0, 3).map((example, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm font-bold text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 bg-black"></div>
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
