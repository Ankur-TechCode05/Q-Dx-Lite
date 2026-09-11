import type { AnalysisRecord, RiskResult } from '@/types';

const ACCENT = '#22d3ee';
const ACCENT2 = '#a78bfa';
const TEXT_DARK = '#0f172a';
const TEXT_MED = '#475569';
const TEXT_LIGHT = '#94a3b8';
const BG_LIGHT = '#f8fafc';
const BORDER = '#e2e8f0';

function formatDate(): string {
  return new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

function generateAnalysisId(): string {
  const ts = Date.now().toString().slice(-6);
  return `QDX-2026-${ts}`;
}

function getRiskColor(score: number): string {
  if (score <= 30) return '#10b981';
  if (score <= 60) return '#f59e0b';
  if (score <= 80) return '#ef4444';
  return '#dc2626';
}

function getDiseaseName(disease: string): string {
  if (disease.toLowerCase().includes('skin')) return 'Skin Cancer';
  if (disease.toLowerCase().includes('breast')) return 'Breast Cancer';
  if (disease.toLowerCase().includes('hyper')) return 'Hypertension';
  return disease;
}

interface ReportData {
  analysisId: string;
  date: string;
  disease: string;
  riskScore: number;
  riskLevel: string;
  model: string;
  confidence: number;
  quantumEnhancement: number;
  modelAgreement: number;
  riskFactors: { name: string; contribution: number }[];
  insights: string[];
}

function buildReportHTML(data: ReportData): string {
  const riskColor = getRiskColor(data.riskScore);
  const gaugeCircumference = 2 * Math.PI * 45;
  const gaugeOffset = gaugeCircumference - (data.riskScore / 100) * gaugeCircumference;

  const factorBars = data.riskFactors
    .map(
      (f) => `
      <div style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="font-size:13px;color:${TEXT_DARK};font-weight:500">${f.name}</span>
          <span style="font-size:13px;color:${riskColor};font-weight:700">${f.contribution}%</span>
        </div>
        <div style="width:100%;height:8px;background:${BORDER};border-radius:4px;overflow:hidden">
          <div style="width:${f.contribution}%;height:100%;background:linear-gradient(90deg,${riskColor},${riskColor}cc);border-radius:4px"></div>
        </div>
      </div>`
    )
    .join('');

  const modelRows = [
    { name: 'QSVM', agree: true, score: data.riskScore + 2 },
    { name: 'XGBoost', agree: true, score: data.riskScore - 1 },
    { name: 'Neural Network', agree: true, score: data.riskScore - 3 },
    { name: 'Random Forest', agree: false, score: data.riskScore - 14 },
    { name: 'SVM', agree: true, score: data.riskScore - 1 },
  ]
    .map(
      (m) => `
      <tr style="border-bottom:1px solid ${BORDER}">
        <td style="padding:10px 12px;font-size:13px;color:${TEXT_DARK};font-weight:500">${m.name}</td>
        <td style="padding:10px 12px;font-size:13px;color:${m.agree ? '#10b981' : '#f59e0b'};font-weight:600">${m.agree ? 'Agree' : 'Partial'}</td>
        <td style="padding:10px 12px;font-size:13px;color:${TEXT_MED};text-align:right">${Math.max(0, Math.min(100, m.score))}%</td>
      </tr>`
    )
    .join('');

  const insightItems = data.insights
    .map(
      (ins) => `
      <li style="margin-bottom:8px;padding-left:20px;position:relative;font-size:13px;color:${TEXT_MED};line-height:1.6">
        <span style="position:absolute;left:0;top:2px;color:${ACCENT};font-weight:700">▸</span>
        ${ins}
      </li>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Q-Dx Analysis Report — ${data.analysisId}</title>
<style>
  @page { margin: 0; size: A4; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #e2e8f0; padding: 32px; color: ${TEXT_DARK}; }
  .report { max-width: 800px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
  .header { background: linear-gradient(135deg, #030712 0%, #0a0f1e 100%); padding: 36px 40px; color: white; position: relative; overflow: hidden; }
  .header::after { content: ''; position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: radial-gradient(circle, ${ACCENT}33, transparent 70%); border-radius: 50%; }
  .logo-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; position: relative; z-index: 1; }
  .logo { display: flex; align-items: center; gap: 10px; }
  .logo-icon { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, ${ACCENT}33, ${ACCENT2}33); display: flex; align-items: center; justify-content: center; border: 1px solid ${ACCENT}55; }
  .logo-text { font-size: 22px; font-weight: 800; background: linear-gradient(135deg, ${ACCENT}, ${ACCENT2}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .logo-tag { font-size: 10px; color: ${TEXT_LIGHT}; letter-spacing: 1px; }
  .report-id { text-align: right; }
  .report-id-label { font-size: 11px; color: ${TEXT_LIGHT}; margin-bottom: 2px; }
  .report-id-value { font-size: 14px; font-family: monospace; color: ${ACCENT}; font-weight: 600; }
  .report-date { font-size: 12px; color: ${TEXT_LIGHT}; margin-top: 4px; }
  .title { font-size: 26px; font-weight: 800; margin-bottom: 6px; position: relative; z-index: 1; }
  .subtitle { font-size: 14px; color: ${TEXT_LIGHT}; position: relative; z-index: 1; }
  .section { padding: 28px 40px; }
  .section-title { font-size: 16px; font-weight: 700; color: ${TEXT_DARK}; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 2px solid ${BORDER}; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .info-card { background: ${BG_LIGHT}; border: 1px solid ${BORDER}; border-radius: 12px; padding: 16px; }
  .info-label { font-size: 11px; color: ${TEXT_LIGHT}; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .info-value { font-size: 16px; font-weight: 700; color: ${TEXT_DARK}; }
  .gauge-wrap { display: flex; align-items: center; gap: 24px; }
  .gauge-svg { width: 120px; height: 120px; flex-shrink: 0; }
  .risk-badge { display: inline-block; padding: 6px 16px; border-radius: 8px; font-size: 14px; font-weight: 700; }
  .table { width: 100%; border-collapse: collapse; }
  .table th { text-align: left; font-size: 12px; color: ${TEXT_LIGHT}; font-weight: 600; padding: 10px 12px; border-bottom: 2px solid ${BORDER}; text-transform: uppercase; letter-spacing: 0.5px; }
  .disclaimer { background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px 20px; margin: 0 40px 28px; }
  .disclaimer-text { font-size: 12px; color: #dc2626; line-height: 1.6; }
  .footer { background: #0a0f1e; padding: 20px 40px; text-align: center; }
  .footer-text { font-size: 11px; color: ${TEXT_LIGHT}; }
  .footer-tagline { font-size: 13px; color: ${ACCENT}; font-weight: 600; margin-top: 4px; }
  @media print { body { padding: 0; background: white; } .report { box-shadow: none; max-width: 100%; border-radius: 0; } }
</style>
</head>
<body>
<div class="report">
  <div class="header">
    <div class="logo-row">
      <div class="logo">
        <div class="logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${ACCENT}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
        </div>
        <div>
          <div class="logo-text">Q-Dx</div>
          <div class="logo-tag">HYBRID QUANTUM ML PLATFORM</div>
        </div>
      </div>
      <div class="report-id">
        <div class="report-id-label">Analysis ID</div>
        <div class="report-id-value">${data.analysisId}</div>
        <div class="report-date">${data.date}</div>
      </div>
    </div>
    <div class="title">Hybrid Quantum ML Analysis Report</div>
    <div class="subtitle">${data.disease} — Risk Assessment &amp; Explainable AI Insights</div>
  </div>

  <div class="section">
    <div class="section-title">1. Analysis Summary</div>
    <div class="grid2">
      <div class="info-card">
        <div class="info-label">Selected Disease</div>
        <div class="info-value">${data.disease}</div>
      </div>
      <div class="info-card">
        <div class="info-label">Model Used</div>
        <div class="info-value" style="color:${ACCENT}">${data.model}</div>
      </div>
      <div class="info-card">
        <div class="info-label">Risk Score</div>
        <div class="info-value" style="color:${riskColor}">${data.riskScore}%</div>
      </div>
      <div class="info-card">
        <div class="info-label">Risk Category</div>
        <div class="info-value" style="color:${riskColor}">${data.riskLevel}</div>
      </div>
    </div>
  </div>

  <div class="section" style="padding-top:0">
    <div class="section-title">2. Risk Score Visualization</div>
    <div class="gauge-wrap">
      <svg class="gauge-svg" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="45" fill="none" stroke="${BORDER}" stroke-width="10"/>
        <circle cx="60" cy="60" r="45" fill="none" stroke="${riskColor}" stroke-width="10" stroke-linecap="round"
          stroke-dasharray="${gaugeCircumference}" stroke-dashoffset="${gaugeOffset}"
          transform="rotate(-90 60 60)"/>
        <text x="60" y="58" text-anchor="middle" font-size="24" font-weight="800" fill="${TEXT_DARK}">${data.riskScore}%</text>
        <text x="60" y="76" text-anchor="middle" font-size="10" fill="${TEXT_LIGHT}">Risk Score</text>
      </svg>
      <div>
        <div class="risk-badge" style="background:${riskColor}15;color:${riskColor};border:1px solid ${riskColor}40">Classification: ${data.riskLevel}</div>
        <div style="margin-top:12px;font-size:13px;color:${TEXT_MED};line-height:1.6;max-width:300px">
          The hybrid quantum-classical ensemble model analyzed input parameters and produced a risk score of <strong style="color:${riskColor}">${data.riskScore}%</strong> with a confidence of <strong>${data.confidence}%</strong>.
        </div>
      </div>
    </div>
  </div>

  <div class="section" style="padding-top:0">
    <div class="section-title">3. Analysis Metrics</div>
    <div class="grid3">
      <div class="info-card">
        <div class="info-label">Confidence Score</div>
        <div class="info-value" style="color:#10b981">${data.confidence}%</div>
      </div>
      <div class="info-card">
        <div class="info-label">Model Agreement</div>
        <div class="info-value" style="color:${ACCENT}">${data.modelAgreement}%</div>
      </div>
      <div class="info-card">
        <div class="info-label">Quantum Enhancement</div>
        <div class="info-value" style="color:${ACCENT2}">${data.quantumEnhancement}%</div>
      </div>
    </div>
  </div>

  <div class="section" style="padding-top:0">
    <div class="section-title">4. Top Contributing Risk Factors</div>
    ${factorBars}
  </div>

  <div class="section" style="padding-top:0">
    <div class="section-title">5. ML Model Agreement</div>
    <table class="table">
      <thead>
        <tr>
          <th>Model</th>
          <th>Agreement</th>
          <th style="text-align:right">Predicted Risk</th>
        </tr>
      </thead>
      <tbody>${modelRows}</tbody>
    </table>
  </div>

  <div class="section" style="padding-top:0">
    <div class="section-title">6. Key Insights</div>
    <ul style="list-style:none;padding:0">${insightItems}</ul>
  </div>

  <div class="section" style="padding-top:0">
    <div class="section-title">7. ML Model Comparison</div>
    <table class="table">
      <thead>
        <tr><th>Model</th><th>Type</th><th style="text-align:right">Accuracy</th><th style="text-align:right">F1 Score</th></tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid ${BORDER}"><td style="padding:10px 12px;font-size:13px;font-weight:500">Random Forest</td><td style="padding:10px 12px;font-size:13px;color:${TEXT_MED}">Classical</td><td style="padding:10px 12px;font-size:13px;text-align:right;color:${TEXT_MED}">92%</td><td style="padding:10px 12px;font-size:13px;text-align:right;color:${TEXT_MED}">91%</td></tr>
        <tr style="border-bottom:1px solid ${BORDER}"><td style="padding:10px 12px;font-size:13px;font-weight:500">SVM</td><td style="padding:10px 12px;font-size:13px;color:${TEXT_MED}">Classical</td><td style="padding:10px 12px;font-size:13px;text-align:right;color:${TEXT_MED}">89%</td><td style="padding:10px 12px;font-size:13px;text-align:right;color:${TEXT_MED}">87%</td></tr>
        <tr style="border-bottom:1px solid ${BORDER}"><td style="padding:10px 12px;font-size:13px;font-weight:500">XGBoost</td><td style="padding:10px 12px;font-size:13px;color:${TEXT_MED}">Classical</td><td style="padding:10px 12px;font-size:13px;text-align:right;color:${TEXT_MED}">94%</td><td style="padding:10px 12px;font-size:13px;text-align:right;color:${TEXT_MED}">93%</td></tr>
        <tr style="border-bottom:1px solid ${BORDER}"><td style="padding:10px 12px;font-size:13px;font-weight:500">Neural Network</td><td style="padding:10px 12px;font-size:13px;color:${TEXT_MED}">Classical</td><td style="padding:10px 12px;font-size:13px;text-align:right;color:${TEXT_MED}">93%</td><td style="padding:10px 12px;font-size:13px;text-align:right;color:${TEXT_MED}">93%</td></tr>
        <tr style="border-bottom:1px solid ${BORDER}"><td style="padding:10px 12px;font-size:13px;font-weight:700;color:${ACCENT2}">QSVM</td><td style="padding:10px 12px;font-size:13px;color:${ACCENT2};font-weight:600">Quantum</td><td style="padding:10px 12px;font-size:13px;text-align:right;color:${ACCENT2};font-weight:700">95%</td><td style="padding:10px 12px;font-size:13px;text-align:right;color:${ACCENT2};font-weight:700">95%</td></tr>
      </tbody>
    </table>
  </div>

  <div class="section" style="padding-top:0">
    <div class="section-title">8. Quantum ML Analysis</div>
    <div class="info-card" style="background:linear-gradient(135deg,${ACCENT2}08,${ACCENT}08);border-color:${ACCENT}33">
      <div style="font-size:13px;color:${TEXT_MED};line-height:1.7">
        The quantum component of the hybrid pipeline used <strong style="color:${ACCENT2}">3 qubits</strong> with a circuit depth of <strong style="color:${ACCENT2}">7</strong> and <strong style="color:${ACCENT2}">1024 shots</strong>. The quantum kernel estimation provided a <strong style="color:${ACCENT2}">${data.quantumEnhancement}%</strong> enhancement over classical-only models, demonstrating the advantage of quantum feature mapping in higher-dimensional Hilbert space.
      </div>
    </div>
  </div>

  <div class="disclaimer">
    <div class="disclaimer-text">
      <strong>Disclaimer:</strong> For research and educational demonstration only. Not a medical diagnosis. The predictions and insights in this report are generated by simulated ML models and should not be used for clinical decision-making. Always consult a qualified healthcare professional for medical advice.
    </div>
  </div>

  <div class="footer">
    <div class="footer-text">Generated by Q-Dx Hybrid Quantum ML Platform — ${data.date}</div>
    <div class="footer-tagline">Quantum Intelligence. Earlier Insights. Smarter Healthcare.</div>
  </div>
</div>
</body>
</html>`;
}

function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

function buildInsights(score: number, disease: string, quantumEnh: number): string[] {
  return [
    `Hybrid quantum-classical ensemble achieved ${quantumEnh}% quantum enhancement over classical-only models.`,
    `Quantum kernel estimation used 3 qubits with circuit depth 7 and 1024 shots for feature mapping.`,
    `${disease} risk score of ${score}% was determined by the ensemble of 5 ML models with 93% agreement.`,
    `The top contributing risk factor was identified with ${score > 60 ? 'significant' : 'moderate'} influence on the prediction.`,
    `Feature importance analysis provides explainable AI insights for clinical review.`,
  ];
}

export function downloadReportPDF(result: RiskResult) {
  const diseaseName = getDiseaseName(result.disease);
  const data: ReportData = {
    analysisId: generateAnalysisId(),
    date: formatDate(),
    disease: diseaseName,
    riskScore: result.score,
    riskLevel: result.level,
    model: 'QSVM (Hybrid Ensemble)',
    confidence: result.confidence,
    quantumEnhancement: result.quantumEnhancement,
    modelAgreement: result.modelAgreement,
    riskFactors: result.riskFactors,
    insights: buildInsights(result.score, diseaseName, result.quantumEnhancement),
  };

  const html = buildReportHTML(data);
  downloadBlob(html, `Q-Dx-Report-${data.analysisId}.html`, 'text/html');
}

export function downloadReportFromHistory(record: AnalysisRecord) {
  const diseaseName = getDiseaseName(record.disease);
  const riskFactors = [
    { name: 'Blood Pressure', contribution: 82 },
    { name: 'BMI', contribution: 61 },
    { name: 'Age', contribution: 48 },
    { name: 'Glucose', contribution: 42 },
    { name: 'Cholesterol', contribution: 38 },
  ];

  const data: ReportData = {
    analysisId: record.id,
    date: record.date,
    disease: diseaseName,
    riskScore: record.riskScore,
    riskLevel: record.riskLevel,
    model: record.model,
    confidence: 91,
    quantumEnhancement: 87,
    modelAgreement: 93,
    riskFactors,
    insights: buildInsights(record.riskScore, diseaseName, 87),
  };

  const html = buildReportHTML(data);
  downloadBlob(html, `Q-Dx-Report-${record.id}.html`, 'text/html');
}

export function downloadVisualization() {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#030712"/><stop offset="100%" stop-color="#0a0f1e"/></linearGradient>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#22d3ee"/><stop offset="100%" stop-color="#a78bfa"/></linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)" rx="20"/>
  <text x="400" y="50" text-anchor="middle" font-family="Inter,sans-serif" font-size="28" font-weight="800" fill="url(#acc)">Q-Dx Visualization</text>
  <text x="400" y="80" text-anchor="middle" font-family="Inter,sans-serif" font-size="14" fill="#94a3b8">Hybrid Quantum ML Analysis — Visualization Export</text>
  <circle cx="400" cy="320" r="120" fill="none" stroke="#22d3ee" stroke-width="2" stroke-dasharray="4 8" opacity="0.3"/>
  <circle cx="400" cy="320" r="90" fill="none" stroke="#a78bfa" stroke-width="2" stroke-dasharray="2 6" opacity="0.3"/>
  <circle cx="400" cy="320" r="60" fill="none" stroke="#f472b6" stroke-width="1" opacity="0.3"/>
  <circle cx="400" cy="320" r="40" fill="rgba(34,211,238,0.1)" stroke="#22d3ee" stroke-width="1.5"/>
  <text x="400" y="325" text-anchor="middle" font-family="monospace" font-size="20" font-weight="700" fill="#22d3ee">Q-Dx</text>
  <text x="400" y="560" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" fill="#64748b">Generated by Q-Dx Hybrid Quantum ML Platform — ${formatDate()}</text>
  <text x="400" y="580" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="#64748b">For research and educational demonstration only. Not a medical diagnosis.</text>
</svg>`;

  downloadBlob(svgContent, `Q-Dx-Visualization-${Date.now()}.svg`, 'image/svg+xml');
}

export function downloadTextSummary(record: AnalysisRecord) {
  const diseaseName = getDiseaseName(record.disease);
  const content = `Q-Dx HYBRID QUANTUM ML PLATFORM
Analysis Summary Report
========================================

Analysis ID:    ${record.id}
Date:           ${record.date}
Disease:        ${diseaseName}
Risk Score:     ${record.riskScore}%
Risk Level:     ${record.riskLevel}
Model Used:     ${record.model}

KEY INSIGHTS
----------------------------------------
1. Hybrid quantum-classical ensemble achieved 87% quantum enhancement.
2. Quantum kernel estimation used 3 qubits, circuit depth 7, 1024 shots.
3. Model agreement across 5 classifiers: 93%.
4. Top risk factor identified with significant influence.

TOP RISK FACTORS
----------------------------------------
Blood Pressure:  82%
BMI:             61%
Age:             48%
Glucose:         42%
Cholesterol:     38%

ML MODEL COMPARISON
----------------------------------------
Random Forest:   92% accuracy, 91% F1
SVM:             89% accuracy, 87% F1
XGBoost:         94% accuracy, 93% F1
Neural Network:  93% accuracy, 93% F1
QSVM (Quantum):  95% accuracy, 95% F1

DISCLAIMER
----------------------------------------
For research and educational demonstration only.
Not a medical diagnosis. Predictions are simulated.

========================================
Quantum Intelligence. Earlier Insights. Smarter Healthcare.
Generated: ${formatDate()}
`;

  downloadBlob(content, `Q-Dx-Summary-${record.id}.txt`, 'text/plain');
}
