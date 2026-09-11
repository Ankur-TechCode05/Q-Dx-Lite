import { ArrowLeft, Activity, Brain, Atom, BarChart3, Database, FileText, Microscope, Zap, ChevronRight, TrendingUp, ShieldCheck, Cpu } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import type { PageKey } from '@/types';

interface HomePageProps {
  onNavigate: (page: PageKey) => void;
  onBackToLanding: () => void;
}

const quickLinks: { key: PageKey; label: string; desc: string; icon: typeof Activity; color: string }[] = [
  { key: 'dashboard', label: 'Dashboard', desc: 'Overview analytics & stats', icon: BarChart3, color: '#22d3ee' },
  { key: 'risk-assessment', label: 'Risk Assessment', desc: 'Run a new risk analysis', icon: Activity, color: '#f472b6' },
  { key: 'disease-detection', label: 'Disease Detection', desc: '3 disease modules', icon: Microscope, color: '#a78bfa' },
  { key: 'ml-models', label: 'ML Models', desc: '6 models with live metrics', icon: Brain, color: '#34d399' },
  { key: 'quantum-engine', label: 'Quantum Engine', desc: 'Quantum circuit & pipeline', icon: Atom, color: '#a78bfa' },
  { key: 'datasets', label: 'Datasets', desc: 'Training data & quality', icon: Database, color: '#22d3ee' },
  { key: 'report-analyzer', label: 'Report Analyzer', desc: 'Upload & analyze reports', icon: FileText, color: '#fbbf24' },
  { key: 'analytics', label: 'Analytics', desc: 'Charts & distributions', icon: TrendingUp, color: '#f472b6' },
];

export function HomePage({ onNavigate, onBackToLanding }: HomePageProps) {
  return (
    <div className="space-y-6">
      {/* Back to landing */}
      <button
        onClick={onBackToLanding}
        className="flex items-center gap-2 text-sm transition-smooth hover:opacity-80"
        style={{ color: 'var(--text-secondary)' }}
      >
        <ArrowLeft size={16} /> Back to Landing Page
      </button>

      {/* Welcome hero */}
      <div className="glass-card p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10 animate-float-slow" style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5" style={{ background: 'rgba(var(--accent-rgb), 0.08)', border: '1px solid rgba(var(--accent-rgb), 0.3)' }}>
            <span className="w-2 h-2 rounded-full animate-blink" style={{ background: 'var(--accent)' }} />
            <span className="text-xs font-semibold tracking-wider" style={{ color: 'var(--accent)' }}>Q-DX PLATFORM • HOME</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Welcome to <span className="gradient-text">Q-Dx</span>
          </h1>
          <p className="text-base lg:text-lg max-w-2xl mb-6" style={{ color: 'var(--text-secondary)' }}>
            Your Hybrid Quantum ML Platform for early disease risk detection. Navigate to any section below to get started.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onNavigate('dashboard')} className="neon-btn neon-btn-primary flex items-center gap-2">
              <BarChart3 size={18} /> Go to Dashboard
            </button>
            <button onClick={() => onNavigate('risk-assessment')} className="neon-btn flex items-center gap-2">
              <Activity size={18} /> Start Risk Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStat icon={Activity} value={1248} label="Total Analyses" color="#22d3ee" />
        <QuickStat icon={Brain} value={6} label="ML Models" color="#a78bfa" />
        <QuickStat icon={Atom} value={3} suffix=" qubits" label="Quantum Circuit" color="#f472b6" />
        <QuickStat icon={ShieldCheck} value={87} suffix="%" label="Avg Confidence" color="#34d399" />
      </div>

      {/* Quick links grid */}
      <div>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.key}
                onClick={() => onNavigate(link.key)}
                className="glass-card card-hover p-5 text-left group"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ background: `${link.color}15` }}>
                  <Icon size={22} style={{ color: link.color }} />
                </div>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{link.label}</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{link.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs transition-smooth group-hover:opacity-100 opacity-0" style={{ color: 'var(--accent)' }}>
                  Open <ChevronRight size={12} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Platform highlights */}
      <div className="grid lg:grid-cols-3 gap-4">
        <HighlightCard icon={Cpu} title="Hybrid Pipeline" desc="Classical ML ensemble combined with quantum kernel estimation for superior prediction accuracy." color="#22d3ee" onClick={() => onNavigate('flowchart')} />
        <HighlightCard icon={Zap} title="Explainable AI" desc="Feature importance, model agreement scores, and quantum enhancement metrics for full transparency." color="#a78bfa" onClick={() => onNavigate('analytics')} />
        <HighlightCard icon={FileText} title="Report Generation" desc="Generate and download professional analysis reports with charts, insights, and disclaimers." color="#f472b6" onClick={() => onNavigate('reports')} />
      </div>

      <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        For research and educational demonstration only. Not a medical diagnosis.
      </p>
    </div>
  );
}

function QuickStat({ icon: Icon, value, suffix, label, color }: { icon: typeof Activity; value: number; suffix?: string; label: string; color: string }) {
  return (
    <div className="glass-card card-hover p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon size={20} style={{ color }} />
        </div>
      </div>
      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
}

function HighlightCard({ icon: Icon, title, desc, color, onClick }: { icon: typeof Activity; title: string; desc: string; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="glass-card card-hover p-6 text-left group">
      <div className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${color}20, ${color}10)`, border: `1px solid ${color}30` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
      <div className="flex items-center gap-1 mt-4 text-xs transition-smooth group-hover:opacity-100 opacity-0" style={{ color }}>
        Learn more <ChevronRight size={12} />
      </div>
    </button>
  );
}
