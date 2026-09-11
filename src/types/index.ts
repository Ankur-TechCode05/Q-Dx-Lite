export type DiseaseType = 'skin' | 'breast' | 'hypertension';

export type RiskLevel = 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Very High Risk';

export interface RiskResult {
  score: number;
  level: RiskLevel;
  confidence: number;
  quantumEnhancement: number;
  modelAgreement: number;
  riskFactors: { name: string; contribution: number }[];
  disease: DiseaseType;
}

export interface MLModel {
  name: string;
  shortName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  status: 'Active' | 'Standby' | 'Training';
  type: 'Classical' | 'Quantum';
  description: string;
}

export interface DatasetInfo {
  name: string;
  type: string;
  samples: string;
  features: string;
  target: string;
  quality: number;
  usage: string;
  description: string;
  classDistribution: { name: string; value: number; color: string }[];
  featureStats: { name: string; min: number; max: number; mean: number }[];
}

export interface AnalysisRecord {
  id: string;
  date: string;
  disease: string;
  riskScore: number;
  riskLevel: RiskLevel;
  model: string;
  status: 'Completed' | 'Processing' | 'Failed';
}

export type PageKey =
  | 'home'
  | 'dashboard'
  | 'risk-assessment'
  | 'disease-detection'
  | 'report-analyzer'
  | 'datasets'
  | 'ml-models'
  | 'quantum-engine'
  | 'analytics'
  | 'flowchart'
  | 'reports'
  | 'settings';

export type ThemeName = 'quantum-dark' | 'midnight-blue' | 'neon-cyber' | 'medical-light' | 'aurora';
export type AccentColor = 'cyan' | 'violet' | 'blue' | 'emerald' | 'magenta';
export type LayoutDensity = 'compact' | 'comfortable' | 'spacious';
export type AnimationLevel = 'full' | 'reduced' | 'off';
export type ChartStyle = 'neon' | 'minimal' | 'glass';
export type FontSize = 'small' | 'medium' | 'large';

export interface Settings {
  theme: ThemeName;
  accent: AccentColor;
  layout: LayoutDensity;
  animation: AnimationLevel;
  chartStyle: ChartStyle;
  fontSize: FontSize;
}
