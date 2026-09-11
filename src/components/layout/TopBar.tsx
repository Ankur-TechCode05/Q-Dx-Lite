import { Search, Bell, User, Menu, Zap } from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-30 flex items-center gap-4 px-4 lg:px-6 py-3.5"
      style={{
        background: 'rgba(var(--accent-rgb), 0.02)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-glow)',
      }}
    >
      <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg" style={{ color: 'var(--text-secondary)' }}>
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-md hidden sm:block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search analyses, models, datasets..."
          className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border transition-smooth"
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'var(--border-glow)',
            color: 'var(--text-primary)',
          }}
        />
      </div>

      <div className="flex-1 sm:hidden" />

      {/* Status badges */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
          <span className="w-2 h-2 rounded-full animate-blink" style={{ background: '#34d399' }} />
          <span className="text-xs font-medium" style={{ color: '#34d399' }}>AI Engine Online</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(var(--accent-rgb), 0.08)', border: '1px solid rgba(var(--accent-rgb), 0.3)' }}>
          <Zap size={12} style={{ color: 'var(--accent)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>Simulation Ready</span>
        </div>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative p-2 rounded-lg transition-smooth hover:bg-white/5"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
        </button>
        {notifOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-72 glass-card p-4 z-50 animate-scale-in">
              <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Notifications</h4>
              <div className="space-y-3">
                <NotifItem text="QSVM model training completed" time="2 min ago" />
                <NotifItem text="New dataset uploaded: Skin Lesion" time="15 min ago" />
                <NotifItem text="Analysis QDX-2026-0910-001 completed" time="1 hour ago" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Profile */}
      <button className="w-9 h-9 rounded-full flex items-center justify-center transition-smooth hover:scale-105" style={{ background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.2), rgba(var(--accent-2-rgb),0.2))', border: '1px solid var(--border-glow)' }}>
        <User size={16} style={{ color: 'var(--accent)' }} />
      </button>
    </header>
  );
}

function NotifItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex items-start gap-2.5 pb-3 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--accent)' }} />
      <div>
        <p className="text-xs" style={{ color: 'var(--text-primary)' }}>{text}</p>
        <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{time}</p>
      </div>
    </div>
  );
}
