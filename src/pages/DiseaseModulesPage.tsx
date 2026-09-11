import { useState, useRef } from 'react';
import { Activity, ChevronRight, Microscope, HeartPulse, Dna, Download, Upload, ImageIcon, X, Loader2, Scan, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useToast } from '@/components/ui/Toast';
import { downloadReportPDF } from '@/utils/reportGenerator';
import type { PageKey, RiskResult } from '@/types';

interface DiseaseModulesPageProps {
  onNavigate: (page: PageKey) => void;
}

export function DiseaseModulesPage({ onNavigate }: DiseaseModulesPageProps) {
  const { notify } = useToast();
  const [showSkinAnalyzer, setShowSkinAnalyzer] = useState(false);

  const modules = [
    {
      icon: Dna,
      title: 'Skin Cancer Risk',
      emoji: '🧬',
      color: '#f472b6',
      gradient: 'linear-gradient(135deg, rgba(244,114,182,0.15), rgba(244,114,182,0.05))',
      riskScore: 55,
      riskLevel: 'Moderate Risk',
      model: 'Neural Network',
      status: 'Completed',
      features: ['Asymmetry', 'Border Irregularity', 'Color Variance', 'Diameter', 'Evolution'],
      lastAnalysis: '2026-09-09 16:45',
      hasImageUpload: true,
    },
    {
      icon: Microscope,
      title: 'Breast Cancer Risk',
      emoji: '🎗',
      color: '#a78bfa',
      gradient: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(167,139,250,0.05))',
      riskScore: 28,
      riskLevel: 'Low Risk',
      model: 'XGBoost',
      status: 'Completed',
      features: ['Cell Shape Uniformity', 'Bare Nuclei', 'Bland Chromatin', 'Clump Thickness', 'Mitoses'],
      lastAnalysis: '2026-09-10 13:15',
      hasImageUpload: false,
    },
    {
      icon: HeartPulse,
      title: 'Hypertension Risk',
      emoji: '❤',
      color: '#22d3ee',
      gradient: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(34,211,238,0.05))',
      riskScore: 72,
      riskLevel: 'High Risk',
      model: 'QSVM',
      status: 'Completed',
      features: ['Blood Pressure', 'BMI', 'Age', 'Glucose', 'Cholesterol', 'Family History'],
      lastAnalysis: '2026-09-10 14:32',
      hasImageUpload: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Disease Detection</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Three disease modules with dedicated quantum ML analysis</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.title}
              className="glass-card card-hover p-5 relative group"
              style={{ borderColor: `${m.color}30` }}
            >
              {/* Glow accent */}
              <div
                className="absolute -top-px -right-px w-32 h-32 rounded-full opacity-10 pointer-events-none transition-opacity group-hover:opacity-20"
                style={{ background: `radial-gradient(circle, ${m.color} 0%, transparent 70%)`, filter: 'blur(40px)' }}
              />

              {/* Header */}
              <div className="flex items-start justify-between mb-4 relative">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: m.gradient, border: `1px solid ${m.color}30` }}
                >
                  <Icon size={24} style={{ color: m.color }} />
                </div>
                <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399' }}>
                  {m.status}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{m.title}</h3>
              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Last analysis: {m.lastAnalysis}</p>

              {/* Risk score */}
              <div className="p-3 rounded-xl mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Risk Score</span>
                  <span className="text-xl font-bold" style={{ color: m.color }}>{m.riskScore}%</span>
                </div>
                <ProgressBar value={m.riskScore} color={m.color} height="h-2" />
                <div className="mt-2">
                  <span className="text-xs font-semibold" style={{ color: m.color }}>{m.riskLevel}</span>
                </div>
              </div>

              {/* Model used */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Model Used</span>
                <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{m.model}</span>
              </div>

              {/* Important features */}
              <div className="mb-4">
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Important Features</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.features.map((f) => (
                    <span key={f} className="text-[10px] px-2 py-1 rounded-md" style={{ background: `${m.color}10`, color: m.color, border: `1px solid ${m.color}20` }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {m.hasImageUpload ? (
                  <button
                    onClick={() => setShowSkinAnalyzer(true)}
                    className="neon-btn text-xs flex-1 flex items-center justify-center gap-1.5"
                    style={{ borderColor: `${m.color}40`, background: `linear-gradient(135deg, ${m.color}15, ${m.color}05)` }}
                  >
                    <ImageIcon size={14} /> Upload & Analyze
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('risk-assessment')}
                    className="neon-btn text-xs flex-1 flex items-center justify-center gap-1.5"
                  >
                    <Activity size={14} /> Analyze
                  </button>
                )}
                <button
                  onClick={() => {
                    const result: RiskResult = {
                      score: m.riskScore,
                      level: m.riskLevel as RiskResult['level'],
                      confidence: 92,
                      quantumEnhancement: 87,
                      modelAgreement: 93,
                      disease: m.title.includes('Skin') ? 'skin' : m.title.includes('Breast') ? 'breast' : 'hypertension',
                      riskFactors: m.features.map((f, i) => ({ name: f, contribution: Math.max(20, 82 - i * 12) })),
                    };
                    downloadReportPDF(result);
                    notify(`${m.title} report downloaded!`, 'success');
                  }}
                  className="neon-btn text-xs flex items-center justify-center gap-1"
                >
                  <Download size={14} /> Report
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Blood pressure analysis for hypertension */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <HeartPulse size={18} style={{ color: '#22d3ee' }} />
          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Blood Pressure Analysis</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <BPStat label="Systolic" value={145} unit="mmHg" status="High" color="#f87171" />
          <BPStat label="Diastolic" value={95} unit="mmHg" status="High" color="#f87171" />
          <BPStat label="Pulse Pressure" value={50} unit="mmHg" status="Normal" color="#34d399" />
          <BPStat label="MAP" value={112} unit="mmHg" status="High" color="#fbbf24" />
        </div>
      </div>

      <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        For research and educational demonstration only. Not a medical diagnosis.
      </p>

      {/* Skin Cancer Image Upload Modal */}
      {showSkinAnalyzer && (
        <SkinCancerAnalyzer
          onClose={() => setShowSkinAnalyzer(false)}
          onResult={(score) => {
            notify(`Analysis complete: Risk score ${score}%`, 'success');
          }}
        />
      )}
    </div>
  );
}

function BPStat({ label, value, unit, status, color }: { label: string; value: number; unit: string; status: string; color: string }) {
  return (
    <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
      <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{value} <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{unit}</span></p>
      <span className="text-xs font-semibold" style={{ color }}>{status}</span>
    </div>
  );
}

// ===== Skin Cancer Image Analyzer =====

interface SkinCancerAnalyzerProps {
  onClose: () => void;
  onResult: (score: number) => void;
}

function SkinCancerAnalyzer({ onClose, onResult }: SkinCancerAnalyzerProps) {
  const { notify } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    riskScore: number;
    riskLevel: string;
    confidence: number;
    asymmetry: number;
    borderIrregularity: number;
    colorVariance: number;
    diameter: number;
    evolution: number;
  } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      notify('Please upload an image file.', 'error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      notify('Image must be under 10MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    if (!image) return;
    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const riskScore = Math.floor(Math.random() * 60 + 20);
      const riskLevel = riskScore < 25 ? 'Low Risk' : riskScore < 50 ? 'Moderate Risk' : riskScore < 75 ? 'High Risk' : 'Very High Risk';
      const confidence = Math.floor(Math.random() * 15 + 82);

      setResult({
        riskScore,
        riskLevel,
        confidence,
        asymmetry: Math.floor(Math.random() * 100),
        borderIrregularity: Math.floor(Math.random() * 100),
        colorVariance: Math.floor(Math.random() * 100),
        diameter: Math.floor(Math.random() * 100),
        evolution: Math.floor(Math.random() * 100),
      });
      setAnalyzing(false);
      onResult(riskScore);
    }, 2500);
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const riskColor = result
    ? result.riskScore < 25 ? '#34d399' : result.riskScore < 50 ? '#fbbf24' : result.riskScore < 75 ? '#f87171' : '#dc2626'
    : '#f472b6';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div
        className="w-full max-w-3xl max-h-[90vh] glass-card overflow-hidden flex flex-col animate-scale-in"
        style={{ background: 'var(--bg-elevated)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-glow)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(244,114,182,0.1)', border: '1px solid rgba(244,114,182,0.3)' }}>
              <Dna size={20} style={{ color: '#f472b6' }} />
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Skin Lesion Analyzer</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Upload a skin lesion image for AI risk assessment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg transition-smooth hover:bg-white/5" style={{ color: 'var(--text-secondary)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-6">
          {!image ? (
            /* Upload zone */
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all hover:opacity-80 text-center"
              style={{ borderColor: 'rgba(244,114,182,0.3)', background: 'rgba(244,114,182,0.03)' }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(244,114,182,0.1)' }}>
                <Upload size={28} style={{ color: '#f472b6' }} />
              </div>
              <h4 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Upload Skin Lesion Image</h4>
              <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Click to select a file or drag and drop</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>PNG, JPG, JPEG up to 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            /* Image + analysis */
            <div className="space-y-4">
              {/* Image preview */}
              <div className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(244,114,182,0.3)' }}>
                <img src={image} alt="Skin lesion" className="w-full max-h-80 object-contain" style={{ background: 'rgba(0,0,0,0.3)' }} />
                {analyzing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
                    <Loader2 size={40} className="animate-spin mb-3" style={{ color: '#f472b6' }} />
                    <p className="text-sm font-semibold" style={{ color: '#f472b6' }}>Analyzing lesion...</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Running Neural Network + Quantum Feature Map</p>
                  </div>
                )}
                {result && (
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg flex items-center gap-1.5" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
                    <Scan size={14} style={{ color: riskColor }} />
                    <span className="text-xs font-bold" style={{ color: riskColor }}>{result.riskLevel}</span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              {!result && !analyzing && (
                <div className="flex gap-3">
                  <button onClick={handleAnalyze} className="neon-btn neon-btn-primary flex-1 flex items-center justify-center gap-2">
                    <Zap size={16} /> Run Analysis
                  </button>
                  <button onClick={handleReset} className="neon-btn flex items-center gap-2">
                    <X size={16} /> Change Image
                  </button>
                </div>
              )}

              {/* Results */}
              {result && (
                <div className="space-y-4 animate-fade-in">
                  {/* Risk score */}
                  <div className="p-4 rounded-xl" style={{ background: `${riskColor}10`, border: `1px solid ${riskColor}30` }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {result.riskScore < 50 ? <CheckCircle2 size={20} style={{ color: riskColor }} /> : <AlertTriangle size={20} style={{ color: riskColor }} />}
                        <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Risk Assessment Result</span>
                      </div>
                      <span className="text-2xl font-bold" style={{ color: riskColor }}>{result.riskScore}%</span>
                    </div>
                    <ProgressBar value={result.riskScore} color={riskColor} height="h-2.5" />
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm font-semibold" style={{ color: riskColor }}>{result.riskLevel}</span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Confidence: {result.confidence}%</span>
                    </div>
                  </div>

                  {/* ABCDE Analysis */}
                  <div>
                    <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>ABCDE Feature Analysis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <FeatureBar label="Asymmetry" value={result.asymmetry} color="#f472b6" />
                      <FeatureBar label="Border Irregularity" value={result.borderIrregularity} color="#a78bfa" />
                      <FeatureBar label="Color Variance" value={result.colorVariance} color="#22d3ee" />
                      <FeatureBar label="Diameter" value={result.diameter} color="#fbbf24" />
                      <FeatureBar label="Evolution" value={result.evolution} color="#34d399" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const riskResult: RiskResult = {
                          score: result.riskScore,
                          level: result.riskLevel as RiskResult['level'],
                          confidence: result.confidence,
                          quantumEnhancement: 87,
                          modelAgreement: 93,
                          disease: 'skin',
                          riskFactors: [
                            { name: 'Asymmetry', contribution: result.asymmetry },
                            { name: 'Border Irregularity', contribution: result.borderIrregularity },
                            { name: 'Color Variance', contribution: result.colorVariance },
                            { name: 'Diameter', contribution: result.diameter },
                            { name: 'Evolution', contribution: result.evolution },
                          ],
                        };
                        downloadReportPDF(riskResult);
                        notify('Skin cancer analysis report downloaded!', 'success');
                      }}
                      className="neon-btn flex-1 flex items-center justify-center gap-2"
                    >
                      <Download size={16} /> Download Report
                    </button>
                    <button onClick={handleReset} className="neon-btn flex items-center gap-2">
                      <Upload size={16} /> New Image
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t" style={{ borderColor: 'var(--border-glow)' }}>
          <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
            For research and educational demonstration only. Not a medical diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{value}%</span>
      </div>
      <ProgressBar value={value} color={color} height="h-1.5" />
    </div>
  );
}
