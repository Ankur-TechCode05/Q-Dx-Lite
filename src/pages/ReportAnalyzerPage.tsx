import { useState, useRef } from 'react';
import { UploadCloud, FileText, FileType, FileSpreadsheet, Image as ImageIcon, X, Zap, Activity, CheckCircle2, Download } from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useToast } from '@/components/ui/Toast';
import { downloadReportPDF, downloadVisualization, downloadTextSummary } from '@/utils/reportGenerator';
import type { RiskResult } from '@/types';

type Tab = 'upload' | 'manual';
type UploadStatus = 'idle' | 'uploaded' | 'processing' | 'done';

interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

const processingSteps = [
  'Reading Report',
  'Extracting Information',
  'Feature Detection',
  'Risk Analysis',
  'Generating Insights',
];

export function ReportAnalyzerPage() {
  const [tab, setTab] = useState<Tab>('upload');
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [processStep, setProcessStep] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { notify } = useToast();

  const handleFile = (f: File) => {
    const sizeStr = f.size > 1024 * 1024 ? `${(f.size / 1024 / 1024).toFixed(1)} MB` : `${(f.size / 1024).toFixed(0)} KB`;
    const ext = f.name.split('.').pop()?.toLowerCase() || '';
    let type = 'Document';
    if (['pdf'].includes(ext)) type = 'PDF';
    else if (['txt'].includes(ext)) type = 'Text';
    else if (['csv'].includes(ext)) type = 'CSV';
    else if (['jpg', 'jpeg', 'png'].includes(ext)) type = 'Image';

    setFile({ name: f.name, size: sizeStr, type });
    setUploadStatus('uploaded');
    notify('File uploaded successfully!', 'success');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = () => {
    setUploadStatus('processing');
    setProcessStep(0);
    const interval = setInterval(() => {
      setProcessStep((prev) => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadStatus('done');
            setShowResults(true);
            notify('Report analysis completed!', 'success');
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  const reset = () => {
    setFile(null);
    setUploadStatus('idle');
    setProcessStep(-1);
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>AI Report Analyzer</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Upload medical reports for AI-powered analysis or enter data manually</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('upload')}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-smooth"
          style={tab === 'upload' ? { background: 'rgba(var(--accent-rgb),0.15)', border: '1px solid rgba(var(--accent-rgb),0.4)', color: 'var(--accent)' } : { background: 'rgba(255,255,255,0.03)', border: '1px solid transparent', color: 'var(--text-secondary)' }}
        >
          <UploadCloud size={16} className="inline mr-2" /> Upload Report
        </button>
        <button
          onClick={() => setTab('manual')}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-smooth"
          style={tab === 'manual' ? { background: 'rgba(var(--accent-rgb),0.15)', border: '1px solid rgba(var(--accent-rgb),0.4)', color: 'var(--accent)' } : { background: 'rgba(255,255,255,0.03)', border: '1px solid transparent', color: 'var(--text-secondary)' }}
        >
          <FileText size={16} className="inline mr-2" /> Write Report Manually
        </button>
      </div>

      {tab === 'upload' && (
        <div className="space-y-4">
          {/* Drop zone */}
          {!file && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="glass-card p-12 text-center cursor-pointer transition-smooth"
              style={dragOver ? { borderColor: 'rgba(var(--accent-rgb),0.8)', boxShadow: '0 0 40px rgba(var(--accent-rgb),0.2)', transform: 'scale(1.02)' } : {}}
            >
              <input ref={fileInputRef} type="file" accept=".pdf,.txt,.csv,.jpg,.jpeg,.png" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center animate-float" style={{ background: 'rgba(var(--accent-rgb),0.1)' }}>
                <UploadCloud size={32} style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Drop your medical report here</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Supported formats: PDF, TXT, CSV, JPG, PNG</p>
            </div>
          )}

          {/* File info */}
          {file && (
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(var(--accent-rgb),0.1)' }}>
                  {file.type === 'PDF' ? <FileType size={22} style={{ color: 'var(--accent)' }} /> :
                   file.type === 'Image' ? <ImageIcon size={22} style={{ color: 'var(--accent)' }} /> :
                   file.type === 'CSV' ? <FileSpreadsheet size={22} style={{ color: 'var(--accent)' }} /> :
                   <FileText size={22} style={{ color: 'var(--accent)' }} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{file.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{file.size} • {file.type}</p>
                </div>
                <button onClick={reset} className="p-2 rounded-lg transition-smooth hover:bg-white/5" style={{ color: 'var(--text-muted)' }}>
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Upload Status</span>
                  <span className="text-xs font-bold flex items-center gap-1" style={{ color: '#34d399' }}><CheckCircle2 size={12} /> Uploaded</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Analysis Status</span>
                  <span className="text-xs font-bold" style={{ color: uploadStatus === 'done' ? '#34d399' : uploadStatus === 'processing' ? 'var(--accent)' : 'var(--text-muted)' }}>
                    {uploadStatus === 'done' ? 'Completed' : uploadStatus === 'processing' ? 'Processing...' : 'Pending'}
                  </span>
                </div>
              </div>

              {uploadStatus === 'uploaded' && (
                <button onClick={handleAnalyze} className="neon-btn neon-btn-primary w-full flex items-center justify-center gap-2">
                  <Zap size={18} /> Analyze Report
                </button>
              )}

              {uploadStatus === 'processing' && (
                <div className="space-y-2 mt-4">
                  {processingSteps.map((step, i) => (
                    <div key={step} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: i <= processStep ? 'rgba(var(--accent-rgb),0.05)' : 'transparent' }}>
                      <div className="w-6 h-6 rounded flex items-center justify-center text-xs" style={{ background: i < processStep ? 'rgba(52,211,153,0.2)' : i === processStep ? 'rgba(var(--accent-rgb),0.2)' : 'rgba(255,255,255,0.05)', color: i < processStep ? '#34d399' : i === processStep ? 'var(--accent)' : 'var(--text-muted)' }}>
                        {i < processStep ? '✓' : i + 1}
                      </div>
                      <span className="text-xs" style={{ color: i <= processStep ? 'var(--text-primary)' : 'var(--text-muted)' }}>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Results */}
          {showResults && <ReportResults />}
        </div>
      )}

      {tab === 'manual' && <ManualReportEntry onAnalyze={() => { setShowResults(true); notify('Report analyzed!', 'success'); }} showResults={showResults} />}
    </div>
  );
}

function ReportResults() {
  const { notify } = useToast();
  const detectedParams = [
    { label: 'Blood Pressure', value: '150/95 mmHg', risk: 82, color: '#f87171' },
    { label: 'BMI', value: '28.4', risk: 61, color: '#fbbf24' },
    { label: 'Glucose', value: '128 mg/dL', risk: 55, color: '#fbbf24' },
    { label: 'Cholesterol', value: '210 mg/dL', risk: 48, color: '#fbbf24' },
    { label: 'Heart Rate', value: '82 bpm', risk: 31, color: '#34d399' },
  ];

  const handleDownloadReport = () => {
    const result: RiskResult = {
      score: 72,
      level: 'High Risk',
      confidence: 92,
      quantumEnhancement: 87,
      modelAgreement: 93,
      disease: 'hypertension',
      riskFactors: detectedParams.map(p => ({ name: p.label, contribution: p.risk })),
    };
    downloadReportPDF(result);
    notify('Report downloaded successfully!', 'success');
  };

  return (
    <div className="space-y-4 animate-scale-in">
      {/* Detected parameters */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={18} style={{ color: 'var(--accent)' }} />
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Detected Parameters</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {detectedParams.map((p) => (
            <div key={p.label} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{p.label}</p>
              <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{p.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk indicators */}
      <div className="glass-card p-5">
        <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Detected Risk Indicators</h3>
        <div className="space-y-3">
          {detectedParams.map((p, i) => (
            <div key={p.label}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{p.label}</span>
                <span className="text-sm font-bold" style={{ color: p.color }}>{p.risk}%</span>
              </div>
              <ProgressBar value={p.risk} delay={i * 100} color={p.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Download buttons */}
      <div className="flex flex-wrap gap-3">
        <button onClick={handleDownloadReport} className="neon-btn neon-btn-primary flex items-center gap-2">
          <Download size={18} /> Download Report as PDF
        </button>
        <button onClick={() => { downloadVisualization(); notify('Visualization downloaded!', 'success'); }} className="neon-btn flex items-center gap-2">
          <Download size={18} /> Download Visualization
        </button>
      </div>
    </div>
  );
}

function ManualReportEntry({ onAnalyze, showResults }: { onAnalyze: () => void; showResults: boolean }) {
  const { notify } = useToast();
  const inputClass = "w-full px-3 py-2 text-sm rounded-xl border transition-smooth";
  const inputStyle = { background: 'rgba(255,255,255,0.03)', borderColor: 'var(--border-glow)', color: 'var(--text-primary)' };

  return (
    <div className="space-y-4">
      <div className="glass-card p-5 space-y-4">
        <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Patient Information</h3>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Patient Name</label><input className={inputClass} style={inputStyle} placeholder="John Doe" /></div>
          <div><label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Age</label><input type="number" className={inputClass} style={inputStyle} defaultValue={52} /></div>
          <div><label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Gender</label><select className={inputClass} style={inputStyle}><option>Male</option><option>Female</option></select></div>
          <div><label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Patient ID</label><input className={inputClass} style={inputStyle} placeholder="QDX-001" /></div>
        </div>

        <h3 className="text-lg font-bold pt-2" style={{ color: 'var(--text-primary)' }}>Clinical Information</h3>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Blood Pressure</label><input className={inputClass} style={inputStyle} placeholder="120/80" defaultValue="145/95" /></div>
          <div><label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Heart Rate</label><input type="number" className={inputClass} style={inputStyle} defaultValue={82} /></div>
          <div><label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>BMI</label><input type="number" step="0.1" className={inputClass} style={inputStyle} defaultValue={28.4} /></div>
          <div><label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Glucose</label><input type="number" className={inputClass} style={inputStyle} defaultValue={128} /></div>
        </div>

        <h3 className="text-lg font-bold pt-2" style={{ color: 'var(--text-primary)' }}>Test Results</h3>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Cholesterol</label><input type="number" className={inputClass} style={inputStyle} defaultValue={210} /></div>
          <div><label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Family History</label><select className={inputClass} style={inputStyle}><option>None</option><option>One Parent</option><option>Both Parents</option></select></div>
        </div>

        <h3 className="text-lg font-bold pt-2" style={{ color: 'var(--text-primary)' }}>Observations</h3>
        <textarea className={inputClass} style={inputStyle} rows={3} placeholder="Enter clinical observations..." defaultValue="Patient presents with elevated blood pressure readings over multiple visits. Recommend lifestyle modifications." />

        <h3 className="text-lg font-bold pt-2" style={{ color: 'var(--text-primary)' }}>Additional Notes</h3>
        <textarea className={inputClass} style={inputStyle} rows={2} placeholder="Additional notes..." />

        <div className="flex gap-3 pt-2">
          <button onClick={onAnalyze} className="neon-btn neon-btn-primary flex items-center gap-2"><Zap size={18} /> Analyze Report</button>
          <button onClick={() => notify('Form cleared', 'info')} className="neon-btn flex items-center gap-2"><X size={18} /> Clear</button>
          <button onClick={() => { downloadTextSummary({ id: 'QDX-MANUAL-' + Date.now().toString().slice(-6), date: new Date().toLocaleString(), disease: 'Hypertension', riskScore: 72, riskLevel: 'High Risk', model: 'QSVM', status: 'Completed' }); notify('Summary generated and downloaded!', 'success'); }} className="neon-btn flex items-center gap-2"><FileText size={18} /> Generate Summary</button>
        </div>
      </div>

      {showResults && <ReportResults />}
    </div>
  );
}
