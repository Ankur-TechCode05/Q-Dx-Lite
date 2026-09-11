import { useEffect, useState } from 'react';

interface CircularGaugeProps {
  value: number;
  size?: number;
  thickness?: number;
  label?: string;
  sublabel?: string;
}

export function CircularGauge({ value, size = 220, thickness = 16, label, sublabel }: CircularGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 200);
    return () => clearTimeout(timer);
  }, [value]);

  const color =
    value <= 30 ? '#34d399' : value <= 60 ? '#fbbf24' : value <= 80 ? '#f87171' : '#dc2626';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
          <filter id="gauge-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gauge-gradient)"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter="url(#gauge-glow)"
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-5xl font-bold" style={{ color }}>
          {Math.round(animatedValue)}
          <span className="text-2xl">%</span>
        </span>
        {label && <span className="text-sm font-semibold mt-1" style={{ color: 'var(--text-secondary)' }}>{label}</span>}
        {sublabel && <span className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{sublabel}</span>}
      </div>
    </div>
  );
}
