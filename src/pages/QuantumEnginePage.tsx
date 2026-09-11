import { useState, useEffect } from 'react';
import { Atom, Zap, Cpu, GitBranch, Activity, Layers, ChevronDown } from 'lucide-react';
import { quantumPipeline } from '@/data/mockData';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export function QuantumEnginePage() {
  const [simulating, setSimulating] = useState(false);
  const [activeGate, setActiveGate] = useState(0);

  useEffect(() => {
    if (!simulating) return;
    const interval = setInterval(() => {
      setActiveGate((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, [simulating]);

  const qubitLines = [
    { label: 'Qubit 0', gates: ['H', '●', 'X', 'M'] },
    { label: 'Qubit 1', gates: ['H', 'X', '●', 'M'] },
    { label: 'Qubit 2', gates: ['H', 'Z', '●', 'M'] },
  ];

  const kernelData = Array.from({ length: 20 }, (_, i) => ({
    x: i,
    classical: 50 + Math.sin(i * 0.5) * 20 + Math.random() * 10,
    quantum: 50 + Math.sin(i * 0.5 + 1) * 25 + Math.cos(i * 0.3) * 15 + Math.random() * 5,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Hybrid Quantum Engine</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Simulated quantum circuit with feature mapping and kernel estimation</p>
      </div>

      {/* Quantum circuit */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Atom size={20} style={{ color: 'var(--accent)' }} className="animate-spin-slow" />
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Quantum Circuit Simulation</h3>
          </div>
          <button
            onClick={() => setSimulating(!simulating)}
            className="neon-btn neon-btn-primary text-sm flex items-center gap-2"
          >
            <Zap size={16} className={simulating ? 'animate-spin-slow' : ''} />
            {simulating ? 'Simulating...' : 'Run Simulation'}
          </button>
        </div>

        {/* Circuit visualization */}
        <div className="space-y-4">
          {qubitLines.map((qubit, qi) => (
            <div key={qi} className="flex items-center gap-2">
              <span className="text-sm font-mono w-16" style={{ color: 'var(--accent)' }}>{qubit.label}</span>
              <div className="flex-1 flex items-center gap-1">
                {/* Wire */}
                <div className="flex-1 h-0.5" style={{ background: 'rgba(var(--accent-rgb),0.2)' }} />
                {qubit.gates.map((gate, gi) => (
                  <div key={gi} className="flex items-center gap-1">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold font-mono ${simulating && activeGate === gi ? 'quantum-gate' : ''}`}
                      style={{
                        background: gate === '●' ? 'transparent' : 'rgba(var(--accent-rgb),0.1)',
                        border: `1px solid rgba(var(--accent-rgb),${simulating && activeGate === gi ? 0.8 : 0.3})`,
                        color: 'var(--accent)',
                        boxShadow: simulating && activeGate === gi ? `0 0 20px rgba(var(--accent-rgb),0.4)` : 'none',
                      }}
                    >
                      {gate}
                    </div>
                    <div className="flex-1 h-0.5 min-w-[20px]" style={{ background: 'rgba(var(--accent-rgb),0.2)' }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Gate legend */}
        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          {[
            { gate: 'H', desc: 'Hadamard' },
            { gate: 'X', desc: 'Pauli-X (NOT)' },
            { gate: 'Z', desc: 'Pauli-Z' },
            { gate: '●', desc: 'CNOT (Entanglement)' },
            { gate: 'M', desc: 'Measurement' },
          ].map((g) => (
            <div key={g.gate} className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold font-mono" style={{ background: 'rgba(var(--accent-rgb),0.1)', border: '1px solid rgba(var(--accent-rgb),0.3)', color: 'var(--accent)' }}>{g.gate}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{g.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quantum metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <QuantumCard icon={Atom} label="Qubits" value={3} color="#a78bfa" />
        <QuantumCard icon={GitBranch} label="Quantum Gates" value={10} color="#22d3ee" />
        <QuantumCard icon={Layers} label="Circuit Depth" value={7} color="#f472b6" />
        <QuantumCard icon={Activity} label="Shots" value={1024} color="#34d399" />
        <QuantumCard icon={Cpu} label="Quantum Kernel" value={1} suffix=" active" color="#fbbf24" />
        <QuantumCard icon={Zap} label="Simulation Status" valueText="Ready" color="#22d3ee" />
      </div>

      {/* Pipeline */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Quantum-Classical Pipeline</h3>
        <div className="flex flex-col items-center gap-2">
          {quantumPipeline.map((step, i) => (
            <div key={step} className="w-full max-w-xs">
              <div
                className="glass-card p-3 text-center card-hover pipeline-step"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{step}</span>
              </div>
              {i < quantumPipeline.length - 1 && (
                <div className="flex justify-center py-1">
                  <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quantum kernel visualization */}
      <div className="glass-card card-hover p-5">
        <div className="flex items-center gap-2 mb-4">
          <Cpu size={18} style={{ color: 'var(--accent)' }} />
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Quantum Kernel Estimation</h3>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={kernelData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="qk-1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} /><stop offset="100%" stopColor="#22d3ee" stopOpacity={0} /></linearGradient>
              <linearGradient id="qk-2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} /><stop offset="100%" stopColor="#a78bfa" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="x" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
            <Area type="monotone" dataKey="classical" name="Classical Kernel" stroke="#22d3ee" strokeWidth={2} fill="url(#qk-1)" />
            <Area type="monotone" dataKey="quantum" name="Quantum Kernel" stroke="#a78bfa" strokeWidth={2} fill="url(#qk-2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function QuantumCard({ icon: Icon, label, value, suffix, valueText, color }: { icon: typeof Atom; label: string; value?: number; suffix?: string; valueText?: string; color: string }) {
  return (
    <div className="glass-card card-hover p-5">
      <div className="w-10 h-10 mb-3 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        {valueText || <AnimatedCounter value={value || 0} suffix={suffix} />}
      </div>
      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
}
