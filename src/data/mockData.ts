import type { MLModel, DatasetInfo, AnalysisRecord } from '@/types';

export const mlModels: MLModel[] = [
  {
    name: 'Random Forest',
    shortName: 'RF',
    accuracy: 92,
    precision: 91,
    recall: 90,
    f1: 91,
    status: 'Active',
    type: 'Classical',
    description: 'Ensemble of decision trees using bagging for robust classification.',
  },
  {
    name: 'Support Vector Machine',
    shortName: 'SVM',
    accuracy: 89,
    precision: 88,
    recall: 87,
    f1: 87,
    status: 'Active',
    type: 'Classical',
    description: 'Maximum-margin classifier with RBF kernel for non-linear boundaries.',
  },
  {
    name: 'Logistic Regression',
    shortName: 'LR',
    accuracy: 85,
    precision: 84,
    recall: 83,
    f1: 83,
    status: 'Standby',
    type: 'Classical',
    description: 'Linear model for binary classification with interpretable coefficients.',
  },
  {
    name: 'XGBoost',
    shortName: 'XGB',
    accuracy: 94,
    precision: 93,
    recall: 92,
    f1: 93,
    status: 'Active',
    type: 'Classical',
    description: 'Gradient-boosted trees with regularization for high-performance prediction.',
  },
  {
    name: 'Neural Network',
    shortName: 'NN',
    accuracy: 93,
    precision: 92,
    recall: 94,
    f1: 93,
    status: 'Active',
    type: 'Classical',
    description: 'Multi-layer perceptron with dropout and batch normalization.',
  },
  {
    name: 'Quantum Support Vector Machine',
    shortName: 'QSVM',
    accuracy: 95,
    precision: 94,
    recall: 96,
    f1: 95,
    status: 'Active',
    type: 'Quantum',
    description: 'Quantum kernel estimation with feature map on simulated qubits.',
  },
];

export const datasets: DatasetInfo[] = [
  {
    name: 'Breast Cancer Wisconsin',
    type: 'Classification',
    samples: '569',
    features: '30',
    target: 'Diagnosis (Malignant / Benign)',
    quality: 96,
    usage: 'Training & Validation',
    description: 'Diagnostic Wisconsin Breast Cancer Database with 30 numeric features computed from digitized images of fine needle aspirates.',
    classDistribution: [
      { name: 'Benign', value: 357, color: '#34d399' },
      { name: 'Malignant', value: 212, color: '#f87171' },
    ],
    featureStats: [
      { name: 'Radius Mean', min: 6.98, max: 28.11, mean: 14.13 },
      { name: 'Texture Mean', min: 9.71, max: 39.28, mean: 19.29 },
      { name: 'Perimeter Mean', min: 43.79, max: 188.5, mean: 91.97 },
      { name: 'Area Mean', min: 143.5, max: 2501, mean: 654.9 },
      { name: 'Smoothness', min: 0.05, max: 0.16, mean: 0.10 },
    ],
  },
  {
    name: 'Hypertension Clinical',
    type: 'Risk Classification',
    samples: '4,240',
    features: '12 Clinical Parameters',
    target: 'Hypertension Risk Score',
    quality: 92,
    usage: 'Training & Testing',
    description: 'Clinical dataset with patient vitals, lifestyle factors, and family history for cardiovascular risk assessment.',
    classDistribution: [
      { name: 'Low Risk', value: 1696, color: '#34d399' },
      { name: 'Moderate', value: 1272, color: '#fbbf24' },
      { name: 'High Risk', value: 848, color: '#f87171' },
      { name: 'Very High', value: 424, color: '#dc2626' },
    ],
    featureStats: [
      { name: 'Systolic BP', min: 90, max: 200, mean: 128 },
      { name: 'Diastolic BP', min: 60, max: 120, mean: 82 },
      { name: 'BMI', min: 18, max: 45, mean: 26.5 },
      { name: 'Heart Rate', min: 50, max: 120, mean: 75 },
      { name: 'Glucose', min: 70, max: 200, mean: 105 },
    ],
  },
  {
    name: 'Skin Lesion Dermatology',
    type: 'Risk Classification',
    samples: '10,015',
    features: 'Lesion Characteristics',
    target: 'Lesion Risk Category',
    quality: 89,
    usage: 'Training & Validation',
    description: 'Dermatological lesion dataset with visual and clinical features for skin cancer risk screening.',
    classDistribution: [
      { name: 'Low Risk', value: 5008, color: '#34d399' },
      { name: 'Moderate', value: 3004, color: '#fbbf24' },
      { name: 'High Risk', value: 1502, color: '#f87171' },
      { name: 'Very High', value: 501, color: '#dc2626' },
    ],
    featureStats: [
      { name: 'Lesion Size', min: 2, max: 50, mean: 15 },
      { name: 'Asymmetry', min: 0, max: 1, mean: 0.4 },
      { name: 'Border Irreg.', min: 0, max: 1, mean: 0.35 },
      { name: 'Color Variance', min: 1, max: 6, mean: 3.2 },
      { name: 'Diameter', min: 1, max: 30, mean: 8.5 },
    ],
  },
];

export const analysisHistory: AnalysisRecord[] = [
  { id: 'QDX-2026-0910-001', date: '2026-09-10 14:32', disease: 'Hypertension', riskScore: 72, riskLevel: 'High Risk', model: 'QSVM', status: 'Completed' },
  { id: 'QDX-2026-0910-002', date: '2026-09-10 13:15', disease: 'Breast Cancer', riskScore: 28, riskLevel: 'Low Risk', model: 'XGBoost', status: 'Completed' },
  { id: 'QDX-2026-0909-003', date: '2026-09-09 16:45', disease: 'Skin Cancer', riskScore: 55, riskLevel: 'Moderate Risk', model: 'Neural Network', status: 'Completed' },
  { id: 'QDX-2026-0909-004', date: '2026-09-09 11:20', disease: 'Hypertension', riskScore: 18, riskLevel: 'Low Risk', model: 'Random Forest', status: 'Completed' },
  { id: 'QDX-2026-0908-005', date: '2026-09-08 09:10', disease: 'Breast Cancer', riskScore: 85, riskLevel: 'Very High Risk', model: 'QSVM', status: 'Completed' },
  { id: 'QDX-2026-0908-006', date: '2026-09-08 08:05', disease: 'Skin Cancer', riskScore: 42, riskLevel: 'Moderate Risk', model: 'SVM', status: 'Completed' },
];

export const predictionTrends = [
  { month: 'Apr', low: 120, moderate: 80, high: 50, veryHigh: 20 },
  { month: 'May', low: 140, moderate: 90, high: 45, veryHigh: 25 },
  { month: 'Jun', low: 155, moderate: 85, high: 60, veryHigh: 30 },
  { month: 'Jul', low: 170, moderate: 100, high: 55, veryHigh: 35 },
  { month: 'Aug', low: 185, moderate: 110, high: 70, veryHigh: 40 },
  { month: 'Sep', low: 200, moderate: 120, high: 80, veryHigh: 45 },
];

export const featureImportanceData = [
  { feature: 'Blood Pressure', importance: 82 },
  { feature: 'BMI', importance: 61 },
  { feature: 'Age', importance: 48 },
  { feature: 'Glucose', importance: 42 },
  { feature: 'Cholesterol', importance: 38 },
  { feature: 'Heart Rate', importance: 31 },
  { feature: 'Smoking', importance: 27 },
  { feature: 'Family History', importance: 24 },
];

export const riskDistribution = [
  { name: 'Low Risk', value: 35, color: '#34d399' },
  { name: 'Moderate Risk', value: 30, color: '#fbbf24' },
  { name: 'High Risk', value: 25, color: '#f87171' },
  { name: 'Very High Risk', value: 10, color: '#dc2626' },
];

export const diseaseDistribution = [
  { name: 'Hypertension', value: 45, color: '#22d3ee' },
  { name: 'Breast Cancer', value: 30, color: '#a78bfa' },
  { name: 'Skin Cancer', value: 25, color: '#f472b6' },
];

export const processingSteps = [
  'Data Preprocessing',
  'Feature Engineering',
  'Classical ML',
  'Quantum Feature Mapping',
  'Quantum ML Simulation',
  'Ensemble Prediction',
  'Risk Score',
];

export const quantumPipeline = [
  'Classical Data',
  'Feature Map',
  'Quantum Circuit',
  'Quantum Kernel',
  'Classifier',
  'Risk Prediction',
];

export const pythonModelFiles = [
  {
    name: 'qsvm_model.py',
    model: 'QSVM',
    type: 'Quantum',
    language: 'python',
    description: 'Quantum Support Vector Machine with feature map and kernel estimation',
    code: `# Q-Dx Quantum Support Vector Machine (QSVM)
# Hybrid quantum-classical kernel estimation pipeline
# Version: 2.0.0

import numpy as np
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix
from qiskit import QuantumCircuit
from qiskit.circuit.library import ZZFeatureMap
from qiskit_machine_learning.kernels import QuantumKernel

class QSVMModel:
    \"\"\"Quantum SVM using ZZFeatureMap for quantum kernel estimation.\"\"\"

    def __init__(self, n_qubits=3, reps=2, shots=1024):
        self.n_qubits = n_qubits
        self.reps = reps
        self.shots = shots
        self.feature_map = ZZFeatureMap(
            feature_dimension=n_qubits,
            reps=reps,
            entanglement='linear'
        )
        self.quantum_kernel = QuantumKernel(
            feature_map=self.feature_map,
            quantum_instance=None
        )
        self.classical_svm = SVC(kernel='precomputed')
        self.scaler = StandardScaler()

    def fit(self, X_train, y_train):
        \"\"\"Train QSVM on quantum-computed kernel matrix.\"\"\"
        X_scaled = self.scaler.fit_transform(X_train)
        kernel_matrix = self.quantum_kernel.evaluate(X_scaled)
        self.classical_svm.fit(kernel_matrix, y_train)
        return self

    def predict(self, X_test):
        \"\"\"Predict using quantum kernel.\"\"\"
        X_scaled = self.scaler.transform(X_test)
        kernel_matrix = self.quantum_kernel.evaluate(X_scaled)
        return self.classical_svm.predict(kernel_matrix)

    def evaluate(self, X_test, y_test):
        \"\"\"Return accuracy, confusion matrix, and predictions.\"\"\"
        y_pred = self.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        cm = confusion_matrix(y_test, y_pred)
        return {'accuracy': acc, 'confusion_matrix': cm}

    def get_circuit_depth(self):
        \"\"\"Return quantum circuit depth.\"\"\"
        return self.feature_map.decompose().depth()

    def get_qubit_count(self):
        return self.n_qubits

# Usage
if __name__ == '__main__':
    model = QSVMModel(n_qubits=3, reps=2, shots=1024)
    print(f"Circuit depth: {model.get_circuit_depth()}")
    print(f"Qubits: {model.get_qubit_count()}")
    print("QSVM model initialized successfully.")
`,
  },
  {
    name: 'xgboost_model.py',
    model: 'XGBoost',
    type: 'Classical',
    language: 'python',
    description: 'Gradient-boosted decision trees with regularization',
    code: `# Q-Dx XGBoost Classifier
# Gradient-boosted trees with L1/L2 regularization
# Version: 2.0.0

import numpy as np
import xgboost as xgb
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import cross_val_score

class XGBoostModel:
    \"\"\"XGBoost classifier with tuned hyperparameters.\"\"\"

    def __init__(self, n_estimators=200, max_depth=6, learning_rate=0.1):
        self.params = {
            'objective': 'binary:logistic',
            'n_estimators': n_estimators,
            'max_depth': max_depth,
            'learning_rate': learning_rate,
            'subsample': 0.8,
            'colsample_bytree': 0.8,
            'reg_alpha': 0.1,
            'reg_lambda': 1.0,
            'random_state': 42,
            'eval_metric': 'logloss'
        }
        self.model = xgb.XGBClassifier(**self.params)
        self.scaler = StandardScaler()
        self.encoder = LabelEncoder()

    def fit(self, X_train, y_train):
        \"\"\"Train XGBoost on scaled features.\"\"\"
        X_scaled = self.scaler.fit_transform(X_train)
        y_encoded = self.encoder.fit_transform(y_train)
        self.model.fit(X_scaled, y_encoded)
        return self

    def predict(self, X_test):
        \"\"\"Predict class labels.\"\"\"
        X_scaled = self.scaler.transform(X_test)
        return self.encoder.inverse_transform(self.model.predict(X_scaled))

    def predict_proba(self, X_test):
        \"\"\"Return probability estimates.\"\"\"
        X_scaled = self.scaler.transform(X_test)
        return self.model.predict_proba(X_scaled)

    def evaluate(self, X_test, y_test):
        y_pred = self.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        cm = confusion_matrix(y_test, y_pred)
        return {'accuracy': acc, 'confusion_matrix': cm}

    def feature_importance(self):
        \"\"\"Return feature importance scores.\"\"\"
        return self.model.feature_importances_

# Usage
if __name__ == '__main__':
    model = XGBoostModel(n_estimators=200, max_depth=6)
    print("XGBoost model initialized with regularization.")
    print(f"Parameters: {model.params}")
`,
  },
  {
    name: 'neural_network_model.py',
    model: 'Neural Network',
    type: 'Classical',
    language: 'python',
    description: 'Multi-layer perceptron with dropout and batch normalization',
    code: `# Q-Dx Neural Network Classifier
# Multi-layer perceptron with dropout, batch norm, and early stopping
# Version: 2.0.0

import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix

class NeuralNetworkModel(nn.Module):
    \"\"\"MLP with configurable hidden layers, dropout, and batch norm.\"\"\"

    def __init__(self, input_dim=12, hidden_dims=[256, 128, 64],
                 dropout=0.3, num_classes=4):
        super().__init__()
        layers = []
        prev = input_dim
        for h in hidden_dims:
            layers.extend([
                nn.Linear(prev, h),
                nn.BatchNorm1d(h),
                nn.ReLU(),
                nn.Dropout(dropout)
            ])
            prev = h
        layers.append(nn.Linear(prev, num_classes))
        self.network = nn.Sequential(*layers)
        self.scaler = StandardScaler()

    def forward(self, x):
        return self.network(x)

    def fit(self, X_train, y_train, epochs=100, batch_size=32, lr=0.001):
        \"\"\"Train with Adam optimizer and early stopping.\"\"\"
        X_scaled = self.scaler.fit_transform(X_train)
        X_tensor = torch.FloatTensor(X_scaled)
        y_tensor = torch.LongTensor(y_train)
        dataset = TensorDataset(X_tensor, y_tensor)
        loader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

        criterion = nn.CrossEntropyLoss()
        optimizer = optim.Adam(self.parameters(), lr=lr, weight_decay=1e-4)
        scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, patience=10)

        self.train()
        for epoch in range(epochs):
            total_loss = 0
            for batch_X, batch_y in loader:
                optimizer.zero_grad()
                output = self(batch_X)
                loss = criterion(output, batch_y)
                loss.backward()
                optimizer.step()
                total_loss += loss.item()
            scheduler.step(total_loss / len(loader))

    def predict(self, X_test):
        \"\"\"Predict class labels.\"\"\"
        self.eval()
        X_scaled = self.scaler.transform(X_test)
        with torch.no_grad():
            output = self(torch.FloatTensor(X_scaled))
            return torch.argmax(output, dim=1).numpy()

    def evaluate(self, X_test, y_test):
        y_pred = self.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        cm = confusion_matrix(y_test, y_pred)
        return {'accuracy': acc, 'confusion_matrix': cm}

# Usage
if __name__ == '__main__':
    model = NeuralNetworkModel(input_dim=12, hidden_dims=[256, 128, 64])
    print(f"Architecture: {model.network}")
    print("Neural network model initialized.")
`,
  },
  {
    name: 'random_forest_model.py',
    model: 'Random Forest',
    type: 'Classical',
    language: 'python',
    description: 'Ensemble of decision trees with bagging and feature importance',
    code: `# Q-Dx Random Forest Classifier
# Ensemble of decision trees with bagging and Gini importance
# Version: 2.0.0

import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import cross_val_score, StratifiedKFold

class RandomForestModel:
    \"\"\"Random Forest with tuned hyperparameters.\"\"\"

    def __init__(self, n_estimators=300, max_depth=12,
                 min_samples_split=5, min_samples_leaf=2,
                 max_features='sqrt', class_weight='balanced'):
        self.params = {
            'n_estimators': n_estimators,
            'max_depth': max_depth,
            'min_samples_split': min_samples_split,
            'min_samples_leaf': min_samples_leaf,
            'max_features': max_features,
            'class_weight': class_weight,
            'random_state': 42,
            'n_jobs': -1
        }
        self.model = RandomForestClassifier(**self.params)
        self.scaler = StandardScaler()

    def fit(self, X_train, y_train):
        \"\"\"Train Random Forest on scaled features.\"\"\"
        X_scaled = self.scaler.fit_transform(X_train)
        self.model.fit(X_scaled, y_train)
        return self

    def predict(self, X_test):
        \"\"\"Predict class labels.\"\"\"
        X_scaled = self.scaler.transform(X_test)
        return self.model.predict(X_scaled)

    def predict_proba(self, X_test):
        \"\"\"Return probability estimates.\"\"\"
        X_scaled = self.scaler.transform(X_test)
        return self.model.predict_proba(X_scaled)

    def evaluate(self, X_test, y_test):
        y_pred = self.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        cm = confusion_matrix(y_test, y_pred)
        return {'accuracy': acc, 'confusion_matrix': cm}

    def feature_importance(self):
        \"\"\"Return Gini-based feature importance.\"\"\"
        return self.model.feature_importances_

    def cross_validate(self, X, y, cv=5):
        \"\"\"Stratified K-fold cross-validation.\"\"\"
        X_scaled = self.scaler.fit_transform(X)
        skf = StratifiedKFold(n_splits=cv, shuffle=True, random_state=42)
        scores = cross_val_score(self.model, X_scaled, y, cv=skf, scoring='f1_weighted')
        return {'mean': scores.mean(), 'std': scores.std()}

# Usage
if __name__ == '__main__':
    model = RandomForestModel(n_estimators=300, max_depth=12)
    print("Random Forest model initialized.")
    print(f"Parameters: {model.params}")
`,
  },
];

export const confusionMatrixData: Record<string, { trueLabel: string; predicted: number[][]; labels: string[] }> = {
  QSVM: {
    trueLabel: 'Actual',
    labels: ['Low', 'Moderate', 'High', 'Very High'],
    predicted: [
      [168, 8, 2, 0],
      [6, 142, 10, 2],
      [1, 8, 75, 5],
      [0, 1, 4, 38],
    ],
  },
  XGBoost: {
    trueLabel: 'Actual',
    labels: ['Low', 'Moderate', 'High', 'Very High'],
    predicted: [
      [165, 10, 3, 0],
      [8, 138, 12, 2],
      [2, 10, 72, 5],
      [0, 2, 5, 36],
    ],
  },
  'Neural Network': {
    trueLabel: 'Actual',
    labels: ['Low', 'Moderate', 'High', 'Very High'],
    predicted: [
      [163, 11, 4, 0],
      [9, 136, 13, 2],
      [2, 11, 71, 5],
      [0, 2, 6, 35],
    ],
  },
  'Random Forest': {
    trueLabel: 'Actual',
    labels: ['Low', 'Moderate', 'High', 'Very High'],
    predicted: [
      [160, 12, 5, 1],
      [10, 132, 14, 4],
      [3, 12, 69, 5],
      [1, 3, 6, 33],
    ],
  },
};

export const modelDistributionData = [
  {
    model: 'QSVM',
    distribution: [
      { class: 'Low Risk', count: 178, color: '#34d399' },
      { class: 'Moderate', count: 160, color: '#fbbf24' },
      { class: 'High Risk', count: 89, color: '#f87171' },
      { class: 'Very High', count: 43, color: '#dc2626' },
    ],
  },
  {
    model: 'XGBoost',
    distribution: [
      { class: 'Low Risk', count: 175, color: '#34d399' },
      { class: 'Moderate', count: 155, color: '#fbbf24' },
      { class: 'High Risk', count: 84, color: '#f87171' },
      { class: 'Very High', count: 38, color: '#dc2626' },
    ],
  },
  {
    model: 'Neural Network',
    distribution: [
      { class: 'Low Risk', count: 172, color: '#34d399' },
      { class: 'Moderate', count: 152, color: '#fbbf24' },
      { class: 'High Risk', count: 82, color: '#f87171' },
      { class: 'Very High', count: 35, color: '#dc2626' },
    ],
  },
  {
    model: 'Random Forest',
    distribution: [
      { class: 'Low Risk', count: 170, color: '#34d399' },
      { class: 'Moderate', count: 148, color: '#fbbf24' },
      { class: 'High Risk', count: 78, color: '#f87171' },
      { class: 'Very High', count: 32, color: '#dc2626' },
    ],
  },
];

export const rocCurveData = [
  { fpr: 0.0, tpr_qsvm: 0.0, tpr_xgb: 0.0, tpr_nn: 0.0, tpr_rf: 0.0 },
  { fpr: 0.02, tpr_qsvm: 0.15, tpr_xgb: 0.14, tpr_nn: 0.13, tpr_rf: 0.12 },
  { fpr: 0.05, tpr_qsvm: 0.35, tpr_xgb: 0.33, tpr_nn: 0.31, tpr_rf: 0.29 },
  { fpr: 0.08, tpr_qsvm: 0.55, tpr_xgb: 0.53, tpr_nn: 0.50, tpr_rf: 0.47 },
  { fpr: 0.12, tpr_qsvm: 0.72, tpr_xgb: 0.70, tpr_nn: 0.67, tpr_rf: 0.64 },
  { fpr: 0.16, tpr_qsvm: 0.85, tpr_xgb: 0.83, tpr_nn: 0.80, tpr_rf: 0.77 },
  { fpr: 0.20, tpr_qsvm: 0.92, tpr_xgb: 0.90, tpr_nn: 0.88, tpr_rf: 0.85 },
  { fpr: 0.25, tpr_qsvm: 0.96, tpr_xgb: 0.94, tpr_nn: 0.92, tpr_rf: 0.89 },
  { fpr: 0.32, tpr_qsvm: 0.98, tpr_xgb: 0.97, tpr_nn: 0.95, tpr_rf: 0.93 },
  { fpr: 0.40, tpr_qsvm: 0.99, tpr_xgb: 0.98, tpr_nn: 0.97, tpr_rf: 0.95 },
  { fpr: 0.50, tpr_qsvm: 1.0, tpr_xgb: 0.99, tpr_nn: 0.98, tpr_rf: 0.97 },
  { fpr: 1.0, tpr_qsvm: 1.0, tpr_xgb: 1.0, tpr_nn: 1.0, tpr_rf: 1.0 },
];

export const modelMetricsMatrix: { model: string; metrics: { label: string; value: number; max: number; color: string }[] }[] = [
  {
    model: 'QSVM',
    metrics: [
      { label: 'Accuracy', value: 95, max: 100, color: '#a78bfa' },
      { label: 'Precision', value: 94, max: 100, color: '#a78bfa' },
      { label: 'Recall', value: 96, max: 100, color: '#a78bfa' },
      { label: 'F1 Score', value: 95, max: 100, color: '#a78bfa' },
      { label: 'AUC-ROC', value: 97, max: 100, color: '#a78bfa' },
      { label: 'Specificity', value: 93, max: 100, color: '#a78bfa' },
    ],
  },
  {
    model: 'XGBoost',
    metrics: [
      { label: 'Accuracy', value: 94, max: 100, color: '#22d3ee' },
      { label: 'Precision', value: 93, max: 100, color: '#22d3ee' },
      { label: 'Recall', value: 92, max: 100, color: '#22d3ee' },
      { label: 'F1 Score', value: 93, max: 100, color: '#22d3ee' },
      { label: 'AUC-ROC', value: 96, max: 100, color: '#22d3ee' },
      { label: 'Specificity', value: 91, max: 100, color: '#22d3ee' },
    ],
  },
  {
    model: 'Neural Network',
    metrics: [
      { label: 'Accuracy', value: 93, max: 100, color: '#f472b6' },
      { label: 'Precision', value: 92, max: 100, color: '#f472b6' },
      { label: 'Recall', value: 94, max: 100, color: '#f472b6' },
      { label: 'F1 Score', value: 93, max: 100, color: '#f472b6' },
      { label: 'AUC-ROC', value: 95, max: 100, color: '#f472b6' },
      { label: 'Specificity', value: 90, max: 100, color: '#f472b6' },
    ],
  },
  {
    model: 'Random Forest',
    metrics: [
      { label: 'Accuracy', value: 92, max: 100, color: '#34d399' },
      { label: 'Precision', value: 91, max: 100, color: '#34d399' },
      { label: 'Recall', value: 90, max: 100, color: '#34d399' },
      { label: 'F1 Score', value: 91, max: 100, color: '#34d399' },
      { label: 'AUC-ROC', value: 94, max: 100, color: '#34d399' },
      { label: 'Specificity', value: 89, max: 100, color: '#34d399' },
    ],
  },
];

export const architectureFlow = [
  { label: 'User Input / Medical Report', desc: 'Patient data or uploaded medical reports enter the system for analysis.' },
  { label: 'Data Collection', desc: 'Raw data is collected and standardized into a unified format.' },
  { label: 'Data Preprocessing', desc: 'Missing values imputed, data normalized, and outliers handled.' },
  { label: 'Feature Extraction', desc: 'Relevant features are extracted from raw data using domain-specific techniques.' },
  { label: 'Feature Selection', desc: 'Optimal feature subset selected via mutual information and recursive elimination.' },
  { label: 'Classical Machine Learning', desc: 'Multiple classical ML models (RF, SVM, XGBoost, NN) are trained on the feature set.' },
  { label: 'Quantum Feature Encoding', desc: 'Selected features are encoded into quantum states using amplitude encoding.' },
  { label: 'Quantum Circuit', desc: 'Parameterized quantum circuit processes encoded features with entanglement.' },
  { label: 'Hybrid Classifier', desc: 'Classical and quantum predictions are combined in an ensemble classifier.' },
  { label: 'Risk Prediction', desc: 'Final risk score and classification are computed from the ensemble output.' },
  { label: 'Explainable Results', desc: 'Feature importance and model agreement provide explainable AI insights.' },
  { label: 'Generated Report', desc: 'A comprehensive visual report is generated for the clinician.' },
];
