import {
  LayoutDashboard, Activity, Microscope, FileText, Database,
  Brain, Atom, BarChart3, FileBarChart, Settings, X, Zap, GitBranch, Home,
} from 'lucide-react';
import type { PageKey } from '@/types';

interface SidebarProps {
  current: PageKey;
  onNavigate: (page: PageKey) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const navItems: { key: PageKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'risk-assessment', label: 'Risk Assessment', icon: Activity },
  { key: 'disease-detection', label: 'Disease Detection', icon: Microscope },
  { key: 'report-analyzer', label: 'Report Analyzer', icon: FileText },
  { key: 'datasets', label: 'Datasets', icon: Database },
  { key: 'ml-models', label: 'ML Models', icon: Brain },
  { key: 'quantum-engine', label: 'Quantum Engine', icon: Atom },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'flowchart', label: 'Architecture', icon: GitBranch },
  { key: 'reports', label: 'Reports', icon: FileBarChart },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ current, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onCloseMobile} />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 z-50 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          background: 'var(--bg-elevated)',
          borderRight: '1px solid var(--border-glow)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b" style={{ borderColor: 'var(--border-glow)' }}>
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg animate-pulse-glow" style={{ background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.2), rgba(var(--accent-2-rgb),0.2))' }} />
              <Zap size={20} style={{ color: 'var(--accent)' }} className="relative z-10" />
            </div>
            <div>
              <span className="text-lg font-bold gradient-text">Q-Dx</span>
              <p className="text-[10px] leading-tight" style={{ color: 'var(--text-muted)' }}>Quantum ML Platform</p>
            </div>
          </div>
          <button onClick={onCloseMobile} className="lg:hidden p-1" style={{ color: 'var(--text-secondary)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto no-scrollbar py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = current === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { onNavigate(item.key); onCloseMobile(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-smooth group ${
                  active ? 'font-semibold' : 'font-normal'
                }`}
                style={{
                  background: active ? 'linear-gradient(135deg, rgba(var(--accent-rgb),0.15), rgba(var(--accent-2-rgb),0.1))' : 'transparent',
                  color: active ? 'var(--accent)' : 'var(--text-secondary)',
                  border: active ? '1px solid rgba(var(--accent-rgb),0.3)' : '1px solid transparent',
                }}
              >
                <Icon size={18} className={active ? '' : 'group-hover:scale-110 transition-transform'} />
                <span className="text-sm">{item.label}</span>
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full animate-blink" style={{ background: 'var(--accent)' }} />}
              </button>
            );
          })}
        </nav>

        {/* Disclaimer */}
        <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--border-glow)' }}>
          <p className="text-[10px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            For research and educational demonstration only. Not a medical diagnosis.
          </p>
        </div>
      </aside>
    </>
  );
}
