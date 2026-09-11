import { useState } from 'react';
import { SettingsProvider } from '@/context/SettingsContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';
import { ParticleBackground } from '@/components/background/ParticleBackground';
import { GradientMesh } from '@/components/background/GradientMesh';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { HomePage } from '@/pages/HomePage';
import { DashboardPage } from '@/pages/DashboardPage';
import { RiskAssessmentPage } from '@/pages/RiskAssessmentPage';
import { RiskResultPage } from '@/pages/RiskResultPage';
import { MLModelsPage } from '@/pages/MLModelsPage';
import { QuantumEnginePage } from '@/pages/QuantumEnginePage';
import { DatasetsPage } from '@/pages/DatasetsPage';
import { ReportAnalyzerPage } from '@/pages/ReportAnalyzerPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { FlowchartPage } from '@/pages/FlowchartPage';
import { DiseaseModulesPage } from '@/pages/DiseaseModulesPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import type { PageKey, RiskResult } from '@/types';

type View = 'landing' | 'login' | 'signup' | 'app';

function AppContent() {
  const { session, loading } = useAuth();
  const [view, setView] = useState<View>('landing');
  const [page, setPage] = useState<PageKey>('home');
  const [result, setResult] = useState<RiskResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleLaunch = () => {
    if (session) {
      setView('app');
      setPage('home');
    } else {
      setView('login');
    }
  };

  const handleExplore = () => {
    setView('app');
    setPage('quantum-engine');
  };

  const handleNavigate = (p: PageKey) => {
    if (p === 'risk-assessment') {
      setShowResult(false);
    }
    setPage(p);
  };

  const handleResult = (r: RiskResult) => {
    setResult(r);
    setShowResult(true);
  };

  // Auto-enter app if session exists
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="w-8 h-8 rounded-full animate-spin" style={{ border: '2px solid var(--accent)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (session && view !== 'app') {
    setView('app');
  }

  if (view === 'login') {
    return (
      <>
        <GradientMesh />
        <LoginPage
          onBack={() => setView('landing')}
          onSwitchToSignup={() => setView('signup')}
        />
      </>
    );
  }

  if (view === 'signup') {
    return (
      <>
        <GradientMesh />
        <SignupPage
          onBack={() => setView('landing')}
          onSwitchToLogin={() => setView('login')}
        />
      </>
    );
  }

  if (view === 'landing') {
    return (
      <>
        <GradientMesh />
        <ParticleBackground />
        <LandingPage onLaunch={handleLaunch} onExplore={handleExplore} />
      </>
    );
  }

  return (
    <>
      <GradientMesh />
      <DashboardLayout current={page} onNavigate={handleNavigate}>
        {page === 'home' && <HomePage onNavigate={handleNavigate} onBackToLanding={() => setView('landing')} />}
        {page === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
        {page === 'risk-assessment' && !showResult && (
          <RiskAssessmentPage onResult={handleResult} onNavigate={handleNavigate} />
        )}
        {page === 'risk-assessment' && showResult && result && (
          <RiskResultPage
            result={result}
            onNavigate={handleNavigate}
            onBack={() => setShowResult(false)}
          />
        )}
        {page === 'disease-detection' && <DiseaseModulesPage onNavigate={handleNavigate} />}
        {page === 'report-analyzer' && <ReportAnalyzerPage />}
        {page === 'datasets' && <DatasetsPage />}
        {page === 'ml-models' && <MLModelsPage />}
        {page === 'quantum-engine' && <QuantumEnginePage />}
        {page === 'analytics' && <AnalyticsPage />}
        {page === 'flowchart' && <FlowchartPage />}
        {page === 'reports' && <ReportsPage />}
        {page === 'settings' && <SettingsPage />}
      </DashboardLayout>
    </>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;
