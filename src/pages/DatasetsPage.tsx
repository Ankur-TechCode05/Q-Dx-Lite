import { useState } from 'react';
import { Database, Eye, Layers, CheckCircle2, BarChart3, Grid3x3, Activity } from 'lucide-react';
import { datasets } from '@/data/mockData';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Modal } from '@/components/ui/Modal';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts';

export function DatasetsPage() {
  const [selectedDataset, setSelectedDataset] = useState<number | null>(null);

  const correlationData = [
    { feature: 'Age', value: 0.82 },
    { feature: 'BP', value: 0.75 },
    { feature: 'BMI', value: 0.68 },
    { feature: 'Glucose', value: 0.55 },
    { feature: 'Cholesterol', value: 0.48 },
    { feature: 'Heart Rate', value: 0.35 },
    { feature: 'Smoking', value: 0.42 },
    { feature: 'Family Hist.', value: 0.38 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Datasets</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Explore training datasets with visual analytics</p>
      </div>

      {/* Dataset cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {datasets.map((ds, i) => (
          <div key={i} className="glass-card card-hover p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(var(--accent-rgb),0.1)' }}>
                <Database size={22} style={{ color: 'var(--accent)' }} />
              </div>
              <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399' }}>
                <CheckCircle2 size={12} className="inline mr-1" /> Verified
              </span>
            </div>
            <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{ds.name}</h3>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{ds.description}</p>

            <div className="space-y-2 mb-4">
              <DataRow label="Type" value={ds.type} />
              <DataRow label="Samples" value={ds.samples} />
              <DataRow label="Features" value={ds.features} />
              <DataRow label="Target" value={ds.target} />
              <DataRow label="Usage" value={ds.usage} />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Data Quality</span>
                <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{ds.quality}%</span>
              </div>
              <ProgressBar value={ds.quality} color="var(--accent)" height="h-1.5" />
            </div>

            <div className="flex gap-2">
              <button onClick={() => setSelectedDataset(i)} className="neon-btn text-xs flex-1 flex items-center justify-center gap-1.5">
                <Eye size={14} /> View Dataset
              </button>
              <button onClick={() => setSelectedDataset(i)} className="neon-btn text-xs flex-1 flex items-center justify-center gap-1.5">
                <Layers size={14} /> Explore Features
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dataset visualizations */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Class distribution */}
        <div className="glass-card card-hover p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={18} style={{ color: 'var(--accent)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Class Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={datasets[0].classDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} paddingAngle={3} label={(e: any) => e.name ?? ''}>
                {datasets[0].classDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Feature distribution */}
        <div className="glass-card card-hover p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={18} style={{ color: 'var(--accent)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Feature Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={datasets[0].featureStats.map(f => ({ name: f.name.split(' ')[0], mean: f.mean }))} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="ds-bar" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8} /><stop offset="100%" stopColor="#22d3ee" stopOpacity={0.2} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
              <Bar dataKey="mean" fill="url(#ds-bar)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Missing values */}
        <div className="glass-card card-hover p-5">
          <div className="flex items-center gap-2 mb-4">
            <Grid3x3 size={18} style={{ color: 'var(--accent)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Missing Values Analysis</h3>
          </div>
          <div className="space-y-3">
            {datasets[0].featureStats.map((f, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{f.name}</span>
                  <span className="text-xs font-bold" style={{ color: '#34d399' }}>{Math.floor(Math.random() * 3)}%</span>
                </div>
                <ProgressBar value={100 - Math.floor(Math.random() * 3)} color="#34d399" height="h-1.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Correlation matrix */}
        <div className="glass-card card-hover p-5">
          <div className="flex items-center gap-2 mb-4">
            <Grid3x3 size={18} style={{ color: 'var(--accent)' }} />
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Correlation Matrix</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={correlationData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="feature" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} />
              <Radar dataKey="value" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.3} strokeWidth={2} />
              <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dataset detail modal */}
      <Modal open={selectedDataset !== null} onClose={() => setSelectedDataset(null)} title={selectedDataset !== null ? datasets[selectedDataset].name : ''} maxWidth="max-w-3xl">
        {selectedDataset !== null && (
          <DatasetDetail dataset={datasets[selectedDataset]} />
        )}
      </Modal>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}

function DatasetDetail({ dataset }: { dataset: typeof datasets[0] }) {
  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{dataset.description}</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Samples</p>
          <p className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{dataset.samples}</p>
        </div>
        <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Features</p>
          <p className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{dataset.features}</p>
        </div>
        <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Target Variable</p>
          <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{dataset.target}</p>
        </div>
        <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Data Quality</p>
          <p className="text-lg font-bold" style={{ color: '#34d399' }}>{dataset.quality}%</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Feature Statistics</h4>
        <div className="space-y-2">
          {dataset.featureStats.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <span className="text-xs font-medium flex-1" style={{ color: 'var(--text-primary)' }}>{f.name}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Min: {f.min}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Max: {f.max}</span>
              <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>Mean: {f.mean}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Class Distribution</h4>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={dataset.classDistribution} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'rgba(10,15,30,0.9)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: '12px', fontSize: 12 }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {dataset.classDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
