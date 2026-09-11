import { useState } from 'react';
import { Brain, Cpu, Atom, TrendingUp, Target, Zap, Award, Code2, Grid3x3, GitCompare, X, Download } from 'lucide-react';
import { mlModels, pythonModelFiles, confusionMatrixData, modelDistributionData, rocCurveData, modelMetricsMatrix } from '@/data/mockData';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useToast } from '@/components/ui/Toast';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
} from 'recharts';

type Tab = 'overview' | 'distributions' | 'matrices' | 'code';

export function MLModelsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('overview');
  const [codeViewer, setCodeViewer] = useState<string | null>(null);
  const { notify } = useToast();

  const comparisonData = mlModels.map((m) => ({
    name: m.shortName,
    Accuracy: m.accuracy,
    Precision: m.precision,
    Recall: m.recall,
    'F1 Score': m.f1,
  }));

  const radarMetrics = [
    { metric: 'Accuracy', QSVM: 95, XGB: 94, NN: 93 },
    { metric: 'Precision', QSVM: 94, XGB: 93, NN: 92 },
    { metric: 'Recall', QSVM: 96, XGB: 92, NN: 94 },
    { metric: 'F1 Score', QSVM: 95, XGB: 93, NN: 93 },
  ];

  const classicalVsQuantum = [
    { name: 'Classical Avg', accuracy: 90.6, precision: 89.6, recall: 89.2, f1: 89.4 },
    { name: 'Quantum (QSVM)', accuracy: 95, precision: 94, recall: 96, f1: 95 },
  ];

  const tabs: { key: Tab; label: string; icon: typeof Brain }[] = [
    { key: 'overview', label: 'Overview', icon: TrendingUp },
    { key: 'distributions', label: 'Distributions', icon: Target },
    { key: 'matrices', label: 'Confusion Matrices', icon: Grid3x3 },
    { key: 'code', label: 'Python Code', icon: Code2 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Machine Learning Models</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Classical and quantum ML models with performance metrics, distributions, confusion matrices, and Python source code</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-smooth flex items-center gap-2 whitespace-nowrap"
              style={active
                ? { background: 'rgba(var(--accent-rgb),0.15)', border: '1px solid rgba(var(--accent-rgb),0.4)', color: 'var(--accent)' }
                : { background: 'rgba(255,255,255,0.03)', border: '1px solid transparent', color: 'var(--text-secondary)' }}
            >
              <Icon size={16} /> {t.label}
            </button>
          );
        })}
      </div>

      {/* === OVERVIEW TAB === */}
      {tab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          {/* Model cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mlModels.map((model, i) => (
              <div
                key={model.name}
                onClick={() => setSelected(selected === model.name ? null : model.name)}
                className="glass-card card-hover p-5 cursor-pointer"
                style={selected === model.name ? { borderColor: 'rgba(var(--accent-rgb),0.6)', boxShadow: '0 0 30px rgba(var(--accent-rgb),0.15)' } : {}}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: model.type === 'Quantum' ? 'rgba(167,139,250,0.1)' : 'rgba(34,211,238,0.1)' }}>
                    {model.type === 'Quantum' ? <Atom size={22} style={{ color: '#a78bfa' }} className="animate-spin-slow" /> : <Brain size={22} style={{ color: '#22d3ee' }} />}
                  </div>
                  <span className="text-xs px-2 py-1 rounded-lg" style={{
                    background: model.status === 'Active' ? 'rgba(52,211,153,0.1)' : model.status === 'Training' ? 'rgba(251,191,36,0.1)' : 'rgba(148,163,184,0.1)',
                    color: model.status === 'Active' ? '#34d399' : model.status === 'Training' ? '#fbbf24' : '#94a3b8',
                  }}>
                    {model.status}
                  </span>
                </div>
                <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{model.name}</h3>
                <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{model.description}</p>
                <div className="space-y-2">
                  <MiniMetric label="Accuracy" value={model.accuracy} delay={i * 100} />
                  <MiniMetric label="Precision" value={model.precision} delay={i * 100 + 50} />
                  <MiniMetric label="Recall" value={model.recall} delay={i * 100 + 100} />
                  <MiniMetric label="F1 Score" value={model.f1} delay={i * 100 + 150} />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: model.type === 'Quantum' ? 'rgba(167,139,250,0.1)' : 'rgba(34,211,238,0.1)', color: model.type === 'Quantum' ? '#a78bfa' : '#22d3ee' }}>
                    {model.type}
                  </span>
                  {pythonModelFiles.find(p => p.model === model.name) && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setCodeViewer(model.name); }}
                      className="text-xs px-2 py-0.5 rounded-md flex items-center gap-1 transition-smooth hover:opacity-80"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--accent)' }}
                    >
                      <Code2 size={10} /> View Code
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Comparison chart */}
          <div className="glass-card card-hover p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} style={{ color: 'var(--accent)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Model Performance Comparison</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} domain={[80, 100]} />
                <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Accuracy" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Precision" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Recall" fill="#f472b6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="F1 Score" fill="#34d399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Classical vs Quantum + Radar */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="glass-card card-hover p-5">
              <div className="flex items-center gap-2 mb-4">
                <Target size={18} style={{ color: 'var(--accent)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Classical ML vs Quantum ML</h3>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarMetrics}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[80, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                  <Radar name="QSVM" dataKey="QSVM" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.3} strokeWidth={2} />
                  <Radar name="XGBoost" dataKey="XGB" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.2} strokeWidth={2} />
                  <Radar name="Neural Net" dataKey="NN" stroke="#f472b6" fill="#f472b6" fillOpacity={0.15} strokeWidth={2} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card card-hover p-5">
              <div className="flex items-center gap-2 mb-4">
                <Award size={18} style={{ color: 'var(--accent)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Classical vs Quantum Performance</h3>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={classicalVsQuantum} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} domain={[80, 100]} />
                  <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="accuracy" name="Accuracy" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="f1" name="F1 Score" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quantum advantage + ROC curve */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="glass-card card-hover p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={18} style={{ color: 'var(--accent)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Quantum Enhancement Over Time</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={[
                  { epoch: '1', classical: 82, quantum: 85 },
                  { epoch: '5', classical: 86, quantum: 89 },
                  { epoch: '10', classical: 88, quantum: 92 },
                  { epoch: '15', classical: 89, quantum: 94 },
                  { epoch: '20', classical: 90, quantum: 95 },
                  { epoch: '25', classical: 90.5, quantum: 96 },
                  { epoch: '30', classical: 91, quantum: 96.5 },
                ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="epoch" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} domain={[80, 100]} />
                  <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="classical" name="Classical ML" stroke="#22d3ee" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="quantum" name="Quantum ML" stroke="#a78bfa" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card card-hover p-5">
              <div className="flex items-center gap-2 mb-4">
                <GitCompare size={18} style={{ color: 'var(--accent)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>ROC Curves</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={rocCurveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="fpr" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5, fill: 'var(--text-muted)', fontSize: 10 }} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="tpr_qsvm" name="QSVM (AUC=0.97)" stroke="#a78bfa" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="tpr_xgb" name="XGBoost (AUC=0.96)" stroke="#22d3ee" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="tpr_nn" name="Neural Net (AUC=0.95)" stroke="#f472b6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="tpr_rf" name="Random Forest (AUC=0.94)" stroke="#34d399" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* === DISTRIBUTIONS TAB === */}
      {tab === 'distributions' && (
        <div className="space-y-6 animate-fade-in">
          {/* Per-model distribution pie charts */}
          <div className="grid md:grid-cols-2 gap-4">
            {modelDistributionData.map((dist) => (
              <div key={dist.model} className="glass-card card-hover p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Target size={18} style={{ color: 'var(--accent)' }} />
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{dist.model} — Prediction Distribution</h3>
                </div>
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width="50%" height={180}>
                    <PieChart>
                      <Pie data={dist.distribution} dataKey="count" nameKey="class" cx="50%" cy="50%" innerRadius={40} outerRadius={75} paddingAngle={3}>
                        {dist.distribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-2">
                    {dist.distribution.map((d) => (
                      <div key={d.class} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{d.class}</span>
                        <span className="text-sm font-semibold ml-auto" style={{ color: 'var(--text-primary)' }}>{d.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stacked distribution bar chart */}
          <div className="glass-card card-hover p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3Icon size={18} style={{ color: 'var(--accent)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Class Distribution Across Models</h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={modelDistributionData.map(d => ({
                model: d.model,
                'Low Risk': d.distribution[0].count,
                'Moderate': d.distribution[1].count,
                'High Risk': d.distribution[2].count,
                'Very High': d.distribution[3].count,
              }))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="model" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Low Risk" stackId="a" fill="#34d399" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Moderate" stackId="a" fill="#fbbf24" />
                <Bar dataKey="High Risk" stackId="a" fill="#f87171" />
                <Bar dataKey="Very High" stackId="a" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cumulative distribution area chart */}
          <div className="glass-card card-hover p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} style={{ color: 'var(--accent)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Cumulative Prediction Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={modelDistributionData.map(d => ({
                model: d.model,
                'Low Risk': d.distribution[0].count,
                'Moderate': d.distribution[1].count,
                'High Risk': d.distribution[2].count,
                'Very High': d.distribution[3].count,
              }))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="dist-low" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#34d399" stopOpacity={0.4} /><stop offset="100%" stopColor="#34d399" stopOpacity={0} /></linearGradient>
                  <linearGradient id="dist-mod" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fbbf24" stopOpacity={0.4} /><stop offset="100%" stopColor="#fbbf24" stopOpacity={0} /></linearGradient>
                  <linearGradient id="dist-high" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f87171" stopOpacity={0.4} /><stop offset="100%" stopColor="#f87171" stopOpacity={0} /></linearGradient>
                  <linearGradient id="dist-vh" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#dc2626" stopOpacity={0.4} /><stop offset="100%" stopColor="#dc2626" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="model" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="Low Risk" stackId="1" stroke="#34d399" strokeWidth={1} fill="url(#dist-low)" />
                <Area type="monotone" dataKey="Moderate" stackId="1" stroke="#fbbf24" strokeWidth={1} fill="url(#dist-mod)" />
                <Area type="monotone" dataKey="High Risk" stackId="1" stroke="#f87171" strokeWidth={1} fill="url(#dist-high)" />
                <Area type="monotone" dataKey="Very High" stackId="1" stroke="#dc2626" strokeWidth={1} fill="url(#dist-vh)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* === CONFUSION MATRICES TAB === */}
      {tab === 'matrices' && (
        <div className="space-y-6 animate-fade-in">
          {/* Metrics matrix bars */}
          <div className="glass-card card-hover p-5">
            <div className="flex items-center gap-2 mb-4">
              <Grid3x3 size={18} style={{ color: 'var(--accent)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Extended Metrics Matrix</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {modelMetricsMatrix.map((m) => (
                <div key={m.model} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 className="text-sm font-bold mb-3" style={{ color: m.metrics[0].color }}>{m.model}</h4>
                  <div className="space-y-2">
                    {m.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{metric.label}</span>
                          <span className="text-xs font-bold" style={{ color: metric.color }}>{metric.value}%</span>
                        </div>
                        <ProgressBar value={metric.value} height="h-1.5" color={metric.color} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confusion matrices */}
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(confusionMatrixData).map(([modelName, data]) => {
              const maxVal = Math.max(...data.predicted.flat());
              return (
                <div key={modelName} className="glass-card card-hover p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Grid3x3 size={18} style={{ color: 'var(--accent)' }} />
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{modelName} — Confusion Matrix</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-xs p-2" style={{ color: 'var(--text-muted)' }}></th>
                          {data.labels.map((label) => (
                            <th key={label} className="text-xs p-2 text-center font-medium" style={{ color: 'var(--text-muted)' }}>{label}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.predicted.map((row, ri) => (
                          <tr key={ri}>
                            <td className="text-xs p-2 font-medium whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>{data.labels[ri]}</td>
                            {row.map((val, ci) => {
                              const isDiagonal = ri === ci;
                              const intensity = val / maxVal;
                              return (
                                <td key={ci} className="p-2">
                                  <div
                                    className="w-full h-12 rounded-lg flex items-center justify-center text-sm font-bold transition-smooth"
                                    style={{
                                      background: isDiagonal
                                        ? `rgba(52,211,153,${0.08 + intensity * 0.25})`
                                        : `rgba(248,113,113,${0.04 + intensity * 0.15})`,
                                      color: isDiagonal ? '#34d399' : 'var(--text-secondary)',
                                      border: isDiagonal ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(255,255,255,0.05)',
                                    }}
                                  >
                                    {val}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded" style={{ background: 'rgba(52,211,153,0.3)', border: '1px solid rgba(52,211,153,0.3)' }} />
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Correct</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded" style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.2)' }} />
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Misclassified</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* === PYTHON CODE TAB === */}
      {tab === 'code' && (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={18} style={{ color: 'var(--accent)' }} />
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Python Model Source Code</h3>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Production-ready Python implementations for each ML model. Click a model to view its full source code with syntax highlighting.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {pythonModelFiles.map((file) => (
                <div key={file.name} className="glass-card card-hover p-5 cursor-pointer" onClick={() => setCodeViewer(file.model)}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: file.type === 'Quantum' ? 'rgba(167,139,250,0.1)' : 'rgba(34,211,238,0.1)' }}>
                      {file.type === 'Quantum' ? <Atom size={20} style={{ color: '#a78bfa' }} /> : <Brain size={20} style={{ color: '#22d3ee' }} />}
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: file.type === 'Quantum' ? 'rgba(167,139,250,0.1)' : 'rgba(34,211,238,0.1)', color: file.type === 'Quantum' ? '#a78bfa' : '#22d3ee' }}>
                      {file.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold mb-1 font-mono" style={{ color: 'var(--text-primary)' }}>{file.name}</h4>
                  <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{file.description}</p>
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--accent)' }}>
                    <Code2 size={12} /> View Source Code
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Code viewer modal */}
      {codeViewer && (
        <CodeViewerModal
          file={pythonModelFiles.find(f => f.model === codeViewer)!}
          onClose={() => setCodeViewer(null)}
          onDownload={() => {
            const file = pythonModelFiles.find(f => f.model === codeViewer)!;
            const blob = new Blob([file.code], { type: 'text/x-python' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();
            URL.revokeObjectURL(url);
            notify(`${file.name} downloaded`, 'success');
          }}
        />
      )}
    </div>
  );
}

function CodeViewerModal({ file, onClose, onDownload }: { file: typeof pythonModelFiles[0]; onClose: () => void; onDownload: () => void }) {
  const lines = file.code.split('\n');

  const highlightLine = (line: string): { text: string; color: string }[] => {
    const tokens: { text: string; color: string }[] = [];
    const keywords = ['import', 'from', 'class', 'def', 'return', 'if', 'else', 'elif', 'for', 'while', 'try', 'except', 'with', 'as', 'in', 'not', 'and', 'or', 'None', 'True', 'False', 'self', 'super', 'print', 'raise', 'lambda', 'yield', 'pass', 'break', 'continue'];
    const types = ['np', 'xgb', 'torch', 'nn', 'optim', 'SVC', 'StandardScaler', 'LabelEncoder', 'RandomForestClassifier', 'QuantumKernel', 'ZZFeatureMap', 'QuantumCircuit', 'DataLoader', 'TensorDataset', 'StratifiedKFold', 'accuracy_score', 'confusion_matrix', 'cross_val_score'];

    let remaining = line;
    let inString = false;
    let stringChar = '';
    let inComment = false;

    if (remaining.trimStart().startsWith('#')) {
      return [{ text: line, color: 'var(--text-muted)' }];
    }

    let i = 0;
    while (i < remaining.length) {
      const char = remaining[i];

      if (inString) {
        if (char === stringChar) {
          inString = false;
        }
        tokens.push({ text: char, color: '#fbbf24' });
        i++;
        continue;
      }

      if (char === '"' || char === "'") {
        inString = true;
        stringChar = char;
        tokens.push({ text: char, color: '#fbbf24' });
        i++;
        continue;
      }

      if (char === '#') {
        tokens.push({ text: remaining.slice(i), color: 'var(--text-muted)' });
        break;
      }

      let matched = false;
      for (const kw of keywords) {
        if (remaining.slice(i, i + kw.length) === kw && (i + kw.length >= remaining.length || !remaining[i + kw.length].match(/[a-zA-Z0-9_]/))) {
          tokens.push({ text: kw, color: '#a78bfa' });
          i += kw.length;
          matched = true;
          break;
        }
      }
      if (matched) continue;

      for (const t of types) {
        if (remaining.slice(i, i + t.length) === t && (i + t.length >= remaining.length || !remaining[i + t.length].match(/[a-zA-Z0-9_]/))) {
          tokens.push({ text: t, color: '#22d3ee' });
          i += t.length;
          matched = true;
          break;
        }
      }
      if (matched) continue;

      if (char.match(/[0-9]/)) {
        let num = '';
        while (i < remaining.length && remaining[i].match(/[0-9.]/)) {
          num += remaining[i];
          i++;
        }
        tokens.push({ text: num, color: '#f472b6' });
        continue;
      }

      tokens.push({ text: char, color: 'var(--text-primary)' });
      i++;
    }

    return tokens;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div className="w-full max-w-4xl max-h-[85vh] glass-card overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()} style={{ background: 'var(--bg-elevated)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border-glow)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: file.type === 'Quantum' ? 'rgba(167,139,250,0.1)' : 'rgba(34,211,238,0.1)' }}>
              {file.type === 'Quantum' ? <Atom size={20} style={{ color: '#a78bfa' }} /> : <Brain size={20} style={{ color: '#22d3ee' }} />}
            </div>
            <div>
              <h3 className="text-lg font-bold font-mono" style={{ color: 'var(--text-primary)' }}>{file.name}</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{file.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onDownload} className="neon-btn text-xs flex items-center gap-1.5">
              <Download size={14} /> Download
            </button>
            <button onClick={onClose} className="p-2 rounded-lg transition-smooth hover:bg-white/5" style={{ color: 'var(--text-secondary)' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Code body */}
        <div className="flex-1 overflow-auto p-5" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <pre className="text-sm font-mono leading-relaxed">
            {lines.map((line, idx) => (
              <div key={idx} className="flex">
                <span className="select-none w-10 text-right pr-4 flex-shrink-0" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>{idx + 1}</span>
                <code className="flex-1">
                  {highlightLine(line).map((token, ti) => (
                    <span key={ti} style={{ color: token.color }}>{token.text}</span>
                  ))}
                  {line.length === 0 && '\u00A0'}
                </code>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

function MiniMetric({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-0.5">
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{value}%</span>
      </div>
      <ProgressBar value={value} delay={delay} height="h-1.5" color="var(--accent)" />
    </div>
  );
}

function BarChart3Icon({ size, style }: { size: number; style: React.CSSProperties }) {
  return <Cpu size={size} style={style} />;
}
