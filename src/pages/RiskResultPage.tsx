import { Download, FileText, BarChart3, ArrowLeft, Zap, CheckCircle2 } from 'lucide-react';
import { CircularGauge } from '@/components/ui/CircularGauge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useToast } from '@/components/ui/Toast';
import { downloadReportPDF, downloadVisualization } from '@/utils/reportGenerator';
import type { RiskResult, PageKey } from '@/types';

interface RiskResultPageProps {
  result: RiskResult;
  onNavigate: (page: PageKey) => void;
  onBack: () => void;
}

export function RiskResultPage({ result, onNavigate, onBack }: RiskResultPageProps) {
  const { notify } = useToast();

  const levelColor = result.score <= 30 ? '#34d399' : result.score <= 60 ? '#fbbf24' : result.score <= 80 ? '#f87171' : '#dc2626';

  const diseaseName = result.disease === 'skin' ? 'Skin Cancer' : result.disease === 'breast' ? 'Breast Cancer' : 'Hypertension';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-lg transition-smooth hover:bg-white/5" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Risk Analysis Result</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{diseaseName} • Hybrid Quantum ML Analysis</p>
        </div>
      </div>

      {/* Main result card */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Gauge */}
        <div className="glass-card p-6 flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>Overall Risk Score</h3>
          <CircularGauge value={result.score} label="Risk Level" sublabel={result.level} />
          <div className="mt-4 px-4 py-2 rounded-xl" style={{ background: `${levelColor}15`, border: `1px solid ${levelColor}40` }}>
            <span className="text-sm font-bold" style={{ color: levelColor }}>Risk Classification: {result.level}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="glass-card p-6 space-y-4">
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Analysis Metrics</h3>
          <MetricBar label="Confidence Score" value={result.confidence} suffix="%" color="#34d399" />
          <MetricBar label="Model Agreement" value={result.modelAgreement} suffix="%" color="#22d3ee" />
          <MetricBar label="Quantum Enhancement" value={result.quantumEnhancement} suffix="%" color="#a78bfa" />
          <MetricBar label="Data Quality" value={94} suffix="%" color="#fbbf24" />
        </div>

        {/* Model agreement */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>Model Agreement</h3>
          <div className="space-y-3">
            {[
              { name: 'QSVM', agree: true, score: 74 },
              { name: 'XGBoost', agree: true, score: 71 },
              { name: 'Neural Net', agree: true, score: 69 },
              { name: 'Random Forest', agree: false, score: 58 },
              { name: 'SVM', agree: true, score: 73 },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <CheckCircle2 size={16} style={{ color: m.agree ? '#34d399' : '#fbbf24' }} />
                <span className="text-sm flex-1" style={{ color: 'var(--text-primary)' }}>{m.name}</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{m.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why this result */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <Zap size={18} style={{ color: 'var(--accent)' }} />
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Why this result? — Top Contributing Factors</h3>
        </div>
        <div className="space-y-4">
          {result.riskFactors.map((f, i) => (
            <div key={f.name}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{f.name}</span>
                <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>{f.contribution}%</span>
              </div>
              <ProgressBar value={f.contribution} delay={i * 100} color={f.contribution > 70 ? '#f87171' : f.contribution > 50 ? '#fbbf24' : '#34d399'} />
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button onClick={() => onNavigate('analytics')} className="neon-btn flex items-center gap-2">
          <BarChart3 size={18} /> View Detailed Analysis
        </button>
        <button onClick={() => { downloadReportPDF(result); notify('Report generated and downloaded successfully!', 'success'); }} className="neon-btn flex items-center gap-2">
          <FileText size={18} /> Generate Report
        </button>
        <button onClick={() => { downloadReportPDF(result); notify('Report downloaded successfully!', 'success'); }} className="neon-btn neon-btn-primary flex items-center gap-2">
          <Download size={18} /> Download Report
        </button>
        <button onClick={() => { downloadVisualization(); notify('Visualization downloaded!', 'success'); }} className="neon-btn flex items-center gap-2">
          <BarChart3 size={18} /> Download Visualization
        </button>
      </div>

      <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        For research and educational demonstration only. Not a medical diagnosis.
      </p>
    </div>
  );
}

function MetricBar({ label, value, suffix, color }: { label: string; value: number; suffix: string; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{value}{suffix}</span>
      </div>
      <ProgressBar value={value} color={color} height="h-2" />
    </div>
  );
}
