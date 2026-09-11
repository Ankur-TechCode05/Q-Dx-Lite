import { useState } from 'react';
import { Activity, Upload, Zap, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useToast } from '@/components/ui/Toast';
import { processingSteps } from '@/data/mockData';
import type { DiseaseType, RiskResult, PageKey } from '@/types';

interface RiskAssessmentPageProps {
  onResult: (result: RiskResult) => void;
  onNavigate: (page: PageKey) => void;
}

export function RiskAssessmentPage({ onResult, onNavigate: _onNavigate }: RiskAssessmentPageProps) {
  const [disease, setDisease] = useState<DiseaseType>('hypertension');
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const { notify } = useToast();

  const handleRun = () => {
    setProcessing(true);
    setCurrentStep(0);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setProcessing(false);
            const result = generateResult(disease);
            onResult(result);
            notify('Hybrid Quantum Analysis completed successfully!', 'success');
          }, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Risk Assessment</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Select a disease module and input clinical parameters for hybrid quantum ML analysis</p>
      </div>

      {/* Disease selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DiseaseCard active={disease === 'skin'} onClick={() => setDisease('skin')} title="Skin Cancer" icon="🧬" color="#f472b6" />
        <DiseaseCard active={disease === 'breast'} onClick={() => setDisease('breast')} title="Breast Cancer" icon="🎗" color="#a78bfa" />
        <DiseaseCard active={disease === 'hypertension'} onClick={() => setDisease('hypertension')} title="Hypertension" icon="❤" color="#22d3ee" />
      </div>

      {/* Form + Visual */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card p-5">
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {disease === 'skin' ? 'Skin Cancer' : disease === 'breast' ? 'Breast Cancer' : 'Hypertension'} Input Parameters
          </h3>
          {disease === 'skin' && <SkinCancerForm />}
          {disease === 'breast' && <BreastCancerForm />}
          {disease === 'hypertension' && <HypertensionForm />}
        </div>

        {/* Visual panel */}
        <div className="glass-card p-5">
          <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Visualization</h3>
          {disease === 'skin' && <SkinLesionPanel />}
          {disease === 'breast' && <BreastCancerVisual />}
          {disease === 'hypertension' && <BloodPressureVisual />}
        </div>
      </div>

      {/* Run button */}
      <div className="flex justify-center">
        <button
          onClick={handleRun}
          disabled={processing}
          className="neon-btn neon-btn-primary text-lg px-10 py-4 flex items-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Zap size={22} className={processing ? 'animate-spin-slow' : 'group-hover:scale-110 transition-transform'} />
          {processing ? 'Analyzing...' : 'RUN HYBRID QUANTUM ANALYSIS'}
        </button>
      </div>

      {/* Processing overlay */}
      {processing && (
        <ProcessingAnimation currentStep={currentStep} />
      )}
    </div>
  );
}

function DiseaseCard({ active, onClick, title, icon, color }: { active: boolean; onClick: () => void; title: string; icon: string; color: string }) {
  return (
    <button
      onClick={onClick}
      className="glass-card card-hover p-4 flex items-center gap-3 transition-smooth text-left"
      style={active ? { borderColor: `${color}80`, boxShadow: `0 0 20px ${color}30` } : {}}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${color}15` }}>
        {icon}
      </div>
      <div>
        <p className="font-bold" style={{ color: active ? color : 'var(--text-primary)' }}>{title}</p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Risk Assessment Module</p>
      </div>
      {active && <ChevronRight size={18} className="ml-auto" style={{ color }} />}
    </button>
  );
}

// ===== Form Fields =====
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full px-3 py-2 text-sm rounded-xl border transition-smooth";
const inputStyle = { background: 'rgba(255,255,255,0.03)', borderColor: 'var(--border-glow)', color: 'var(--text-primary)' };
const selectStyle = { background: 'rgba(255,255,255,0.03)', borderColor: 'var(--border-glow)', color: 'var(--text-primary)' };

function SkinCancerForm() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Field label="Age"><input type="number" defaultValue={45} className={inputClass} style={inputStyle} /></Field>
      <Field label="Gender"><select className={inputClass} style={selectStyle}><option>Male</option><option>Female</option></select></Field>
      <Field label="Lesion Size (mm)"><input type="number" defaultValue={8} className={inputClass} style={inputStyle} /></Field>
      <Field label="Lesion Color"><select className={inputClass} style={selectStyle}><option>Brown</option><option>Black</option><option>Red</option><option>Blue</option><option>Mixed</option></select></Field>
      <Field label="Border Characteristics"><select className={inputClass} style={selectStyle}><option>Regular</option><option>Irregular</option><option>Notched</option></select></Field>
      <Field label="Asymmetry"><select className={inputClass} style={selectStyle}><option>Symmetric</option><option>Asymmetric</option><option>Highly Asymmetric</option></select></Field>
      <Field label="Texture"><select className={inputClass} style={selectStyle}><option>Smooth</option><option>Rough</option><option>Nodular</option></select></Field>
      <Field label="Evolution/Change"><select className={inputClass} style={selectStyle}><option>None</option><option>Slow Change</option><option>Rapid Change</option></select></Field>
      <div className="col-span-2">
        <Field label="Optional Image/Report Upload">
          <div className="border-2 border-dashed rounded-xl p-4 text-center transition-smooth hover:border-opacity-50" style={{ borderColor: 'var(--border-glow)' }}>
            <ImageIcon size={20} className="mx-auto mb-1" style={{ color: 'var(--text-muted)' }} />
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Drop image or click to upload</p>
          </div>
        </Field>
      </div>
    </div>
  );
}

function BreastCancerForm() {
  const fields = [
    'Age', 'Clump Thickness', 'Cell Size Uniformity', 'Cell Shape Uniformity',
    'Marginal Adhesion', 'Epithelial Cell Size', 'Bare Nuclei', 'Bland Chromatin',
    'Normal Nucleoli', 'Mitoses',
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {fields.map((f, i) => (
        <Field key={f} label={f}>
          <input type="number" defaultValue={i === 0 ? 55 : Math.floor(Math.random() * 8) + 1} min={i === 0 ? 1 : 1} max={i === 0 ? 100 : 10} className={inputClass} style={inputStyle} />
        </Field>
      ))}
    </div>
  );
}

function HypertensionForm() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Field label="Age"><input type="number" defaultValue={52} className={inputClass} style={inputStyle} /></Field>
      <Field label="Systolic Blood Pressure"><input type="number" defaultValue={145} className={inputClass} style={inputStyle} /></Field>
      <Field label="Diastolic Blood Pressure"><input type="number" defaultValue={95} className={inputClass} style={inputStyle} /></Field>
      <Field label="BMI"><input type="number" defaultValue={28.4} step="0.1" className={inputClass} style={inputStyle} /></Field>
      <Field label="Heart Rate (bpm)"><input type="number" defaultValue={82} className={inputClass} style={inputStyle} /></Field>
      <Field label="Glucose (mg/dL)"><input type="number" defaultValue={128} className={inputClass} style={inputStyle} /></Field>
      <Field label="Cholesterol (mg/dL)"><input type="number" defaultValue={210} className={inputClass} style={inputStyle} /></Field>
      <Field label="Smoking Status"><select className={inputClass} style={selectStyle}><option>Non-Smoker</option><option>Former Smoker</option><option>Current Smoker</option></select></Field>
      <Field label="Physical Activity"><select className={inputClass} style={selectStyle}><option>Sedentary</option><option>Moderate</option><option>Active</option><option>Very Active</option></select></Field>
      <Field label="Family History"><select className={inputClass} style={selectStyle}><option>None</option><option>One Parent</option><option>Both Parents</option></select></Field>
    </div>
  );
}

// ===== Visual Panels =====
function SkinLesionPanel() {
  return (
    <div className="aspect-square rounded-xl flex items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(244,114,182,0.1), transparent 70%)', border: '1px solid var(--border-glow)' }}>
      <div className="w-24 h-24 rounded-full" style={{ background: 'radial-gradient(circle, #8b4513 30%, #5c2a0e 70%, transparent)', boxShadow: '0 0 30px rgba(244,114,182,0.3)' }} />
      <div className="absolute bottom-3 left-3 right-3">
        <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>Lesion visualization placeholder</p>
      </div>
    </div>
  );
}

function BreastCancerVisual() {
  return (
    <div className="aspect-square rounded-xl flex items-center justify-center" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(167,139,250,0.1), transparent 70%)', border: '1px solid var(--border-glow)' }}>
      <svg viewBox="0 0 200 200" className="w-3/4 h-3/4">
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(167,139,250,0.3)" strokeWidth="1" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return <circle key={i} cx={100 + Math.cos(angle) * 65} cy={100 + Math.sin(angle) * 65} r="4" fill="rgba(167,139,250,0.5)" className="animate-blink" style={{ animationDelay: `${i * 0.2}s` }} />;
        })}
      </svg>
    </div>
  );
}

function BloodPressureVisual() {
  return (
    <div className="aspect-square rounded-xl p-4 flex flex-col" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.1), transparent 70%)', border: '1px solid var(--border-glow)' }}>
      <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>Blood Pressure</p>
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          <svg viewBox="0 0 160 160" className="w-32 h-32 -rotate-90">
            <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
            <circle cx="80" cy="80" r="60" fill="none" stroke="#f87171" strokeWidth="10" strokeLinecap="round" strokeDasharray="377" strokeDashoffset="113" style={{ filter: 'drop-shadow(0 0 6px #f87171)' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold" style={{ color: '#f87171' }}>145/95</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>mmHg</span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <span className="text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171' }}>Stage 2 Hypertension</span>
      </div>
    </div>
  );
}

// ===== Processing Animation =====
function ProcessingAnimation({ currentStep }: { currentStep: number }) {
  return (
    <div className="glass-card p-6 animate-scale-in">
      <h3 className="text-lg font-bold text-center mb-6" style={{ color: 'var(--accent)' }}>Hybrid Quantum ML Pipeline</h3>
      <div className="space-y-2">
        {processingSteps.map((step, i) => (
          <div
            key={step}
            className="flex items-center gap-3 p-3 rounded-xl transition-smooth"
            style={{
              background: i <= currentStep ? 'rgba(var(--accent-rgb),0.08)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${i <= currentStep ? 'rgba(var(--accent-rgb),0.3)' : 'transparent'}`,
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{
                background: i < currentStep ? 'rgba(52,211,153,0.2)' : i === currentStep ? 'rgba(var(--accent-rgb),0.2)' : 'rgba(255,255,255,0.05)',
                color: i < currentStep ? '#34d399' : i === currentStep ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              {i < currentStep ? '✓' : i + 1}
            </div>
            <span className="text-sm font-medium" style={{ color: i <= currentStep ? 'var(--text-primary)' : 'var(--text-muted)' }}>{step}</span>
            {i === currentStep && <span className="ml-auto flex gap-1"><span className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: 'var(--accent)', animationDelay: '0s' }} /><span className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: 'var(--accent)', animationDelay: '0.2s' }} /><span className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: 'var(--accent)', animationDelay: '0.4s' }} /></span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Result Generation =====
function generateResult(disease: DiseaseType): RiskResult {
  const score = Math.floor(Math.random() * 50) + 30;
  const level = score <= 30 ? 'Low Risk' : score <= 60 ? 'Moderate Risk' : score <= 80 ? 'High Risk' : 'Very High Risk';

  const factorMap: Record<DiseaseType, { name: string; contribution: number }[]> = {
    skin: [
      { name: 'Asymmetry', contribution: 78 },
      { name: 'Border Irregularity', contribution: 65 },
      { name: 'Color Variance', contribution: 58 },
      { name: 'Lesion Diameter', contribution: 45 },
      { name: 'Evolution/Change', contribution: 38 },
    ],
    breast: [
      { name: 'Cell Shape Uniformity', contribution: 82 },
      { name: 'Bare Nuclei', contribution: 71 },
      { name: 'Bland Chromatin', contribution: 64 },
      { name: 'Clump Thickness', contribution: 52 },
      { name: 'Mitoses', contribution: 41 },
    ],
    hypertension: [
      { name: 'High Blood Pressure', contribution: 82 },
      { name: 'BMI', contribution: 61 },
      { name: 'Age', contribution: 48 },
      { name: 'Glucose', contribution: 42 },
      { name: 'Cholesterol', contribution: 38 },
      { name: 'Family History', contribution: 24 },
    ],
  };

  return {
    score,
    level: level as RiskResult['level'],
    confidence: 88 + Math.floor(Math.random() * 8),
    quantumEnhancement: 82 + Math.floor(Math.random() * 10),
    modelAgreement: 91 + Math.floor(Math.random() * 6),
    riskFactors: factorMap[disease],
    disease,
  };
}
