import { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: string;
  delay?: number;
  label?: string;
  showValue?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  color = 'var(--accent)',
  height = 'h-3',
  delay = 0,
  label,
  showValue = false,
}: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const pct = Math.min((value / max) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(pct), 100 + delay);
    return () => clearTimeout(timer);
  }, [pct, delay]);

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>}
          {showValue && <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}%</span>}
        </div>
      )}
      <div className={`w-full ${height} rounded-full overflow-hidden`} style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            boxShadow: `0 0 10px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}
