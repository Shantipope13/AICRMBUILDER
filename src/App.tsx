import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { WelcomeScreen } from './components/WelcomeScreen';
import { IndustrySelectionStep } from './components/IndustrySelectionStep';
import { PurposeSelectionStep } from './components/PurposeSelectionStep';
import { PlatformNamingStep } from './components/PlatformNamingStep';
import { GenerationVisualization } from './components/GenerationVisualization';
import { GeneratedPlatform } from './components/GeneratedPlatform';
import { AuthForm } from './components/AuthForm';
import { AccountDashboard } from './components/AccountDashboard';
import { ToastContainer, ToastMessage, createToast } from './components/Toast';
import { IndustryType, GenerationConfig, PlatformConfig } from './types';
import { getIndustryTemplate } from './data/industryTemplates';
import { savePlatform as savePlatformOld, loadPlatformById } from './lib/platformStorage';
import type { SavedPlatform } from './services/platformService';
import { getUserPlatforms } from './services/platformService';
import { updateOnboardingStep } from './services/onboardingService';
import { supabase } from './lib/supabase';

type AppState = 'landing' | 'welcome' | 'onboarding-industry' | 'onboarding-purpose' | 'onboarding-name' | 'generating' | 'platform' | 'auth' | 'account';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | null>(null);
  const [selectedIndustryName, setSelectedIndustryName] = useState<string>('');
  const [selectedPurposeName, setSelectedPurposeName] = useState<string>('');
  const [generationConfig, setGenerationConfig] = useState<GenerationConfig | null>(null);
  const [platformConfig, setPlatformConfig] = useState<PlatformConfig | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoadingShared, setIsLoadingShared] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const platformId = urlParams.get('platform');

    if (platformId) {
      setIsLoadingShared(true);
      loadSharedPlatform(platformId);
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    setAuthLoading(false);
  };

  const loadSharedPlatform = async (platformId: string) => {
    const result = await loadPlatformById(platformId);

    if (result.success && result.platform) {
      setPlatformConfig(result.platform);
      setCurrentState('platform');
      addToast(createToast('success', 'Platform loaded successfully!'));
    } else {
      addToast(createToast('error', 'Failed to load shared platform. It may not exist.', 7000));
    }
    setIsLoadingShared(false);
  };


  const handleGenerationComplete = async (config: PlatformConfig) => {
    setPlatformConfig(config);
    setCurrentState('platform');

    const result = await savePlatformOld(config);
    if (result.success) {
      addToast(createToast('success', 'Platform saved successfully! You can access it anytime.'));
    } else {
      addToast(createToast('error', 'Failed to save platform. Changes are temporary.', 7000));
    }
  };

  const handleSignIn = () => {
    setCurrentState('auth');
  };

  const handleAuthSuccess = async () => {
    const { data: platforms } = await getUserPlatforms();

    if (!platforms || platforms.length === 0) {
      setCurrentState('welcome');
    } else {
      setCurrentState('account');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentState('landing');
  };

  const handleViewAccount = () => {
    if (user) {
      setCurrentState('account');
    } else {
      setCurrentState('auth');
    }
  };

  const handleViewSavedPlatform = (saved: SavedPlatform) => {
    const platformConfig: PlatformConfig = {
      id: saved.id,
      industryType: saved.industry_type as IndustryType,
      businessName: saved.business_name,
      generatedAt: new Date(saved.generated_at),
      config: saved.config,
      theme: saved.theme,
      features: saved.features
    };
    setPlatformConfig(platformConfig);
    setCurrentState('platform');
  };

  const handleWelcomeGetStarted = async () => {
    await updateOnboardingStep('welcome', true);
    await updateOnboardingStep('industry', false);
    setCurrentState('onboarding-industry');
  };

  const handleIndustrySelected = async (industry: IndustryType, industryName: string) => {
    setSelectedIndustry(industry);
    setSelectedIndustryName(industryName);
    await updateOnboardingStep('industry', true);
    await updateOnboardingStep('purpose', false);
    setCurrentState('onboarding-purpose');
  };

  const handlePurposeSelected = async (purposeId: string, purposeName: string) => {
    setSelectedPurposeName(purposeName);
    await updateOnboardingStep('purpose', true);
    await updateOnboardingStep('name', false);
    setCurrentState('onboarding-name');
  };

  const handlePlatformNamed = async (platformName: string) => {
    await updateOnboardingStep('name', true);
    await updateOnboardingStep('generating', false);

    const config: GenerationConfig = {
      industry: selectedIndustry!,
      businessName: platformName,
      businessModel: `${selectedIndustryName} business focused on ${selectedPurposeName}`,
      teamSize: '1-10',
      primaryGoal: selectedPurposeName,
      currentTools: 'Manual processes',
      painPoints: 'Need automation and better organization'
    };

    setGenerationConfig(config);
    setCurrentState('generating');
  };

  const handleBackToIndustry = () => {
    setCurrentState('onboarding-industry');
  };

  const handleBackToPurpose = () => {
    setCurrentState('onboarding-purpose');
  };

  const addToast = (toast: ToastMessage) => {
    setToasts(prev => [...prev, toast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleQuickDemo = () => {
    const demoIndustry: IndustryType = 'real-estate';
    const template = getIndustryTemplate(demoIndustry);

    const demoConfig: GenerationConfig = {
      industry: demoIndustry,
      businessName: 'Premier Realty Group',
      businessModel: 'Residential real estate sales and buyer representation',
      teamSize: '8 agents',
      primaryGoal: 'Close more deals and automate follow-ups',
      currentTools: 'Spreadsheets, email, and manual tracking',
      painPoints: 'Losing leads, too much manual work, no visibility into pipeline'
    };

    const demoPlatform: PlatformConfig = {
      id: Date.now().toString(),
      industryType: demoIndustry,
      businessName: 'Premier Realty Group',
      generatedAt: new Date(),
      config: demoConfig,
      theme: {
        primaryColor: '#000000',
        secondaryColor: '#FFD700',
        accentColor: '#00FF94',
        logoText: 'Premier Realty Group'
      },
      features: {
        crmFields: template.crmFields,
        pipelineStages: template.pipelineStages,
        dashboardWidgets: template.dashboardWidgets,
        emailTemplates: template.emailTemplates,
        automations: template.automations
      }
    };

    setPlatformConfig(demoPlatform);
    setCurrentState('platform');
  };

  const handleTryAnother = () => {
    setCurrentState('landing');
    setSelectedIndustry(null);
    setGenerationConfig(null);
    setPlatformConfig(null);
  };

  if (authLoading || isLoadingShared) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-yellow-300 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-black text-xl">
            {isLoadingShared ? 'Loading Platform...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentState === 'landing' && (
        <LandingPage
          onQuickDemo={handleQuickDemo}
          onSignIn={handleSignIn}
          user={user}
          onViewAccount={handleViewAccount}
        />
      )}

      {currentState === 'auth' && (
        <AuthForm
          onSuccess={handleAuthSuccess}
          onBack={handleTryAnother}
        />
      )}

      {currentState === 'account' && (
        <AccountDashboard
          onBack={handleTryAnother}
          onLogout={handleLogout}
          onViewPlatform={handleViewSavedPlatform}
        />
      )}

      {currentState === 'welcome' && (
        <WelcomeScreen
          userName={user?.user_metadata?.name}
          onGetStarted={handleWelcomeGetStarted}
        />
      )}

      {currentState === 'onboarding-industry' && (
        <IndustrySelectionStep onNext={handleIndustrySelected} />
      )}

      {currentState === 'onboarding-purpose' && selectedIndustry && (
        <PurposeSelectionStep
          industryType={selectedIndustry}
          industryName={selectedIndustryName}
          onBack={handleBackToIndustry}
          onNext={handlePurposeSelected}
        />
      )}

      {currentState === 'onboarding-name' && (
        <PlatformNamingStep
          industryName={selectedIndustryName}
          purposeName={selectedPurposeName}
          onBack={handleBackToPurpose}
          onNext={handlePlatformNamed}
        />
      )}

      {currentState === 'generating' && generationConfig && (
        <GenerationVisualization
          config={generationConfig}
          onComplete={handleGenerationComplete}
        />
      )}

      {currentState === 'platform' && platformConfig && (
        <GeneratedPlatform
          platformConfig={platformConfig}
          onTryAnother={handleTryAnother}
          onSharePlatform={() => {
            addToast(createToast('success', 'Share link copied to clipboard!'));
          }}
        />
      )}

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
}

export default App;
