import { FileText, Download, Zap, Clock, CheckCircle2, Eye } from 'lucide-react';
import { analysisHistory } from '@/data/mockData';
import { useToast } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';
import { useState } from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { downloadReportFromHistory, downloadVisualization, downloadTextSummary } from '@/utils/reportGenerator';

export function ReportsPage() {
  const { notify } = useToast();
  const [preview, setPreview] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Reports</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>View, download, and generate visual analysis reports</p>
      </div>

      {/* Report history table */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} style={{ color: 'var(--accent)' }} />
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Analysis History</h3>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <th className="text-left text-xs font-medium pb-3 pl-2" style={{ color: 'var(--text-muted)' }}>Analysis ID</th>
                <th className="text-left text-xs font-medium pb-3" style={{ color: 'var(--text-muted)' }}>Date</th>
                <th className="text-left text-xs font-medium pb-3" style={{ color: 'var(--text-muted)' }}>Disease</th>
                <th className="text-left text-xs font-medium pb-3" style={{ color: 'var(--text-muted)' }}>Risk Score</th>
                <th className="text-left text-xs font-medium pb-3" style={{ color: 'var(--text-muted)' }}>Risk Level</th>
                <th className="text-left text-xs font-medium pb-3" style={{ color: 'var(--text-muted)' }}>Model</th>
                <th className="text-right text-xs font-medium pb-3 pr-2" style={{ color: 'var(--text-muted)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {analysisHistory.map((a, i) => (
                <tr key={a.id} className="border-b transition-smooth hover:bg-white/5" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
                  <td className="text-sm py-3 pl-2 font-mono" style={{ color: 'var(--accent)' }}>{a.id}</td>
                  <td className="text-sm py-3" style={{ color: 'var(--text-secondary)' }}>{a.date}</td>
                  <td className="text-sm py-3" style={{ color: 'var(--text-primary)' }}>{a.disease}</td>
                  <td className="text-sm py-3 font-bold" style={{ color: a.riskLevel.includes('High') ? '#f87171' : '#34d399' }}>{a.riskScore}%</td>
                  <td className="text-sm py-3" style={{ color: a.riskLevel.includes('High') ? '#f87171' : '#34d399' }}>{a.riskLevel}</td>
                  <td className="text-sm py-3" style={{ color: 'var(--text-secondary)' }}>{a.model}</td>
                  <td className="py-3 pr-2 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setPreview(i)} className="p-2 rounded-lg transition-smooth hover:bg-white/5" style={{ color: 'var(--accent)' }} title="Preview"><Eye size={16} /></button>
                      <button onClick={() => { downloadReportFromHistory(a); notify(`Report ${a.id} downloaded`, 'success'); }} className="p-2 rounded-lg transition-smooth hover:bg-white/5" style={{ color: 'var(--text-secondary)' }} title="Download Report"><Download size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {analysisHistory.map((a, i) => (
            <div key={a.id} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>{a.id}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{a.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{a.disease}</span>
                <span className="text-sm font-bold" style={{ color: a.riskLevel.includes('High') ? '#f87171' : '#34d399' }}>{a.riskScore}%</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{a.model} • {a.riskLevel}</span>
                <div className="flex gap-1">
                  <button onClick={() => setPreview(i)} className="p-1.5 rounded-lg" style={{ color: 'var(--accent)' }}><Eye size={14} /></button>
                  <button onClick={() => { downloadReportFromHistory(a); notify(`Report ${a.id} downloaded`, 'success'); }} className="p-1.5 rounded-lg" style={{ color: 'var(--text-secondary)' }}><Download size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate report CTA */}
      <div className="glass-card p-6 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(var(--accent-rgb),0.1)' }}>
          <FileText size={28} style={{ color: 'var(--accent)' }} />
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Generate Visual Report</h3>
        <p className="text-sm mb-4 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>Create a professional AI analytics report with charts, insights, and disclaimers.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => { downloadReportFromHistory(analysisHistory[0]); notify('Visual report generated and downloaded', 'success'); }} className="neon-btn neon-btn-primary flex items-center gap-2">
            <Zap size={18} /> Generate Visual Report
          </button>
          <button onClick={() => { downloadVisualization(); notify('Visualization downloaded', 'success'); }} className="neon-btn flex items-center gap-2">
            <Download size={18} /> Download Visualization
          </button>
        </div>
      </div>

      {/* Report preview modal */}
      <Modal open={preview !== null} onClose={() => setPreview(null)} title="Report Preview" maxWidth="max-w-3xl">
        {preview !== null && <ReportPreview report={analysisHistory[preview]} />}
      </Modal>
    </div>
  );
}

function ReportPreview({ report }: { report: typeof analysisHistory[0] }) {
  const { notify } = useToast();
  const riskColor = report.riskLevel.includes('High') ? '#f87171' : '#34d399';

  return (
    <div className="space-y-4">
      {/* Report header */}
      <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(var(--accent-rgb),0.05)', border: '1px solid rgba(var(--accent-rgb),0.2)' }}>
        <div className="flex items-center gap-2">
          <Zap size={20} style={{ color: 'var(--accent)' }} />
          <span className="text-lg font-bold gradient-text">Q-Dx</span>
        </div>
        <div className="text-right">
          <p className="text-xs font-mono" style={{ color: 'var(--accent)' }}>{report.id}</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{report.date}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Selected Disease</p>
          <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{report.disease}</p>
        </div>
        <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Model Used</p>
          <p className="text-sm font-bold" style={{ color: 'var(--accent)' }}>{report.model}</p>
        </div>
        <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Risk Score</p>
          <p className="text-sm font-bold" style={{ color: riskColor }}>{report.riskScore}%</p>
        </div>
        <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Risk Category</p>
          <p className="text-sm font-bold" style={{ color: riskColor }}>{report.riskLevel}</p>
        </div>
      </div>

      {/* Feature importance */}
      <div>
        <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Feature Importance</h4>
        <div className="space-y-2">
          {[
            { name: 'Blood Pressure', value: 82 },
            { name: 'BMI', value: 61 },
            { name: 'Age', value: 48 },
            { name: 'Glucose', value: 42 },
          ].map((f, i) => (
            <div key={f.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{f.name}</span>
                <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{f.value}%</span>
              </div>
              <ProgressBar value={f.value} delay={i * 100} height="h-1.5" />
            </div>
          ))}
        </div>
      </div>

      {/* Key insights */}
      <div>
        <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Key Insights</h4>
        <ul className="space-y-1.5">
          {[
            'Hybrid quantum-classical ensemble shows 95% accuracy on validation set.',
            'Quantum kernel estimation provides 4.4% enhancement over classical models.',
            'Blood pressure is the highest contributing risk factor at 82%.',
            'Model agreement across 5 classifiers: 93%.',
          ].map((insight, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#34d399' }} />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{insight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="p-3 rounded-xl" style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.2)' }}>
        <p className="text-xs" style={{ color: '#f87171' }}>
          Disclaimer: For research and educational demonstration only. Not a medical diagnosis.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => { downloadReportFromHistory(report); notify('Report downloaded successfully', 'success'); }} className="neon-btn neon-btn-primary flex-1 flex items-center justify-center gap-2">
          <Download size={18} /> Download Report as PDF
        </button>
        <button onClick={() => { downloadTextSummary(report); notify('Text summary downloaded', 'success'); }} className="neon-btn flex items-center justify-center gap-2">
          <FileText size={18} /> Download Summary
        </button>
      </div>
    </div>
  );
}
