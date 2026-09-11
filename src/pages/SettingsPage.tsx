import { Palette, Moon, Sun, Sparkles, Zap, Eye, BarChart3, Type, Check } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import type { ThemeName, AccentColor, LayoutDensity, AnimationLevel, ChartStyle, FontSize } from '@/types';
import { useToast } from '@/components/ui/Toast';

export function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const { notify } = useToast();

  const themes: { key: ThemeName; label: string; preview: string }[] = [
    { key: 'quantum-dark', label: 'Quantum Dark', preview: 'linear-gradient(135deg, #030712, #0a0f1e)' },
    { key: 'midnight-blue', label: 'Midnight Blue', preview: 'linear-gradient(135deg, #020617, #0c1a3e)' },
    { key: 'neon-cyber', label: 'Neon Cyber', preview: 'linear-gradient(135deg, #0a0010, #14001f)' },
    { key: 'medical-light', label: 'Medical Light', preview: 'linear-gradient(135deg, #f0f4f8, #ffffff)' },
    { key: 'aurora', label: 'Aurora', preview: 'linear-gradient(135deg, #02101a, #051f2e)' },
  ];

  const accents: { key: AccentColor; label: string; color: string }[] = [
    { key: 'cyan', label: 'Cyan', color: '#22d3ee' },
    { key: 'violet', label: 'Violet', color: '#a78bfa' },
    { key: 'blue', label: 'Blue', color: '#60a5fa' },
    { key: 'emerald', label: 'Emerald', color: '#34d399' },
    { key: 'magenta', label: 'Magenta', color: '#f472b6' },
  ];

  const layouts: { key: LayoutDensity; label: string }[] = [
    { key: 'compact', label: 'Compact' },
    { key: 'comfortable', label: 'Comfortable' },
    { key: 'spacious', label: 'Spacious' },
  ];

  const animations: { key: AnimationLevel; label: string }[] = [
    { key: 'full', label: 'Full' },
    { key: 'reduced', label: 'Reduced' },
    { key: 'off', label: 'Off' },
  ];

  const chartStyles: { key: ChartStyle; label: string }[] = [
    { key: 'neon', label: 'Neon' },
    { key: 'minimal', label: 'Minimal' },
    { key: 'glass', label: 'Glass' },
  ];

  const fontSizes: { key: FontSize; label: string }[] = [
    { key: 'small', label: 'Small' },
    { key: 'medium', label: 'Medium' },
    { key: 'large', label: 'Large' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Customize the Q-Dx platform appearance and behavior</p>
      </div>

      {/* Live preview */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Eye size={18} style={{ color: 'var(--accent)' }} />
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Live Preview</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="glass-card p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl animate-pulse-glow" style={{ background: 'rgba(var(--accent-rgb),0.1)' }} />
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Card Component</p>
          </div>
          <div className="glass-card p-4 text-center">
            <button className="neon-btn neon-btn-primary text-xs">Sample Button</button>
            <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>Button Style</p>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="w-full h-2 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="h-full rounded-full" style={{ width: '70%', background: 'linear-gradient(90deg, var(--accent), rgba(var(--accent-rgb),0.5))' }} />
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Progress Bar</p>
          </div>
        </div>
      </div>

      {/* Theme */}
      <SettingSection icon={Palette} title="Theme" desc="Choose the overall color scheme">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {themes.map((t) => (
            <button
              key={t.key}
              onClick={() => { updateSettings({ theme: t.key }); notify(`Theme: ${t.label}`, 'success'); }}
              className="p-3 rounded-xl card-hover transition-smooth text-left"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: settings.theme === t.key ? '2px solid rgba(var(--accent-rgb),0.6)' : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="w-full h-12 rounded-lg mb-2" style={{ background: t.preview }} />
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{t.label}</span>
                {settings.theme === t.key && <Check size={14} style={{ color: 'var(--accent)' }} />}
              </div>
            </button>
          ))}
        </div>
      </SettingSection>

      {/* Accent color */}
      <SettingSection icon={Sparkles} title="Accent Color" desc="Primary highlight color for the interface">
        <div className="flex flex-wrap gap-3">
          {accents.map((a) => (
            <button
              key={a.key}
              onClick={() => { updateSettings({ accent: a.key }); notify(`Accent: ${a.label}`, 'success'); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-smooth"
              style={{
                background: settings.accent === a.key ? `${a.color}15` : 'rgba(255,255,255,0.02)',
                border: settings.accent === a.key ? `1px solid ${a.color}80` : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <span className="w-5 h-5 rounded-full" style={{ background: a.color, boxShadow: settings.accent === a.key ? `0 0 10px ${a.color}80` : 'none' }} />
              <span className="text-sm" style={{ color: settings.accent === a.key ? a.color : 'var(--text-secondary)' }}>{a.label}</span>
              {settings.accent === a.key && <Check size={14} style={{ color: a.color }} />}
            </button>
          ))}
        </div>
      </SettingSection>

      {/* Layout density */}
      <SettingSection icon={BarChart3} title="Layout" desc="Control spacing and corner radius">
        <div className="flex flex-wrap gap-3">
          {layouts.map((l) => (
            <OptionPill key={l.key} label={l.label} active={settings.layout === l.key} onClick={() => updateSettings({ layout: l.key })} />
          ))}
        </div>
      </SettingSection>

      {/* Animation */}
      <SettingSection icon={Zap} title="Animation" desc="Control motion and transitions">
        <div className="flex flex-wrap gap-3">
          {animations.map((a) => (
            <OptionPill key={a.key} label={a.label} active={settings.animation === a.key} onClick={() => updateSettings({ animation: a.key })} />
          ))}
        </div>
      </SettingSection>

      {/* Chart style */}
      <SettingSection icon={BarChart3} title="Chart Style" desc="Visual style for charts and graphs">
        <div className="flex flex-wrap gap-3">
          {chartStyles.map((c) => (
            <OptionPill key={c.key} label={c.label} active={settings.chartStyle === c.key} onClick={() => updateSettings({ chartStyle: c.key })} />
          ))}
        </div>
      </SettingSection>

      {/* Font size */}
      <SettingSection icon={Type} title="Font Size" desc="Adjust the base text size">
        <div className="flex flex-wrap gap-3">
          {fontSizes.map((f) => (
            <OptionPill key={f.key} label={f.label} active={settings.fontSize === f.key} onClick={() => updateSettings({ fontSize: f.key })} />
          ))}
        </div>
      </SettingSection>

      {/* Reset */}
      <div className="flex justify-end">
        <button
          onClick={() => { updateSettings({ theme: 'quantum-dark', accent: 'cyan', layout: 'comfortable', animation: 'full', chartStyle: 'neon', fontSize: 'medium' }); notify('Settings reset to default', 'info'); }}
          className="neon-btn text-sm"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
}

function SettingSection({ icon: Icon, title, desc, children }: { icon: typeof Palette; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} style={{ color: 'var(--accent)' }} />
        <div>
          <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function OptionPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2.5 rounded-xl text-sm font-medium transition-smooth flex items-center gap-2"
      style={{
        background: active ? 'rgba(var(--accent-rgb),0.12)' : 'rgba(255,255,255,0.02)',
        border: active ? '1px solid rgba(var(--accent-rgb),0.5)' : '1px solid rgba(255,255,255,0.05)',
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
      }}
    >
      {label}
      {active && <Check size={14} />}
    </button>
  );
}
