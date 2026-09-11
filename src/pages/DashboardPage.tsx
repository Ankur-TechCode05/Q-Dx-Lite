import { Activity, AlertTriangle, ShieldCheck, Cpu, TrendingUp, Clock, ArrowRight, Atom } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { analysisHistory, predictionTrends, diseaseDistribution } from '@/data/mockData';
import type { PageKey } from '@/types';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from 'recharts';

interface DashboardPageProps {
  onNavigate: (page: PageKey) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard Overview</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Real-time analytics from the Q-Dx Hybrid Quantum ML Platform</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Activity} label="Total Analyses" value={1248} color="#22d3ee" trend="+12%" />
        <StatCard icon={AlertTriangle} label="High-Risk Cases" value={312} color="#f87171" trend="+5%" />
        <StatCard icon={ShieldCheck} label="Low-Risk Cases" value={872} color="#34d399" trend="+18%" />
        <StatCard icon={Cpu} label="Models Available" value={6} color="#a78bfa" trend="Active" />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Prediction trends */}
        <div className="glass-card card-hover p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Prediction Trends</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Monthly risk classification distribution</p>
            </div>
            <TrendingUp size={18} style={{ color: 'var(--accent)' }} />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={predictionTrends} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="g-low" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#34d399" stopOpacity={0.4} /><stop offset="100%" stopColor="#34d399" stopOpacity={0} /></linearGradient>
                <linearGradient id="g-high" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f87171" stopOpacity={0.4} /><stop offset="100%" stopColor="#f87171" stopOpacity={0} /></linearGradient>
                <linearGradient id="g-vh" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#dc2626" stopOpacity={0.3} /><stop offset="100%" stopColor="#dc2626" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
              <Area type="monotone" dataKey="low" stroke="#34d399" strokeWidth={2} fill="url(#g-low)" />
              <Area type="monotone" dataKey="high" stroke="#f87171" strokeWidth={2} fill="url(#g-high)" />
              <Area type="monotone" dataKey="veryHigh" stroke="#dc2626" strokeWidth={2} fill="url(#g-vh)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Disease distribution */}
        <div className="glass-card card-hover p-5">
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Disease Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={diseaseDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {diseaseDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {diseaseDistribution.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
                <span className="text-sm font-semibold ml-auto" style={{ color: 'var(--text-primary)' }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Model performance + Recent analyses */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Model performance mini */}
        <div className="glass-card card-hover p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Model Performance</h3>
            <button onClick={() => onNavigate('ml-models')} className="text-xs flex items-center gap-1 transition-smooth hover:opacity-80" style={{ color: 'var(--accent)' }}>
              View All <ArrowRight size={12} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { name: 'RF', accuracy: 92 }, { name: 'SVM', accuracy: 89 },
              { name: 'LR', accuracy: 85 }, { name: 'XGB', accuracy: 94 },
              { name: 'NN', accuracy: 93 }, { name: 'QSVM', accuracy: 95 },
            ]} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} domain={[80, 100]} />
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
              <Bar dataKey="accuracy" fill="url(#bar-grad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent analyses */}
        <div className="glass-card card-hover p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Recent Analyses</h3>
            <Clock size={18} style={{ color: 'var(--text-muted)' }} />
          </div>
          <div className="space-y-2">
            {analysisHistory.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl transition-smooth hover:bg-white/5">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: a.riskLevel.includes('High') ? 'rgba(248,113,113,0.1)' : 'rgba(52,211,153,0.1)' }}>
                  <Activity size={16} style={{ color: a.riskLevel.includes('High') ? '#f87171' : '#34d399' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{a.disease}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{a.id} • {a.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-sm font-bold" style={{ color: a.riskLevel.includes('High') ? '#f87171' : '#34d399' }}>{a.riskScore}%</span>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{a.model}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quantum status */}
      <div className="glass-card card-hover p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(var(--accent-rgb),0.1)' }}>
            <Atom size={20} style={{ color: 'var(--accent)' }} className="animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Quantum Engine Status</h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Hybrid quantum-classical simulation pipeline</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <QuantumMetric label="Qubits" value={3} />
          <QuantumMetric label="Circuit Depth" value={7} />
          <QuantumMetric label="Shots" value={1024} />
          <QuantumMetric label="Quantum Kernel" value={1} suffix=" active" />
        </div>
        <div className="mt-4">
          <ProgressBar value={87} label="Quantum Enhancement Score" showValue color="var(--accent)" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, trend }: { icon: typeof Activity; label: string; value: number; color: string; trend: string }) {
  return (
    <div className="glass-card card-hover p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <span className="text-xs px-2 py-1 rounded-lg" style={{ background: `${color}10`, color }}>{trend}</span>
      </div>
      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        <AnimatedCounter value={value} />
      </div>
      <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
}

function QuantumMetric({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>
        <AnimatedCounter value={value} suffix={suffix} />
      </p>
      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
    </div>
  );
}
