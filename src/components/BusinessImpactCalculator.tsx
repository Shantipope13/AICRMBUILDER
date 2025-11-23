import { X, DollarSign, Clock, TrendingUp, Zap } from 'lucide-react';
import { IndustryType } from '../types';

interface BusinessImpactCalculatorProps {
  industryType: IndustryType;
  teamSize: string;
  onClose: () => void;
}

const industryMetrics = {
  'real-estate': {
    toolsReplaced: ['Spreadsheets', 'Email Client', 'Calendar App', 'Lead Tracking Tool', 'Manual Follow-ups'],
    avgToolCost: 150,
    timePerDeal: 45,
    timeSaved: 65,
    efficiencyGain: 40
  },
  'fitness': {
    toolsReplaced: ['Spreadsheets', 'Booking System', 'Email Marketing', 'Member Management', 'Payment Tracking'],
    avgToolCost: 180,
    timePerDeal: 30,
    timeSaved: 55,
    efficiencyGain: 50
  },
  'professional-services': {
    toolsReplaced: ['CRM', 'Project Management', 'Time Tracking', 'Invoicing Tool', 'Email Marketing'],
    avgToolCost: 200,
    timePerDeal: 60,
    timeSaved: 70,
    efficiencyGain: 45
  },
  'home-services': {
    toolsReplaced: ['Scheduling Tool', 'Invoicing', 'Customer Database', 'Route Planning', 'Payment Processing'],
    avgToolCost: 160,
    timePerDeal: 40,
    timeSaved: 60,
    efficiencyGain: 55
  },
  'ecommerce': {
    toolsReplaced: ['Email Marketing', 'Customer Analytics', 'Inventory System', 'Order Management', 'CRM'],
    avgToolCost: 220,
    timePerDeal: 25,
    timeSaved: 50,
    efficiencyGain: 45
  }
};

export function BusinessImpactCalculator({ industryType, teamSize, onClose }: BusinessImpactCalculatorProps) {
  const metrics = industryMetrics[industryType];

  const parseTeamSize = (size: string): number => {
    const match = size.match(/\d+/);
    if (!match) return 5;
    return Math.min(parseInt(match[0]), 50);
  };

  const team = parseTeamSize(teamSize);
  const monthlySavings = metrics.avgToolCost * team;
  const annualSavings = monthlySavings * 12;
  const hoursPerWeek = Math.floor((metrics.timeSaved / 100) * 40 * team);
  const dealsIncrease = Math.floor(metrics.efficiencyGain * (team / 5));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50 animate-fade-in">
      <div className="card-brutal-lg bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl">Business Impact Calculator</h2>
          <button
            onClick={onClose}
            className="w-12 h-12 border-4 border-black bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card-brutal bg-green-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-300 border-4 border-black flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-black">${monthlySavings.toLocaleString()}</div>
                <div className="text-sm font-bold text-gray-600">Monthly Cost Savings</div>
              </div>
            </div>
            <div className="text-sm font-bold text-gray-700">
              ${annualSavings.toLocaleString()} saved annually by replacing {metrics.toolsReplaced.length} separate tools
            </div>
          </div>

          <div className="card-brutal bg-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-300 border-4 border-black flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-black">{hoursPerWeek}h</div>
                <div className="text-sm font-bold text-gray-600">Time Saved Per Week</div>
              </div>
            </div>
            <div className="text-sm font-bold text-gray-700">
              {metrics.timeSaved}% reduction in administrative work across your team
            </div>
          </div>

          <div className="card-brutal bg-yellow-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-300 border-4 border-black flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-black">+{dealsIncrease}%</div>
                <div className="text-sm font-bold text-gray-600">Estimated Deal Increase</div>
              </div>
            </div>
            <div className="text-sm font-bold text-gray-700">
              Better follow-up and automation leads to more closed deals
            </div>
          </div>

          <div className="card-brutal bg-purple-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-300 border-4 border-black flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <div className="text-3xl font-black">{metrics.efficiencyGain}%</div>
                <div className="text-sm font-bold text-gray-600">Efficiency Improvement</div>
              </div>
            </div>
            <div className="text-sm font-bold text-gray-700">
              Overall productivity boost from automation and centralization
            </div>
          </div>
        </div>

        <div className="card-brutal bg-gray-50 mb-6">
          <h3 className="text-xl font-black mb-4">Tools Replaced</h3>
          <div className="grid grid-cols-2 gap-3">
            {metrics.toolsReplaced.map((tool, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black"></div>
                <span className="font-bold">{tool}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-brutal bg-gradient-to-br from-yellow-200 to-green-200">
          <h3 className="text-2xl font-black mb-3">Total Annual Impact</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-black mb-1">${annualSavings.toLocaleString()}</div>
              <div className="font-bold text-gray-700">Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-1">{hoursPerWeek * 52}h</div>
              <div className="font-bold text-gray-700">Time Reclaimed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-1">{metrics.toolsReplaced.length}</div>
              <div className="font-bold text-gray-700">Tools Consolidated</div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="font-bold text-gray-600 text-sm">
            * Calculations based on team size of {team} people and industry averages
          </p>
        </div>
      </div>
    </div>
  );
}
