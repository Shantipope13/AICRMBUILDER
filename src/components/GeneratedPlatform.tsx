import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Mail,
  Settings,
  TrendingUp,
  DollarSign,
  UserPlus,
  Clock,
  Zap,
  Menu,
  X,
  Sparkles,
  Eye,
  Database,
  MailCheck,
  Workflow,
  Share2,
  Save,
  CheckCircle2
} from 'lucide-react';
import { PlatformConfig } from '../types';
import { triggerConfetti } from '../lib/confetti';
import { BusinessImpactCalculator } from './BusinessImpactCalculator';
import { FirstTimeChecklist } from './FirstTimeChecklist';
import { EmailVerificationBanner } from './EmailVerificationBanner';
import { getDemoDataForIndustry } from '../data/demoData';
import { savePlatform } from '../services/platformService';
import { getOnboardingStatus } from '../services/onboardingService';
import { Toast } from './Toast';

interface GeneratedPlatformProps {
  platformConfig: PlatformConfig;
  onTryAnother?: () => void;
  onSharePlatform?: (shareUrl: string) => void;
}

export function GeneratedPlatform({ platformConfig, onTryAnother, onSharePlatform }: GeneratedPlatformProps) {
  const [currentView, setCurrentView] = useState<'dashboard' | 'contacts' | 'pipeline' | 'calendar' | 'email'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [showImpactCalculator, setShowImpactCalculator] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showEmailBanner, setShowEmailBanner] = useState(true);
  const [checklistItems, setChecklistItems] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadOnboardingStatus();
  }, []);

  const loadOnboardingStatus = async () => {
    const { data } = await getOnboardingStatus();
    if (data) {
      setChecklistItems(data.checklist_items_completed || []);
      const hasCompletedAllSteps =
        data.completed_welcome &&
        data.completed_industry_selection &&
        data.completed_purpose_selection &&
        data.completed_platform_naming;

      setShowChecklist(hasCompletedAllSteps && checklistItems.length < 5);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await savePlatform(
        platformConfig.industryType,
        platformConfig.businessName,
        platformConfig.config,
        platformConfig.theme,
        platformConfig.features
      );

      if (error) throw error;

      setIsSaved(true);
      setToast({ message: 'Platform saved successfully!', type: 'success' });
    } catch (err) {
      console.error('Failed to save platform:', err);
      setToast({ message: 'Failed to save platform. Please try again.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/?platform=${platformConfig.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      if (onSharePlatform) {
        onSharePlatform(shareUrl);
      }
      setToast({ message: 'Link copied to clipboard!', type: 'success' });
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      setToast({ message: 'Failed to copy link', type: 'error' });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      triggerConfetti();
    }, 500);
  }, []);

  const demoData = getDemoDataForIndustry(platformConfig.industryType);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'email', label: 'Email', icon: Mail }
  ];

  const stats = [
    { label: 'Total Contacts', value: '247', change: '+12%', icon: Users, color: 'bg-blue-300' },
    { label: 'Active Deals', value: '34', change: '+8%', icon: TrendingUp, color: 'bg-green-300' },
    { label: 'Revenue (MTD)', value: '$48.2K', change: '+23%', icon: DollarSign, color: 'bg-yellow-300' },
    { label: 'Tasks Today', value: '12', change: '-3', icon: Clock, color: 'bg-orange-300' }
  ];

  const recentActivities = [
    { type: 'contact', message: 'New contact added: Sarah Johnson', time: '5 min ago' },
    { type: 'deal', message: 'Deal moved to Negotiation stage', time: '12 min ago' },
    { type: 'email', message: 'Email sequence completed for John Doe', time: '1 hour ago' },
    { type: 'task', message: 'Task completed: Follow up with client', time: '2 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showEmailBanner && (
        <EmailVerificationBanner onDismiss={() => setShowEmailBanner(false)} />
      )}

      <div className="flex-1 flex">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} border-r-4 border-black bg-white transition-all duration-300 overflow-hidden`}>
        <div className="p-6 border-b-4 border-black bg-yellow-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black flex items-center justify-center">
              <Zap className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-lg font-black truncate">{platformConfig.businessName}</h2>
              <p className="text-xs font-bold uppercase">{platformConfig.industryType.replace('-', ' ')}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 border-4 border-black font-black mb-2 transition-all ${
                  isActive
                    ? 'bg-yellow-300 translate-x-2'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button className="w-full flex items-center gap-3 px-4 py-3 border-4 border-black font-black bg-white hover:bg-gray-50 mt-8">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="border-b-4 border-black bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-10 h-10 border-4 border-black bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-2xl font-black">
                {menuItems.find(item => item.id === currentView)?.label || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="btn-brutal bg-yellow-300 text-sm">
                <UserPlus className="w-4 h-4 mr-2 inline" />
                Add Contact
              </button>
              <div className="w-10 h-10 bg-blue-300 border-4 border-black flex items-center justify-center">
                <div className="w-5 h-5 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {currentView === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      className="card-brutal bg-white animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 ${stat.color} border-4 border-black flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className={`tag-brutal text-xs ${
                          stat.change.startsWith('+') ? 'bg-green-200' : 'bg-red-200'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-3xl font-black mb-1">{stat.value}</div>
                      <div className="text-sm font-bold text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="card-brutal-lg bg-white animate-slide-in">
                  <h3 className="text-2xl mb-4">Pipeline Overview</h3>
                  <div className="space-y-3">
                    {['New Leads', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won'].map((stage) => (
                      <div key={stage}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold">{stage}</span>
                          <span className="font-black">{Math.floor(Math.random() * 20 + 5)}</span>
                        </div>
                        <div className="h-4 bg-gray-200 border-2 border-black">
                          <div
                            className="h-full bg-yellow-300"
                            style={{ width: `${Math.random() * 60 + 20}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-brutal-lg bg-white animate-slide-in" style={{ animationDelay: '0.1s' }}>
                  <h3 className="text-2xl mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border-2 border-black bg-gray-50">
                        <div className="w-2 h-2 bg-black mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="font-bold">{activity.message}</p>
                          <p className="text-sm font-bold text-gray-600 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-brutal-lg bg-gradient-to-br from-yellow-200 to-yellow-300 animate-fade-in">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl mb-2">Your Platform is Ready!</h3>
                    <p className="font-bold text-gray-700 mb-4 leading-relaxed">
                      This is a fully customized platform for your {platformConfig.industryType.replace('-', ' ')} business.
                      All features, fields, and workflows are tailored to your specific needs.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleSave}
                        disabled={isSaving || isSaved}
                        className={`btn-brutal ${
                          isSaved ? 'bg-green-300' : 'bg-blue-300'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {isSaved ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 inline mr-2" />
                            Saved!
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 inline mr-2" />
                            {isSaving ? 'Saving...' : 'Save Platform'}
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setShowFeaturesModal(true)}
                        className="btn-brutal bg-black text-white"
                      >
                        <Eye className="w-4 h-4 inline mr-2" />
                        View All Features
                      </button>
                      <button
                        onClick={() => setShowImpactCalculator(true)}
                        className="btn-brutal bg-purple-300"
                      >
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Calculate ROI
                      </button>
                      <button
                        onClick={handleShare}
                        className="btn-brutal bg-pink-300"
                      >
                        <Share2 className="w-4 h-4 inline mr-2" />
                        Share Platform
                      </button>
                      {onTryAnother && (
                        <button
                          onClick={onTryAnother}
                          className="btn-brutal bg-green-300"
                        >
                          <Zap className="w-4 h-4 inline mr-2" />
                          Try Another Industry
                        </button>
                      )}
                    </div>
                  </div>
                  <Sparkles className="w-16 h-16 text-black" />
                </div>
              </div>
            </div>
          )}

          {currentView === 'contacts' && (
            <div className="animate-fade-in">
              <div className="card-brutal-lg bg-white">
                <h3 className="text-2xl mb-6">Contact Management</h3>
                <div className="space-y-4">
                  {demoData.contacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border-4 border-black bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-300 border-4 border-black flex items-center justify-center">
                          <span className="font-black text-lg">{contact.name[0]}</span>
                        </div>
                        <div>
                          <div className="font-black">{contact.name}</div>
                          <div className="text-sm font-bold text-gray-600">{contact.email} • {contact.company}</div>
                        </div>
                      </div>
                      <span className="tag-brutal bg-yellow-200">{contact.stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'pipeline' && (
            <div className="animate-fade-in">
              <div className="flex gap-4 overflow-x-auto pb-4">
                {platformConfig.features.pipelineStages.map((stage, stageIndex) => (
                  <div key={stage.id} className="flex-shrink-0 w-80">
                    <div className={`card-brutal ${stage.color} mb-3`}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black">{stage.name}</h3>
                        <span className="tag-brutal bg-white text-xs">{Math.floor(Math.random() * 10 + 3)}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {stageIndex < 3 && demoData.deals.map((deal, index) => (
                        <div key={index} className="card-brutal bg-white hover:bg-gray-50 cursor-pointer">
                          <div className="font-black mb-2">{deal.title}</div>
                          <div className="text-sm font-bold text-gray-600 mb-2">{deal.company}</div>
                          <div className="flex items-center justify-between">
                            <span className="font-black text-lg">${deal.value}K</span>
                            <span className="text-xs font-bold text-gray-500">Due in {deal.daysUntilClose}d</span>
                          </div>
                        </div>
                      ))}
                      {stageIndex >= 3 && [...Array(2)].map((_, index) => (
                        <div key={index} className="card-brutal bg-white hover:bg-gray-50 cursor-pointer">
                          <div className="font-black mb-2">Deal #{stageIndex * 2 + index + 1}</div>
                          <div className="text-sm font-bold text-gray-600 mb-2">Opportunity</div>
                          <div className="flex items-center justify-between">
                            <span className="font-black text-lg">${Math.floor(Math.random() * 50 + 10)}K</span>
                            <span className="text-xs font-bold text-gray-500">Due in {Math.floor(Math.random() * 30 + 1)}d</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(currentView === 'calendar' || currentView === 'email') && (
            <div className="card-brutal-lg bg-white text-center py-20 animate-fade-in">
              <div className="inline-block w-20 h-20 bg-gray-200 border-4 border-black flex items-center justify-center mb-4">
                {currentView === 'calendar' ? <Calendar className="w-10 h-10" /> : <Mail className="w-10 h-10" />}
              </div>
              <h3 className="text-2xl mb-2">
                {currentView === 'calendar' ? 'Calendar Module' : 'Email Module'}
              </h3>
              <p className="font-bold text-gray-600">
                This feature is fully customized for your business and ready to use!
              </p>
            </div>
          )}
        </main>
      </div>

      {showFeaturesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50 animate-fade-in">
          <div className="card-brutal-lg bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl">Industry-Specific Features</h2>
              <button
                onClick={() => setShowFeaturesModal(false)}
                className="w-12 h-12 border-4 border-black bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="card-brutal bg-blue-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-300 border-4 border-black flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl">Custom CRM Fields</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {platformConfig.features.crmFields.slice(0, 8).map((field) => (
                    <div key={field.id} className="border-2 border-black p-3 bg-white">
                      <div className="font-black text-sm">{field.name}</div>
                      <div className="text-xs font-bold text-gray-600 uppercase mt-1">{field.type}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-sm font-bold text-gray-700">
                  + {platformConfig.features.crmFields.length - 8} more fields customized for your industry
                </div>
              </div>

              <div className="card-brutal bg-green-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-300 border-4 border-black flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl">Pipeline Stages</h3>
                </div>
                <div className="space-y-2">
                  {platformConfig.features.pipelineStages.map((stage) => (
                    <div key={stage.id} className={`${stage.color} border-4 border-black p-3 font-black`}>
                      {stage.order}. {stage.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-brutal bg-purple-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-300 border-4 border-black flex items-center justify-center">
                    <MailCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl">Email Templates</h3>
                </div>
                <div className="space-y-3">
                  {platformConfig.features.emailTemplates.map((template) => (
                    <div key={template.id} className="border-4 border-black p-4 bg-white">
                      <div className="font-black mb-1">{template.name}</div>
                      <div className="text-sm font-bold text-gray-600 mb-2">Subject: {template.subject}</div>
                      <div className="tag-brutal bg-yellow-200 text-xs">Trigger: {template.trigger}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-brutal bg-orange-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-300 border-4 border-black flex items-center justify-center">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl">Automations</h3>
                </div>
                <div className="space-y-3">
                  {platformConfig.features.automations.map((automation) => (
                    <div key={automation.id} className="border-4 border-black p-4 bg-white flex items-start justify-between">
                      <div>
                        <div className="font-black mb-1">{automation.name}</div>
                        <div className="text-sm font-bold text-gray-600">Trigger: {automation.trigger}</div>
                      </div>
                      <span className={`tag-brutal text-xs ${automation.enabled ? 'bg-green-200' : 'bg-gray-200'}`}>
                        {automation.enabled ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-brutal bg-gradient-to-br from-yellow-200 to-yellow-300 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-3" />
                <p className="font-black text-lg mb-2">
                  All {platformConfig.features.crmFields.length} fields, {platformConfig.features.pipelineStages.length} stages,
                  {' '}{platformConfig.features.emailTemplates.length} templates, and {platformConfig.features.automations.length} automations
                </p>
                <p className="font-bold text-gray-700">
                  Were automatically generated and customized for your {platformConfig.industryType.replace('-', ' ')} business!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showImpactCalculator && (
        <BusinessImpactCalculator
          industryType={platformConfig.industryType}
          teamSize={platformConfig.config.teamSize}
          onClose={() => setShowImpactCalculator(false)}
        />
      )}

      {showChecklist && (
        <FirstTimeChecklist
          onClose={() => setShowChecklist(false)}
          initialCompletedItems={checklistItems}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      </div>
    </div>
  );
}
