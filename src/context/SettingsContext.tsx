import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Settings, ThemeName, AccentColor, LayoutDensity, AnimationLevel, ChartStyle, FontSize } from '@/types';

const defaultSettings: Settings = {
  theme: 'quantum-dark',
  accent: 'cyan',
  layout: 'comfortable',
  animation: 'full',
  chartStyle: 'neon',
  fontSize: 'medium',
};

const fontSizeMap: Record<FontSize, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
};

interface SettingsContextValue {
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', settings.theme);
    root.setAttribute('data-accent', settings.accent);
    root.setAttribute('data-layout', settings.layout);
    root.setAttribute('data-animation', settings.animation);
    root.setAttribute('data-chart-style', settings.chartStyle);
    root.style.setProperty('--font-size', fontSizeMap[settings.fontSize]);
  }, [settings]);

  const updateSettings = (partial: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  return <SettingsContext.Provider value={{ settings, updateSettings }}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
