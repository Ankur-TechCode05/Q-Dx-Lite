import { useState } from 'react';
import { GitBranch, X, Zap } from 'lucide-react';
import { architectureFlow } from '@/data/mockData';

export function FlowchartPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Q-Dx Hybrid Quantum ML Architecture</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Interactive flowchart — click any node to see details</p>
      </div>

      <div className="glass-card p-6 lg:p-8">
        <div className="flex flex-col items-center gap-1">
          {architectureFlow.map((node, i) => (
            <div key={i} className="w-full max-w-md">
              <button
                onClick={() => setSelected(selected === i ? null : i)}
                className="w-full glass-card p-4 card-hover text-left transition-smooth"
                style={selected === i ? { borderColor: 'rgba(var(--accent-rgb),0.7)', boxShadow: '0 0 25px rgba(var(--accent-rgb),0.2)' } : {}}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: selected === i ? 'rgba(var(--accent-rgb),0.2)' : 'rgba(255,255,255,0.05)',
                      color: selected === i ? 'var(--accent)' : 'var(--text-secondary)',
                      border: `1px solid ${selected === i ? 'rgba(var(--accent-rgb),0.5)' : 'rgba(255,255,255,0.1)'}`,
                    }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium" style={{ color: selected === i ? 'var(--accent)' : 'var(--text-primary)' }}>
                    {node.label}
                  </span>
                  {selected === i && <Zap size={14} className="ml-auto" style={{ color: 'var(--accent)' }} />}
                </div>
              </button>

              {selected === i && (
                <div className="mt-2 p-3 rounded-xl animate-scale-in" style={{ background: 'rgba(var(--accent-rgb),0.05)', border: '1px solid rgba(var(--accent-rgb),0.2)' }}>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{node.desc}</p>
                </div>
              )}

              {i < architectureFlow.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-6" style={{ background: 'linear-gradient(to bottom, rgba(var(--accent-rgb),0.4), rgba(var(--accent-rgb),0.1))' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="glass-card p-4 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <GitBranch size={16} style={{ color: 'var(--accent)' }} />
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Click any node to view its explanation</span>
        </div>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>•</span>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>12-stage hybrid quantum-classical pipeline</span>
      </div>
    </div>
  );
}
