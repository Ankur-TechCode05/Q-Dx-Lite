# Q-Dx Random Forest Classifier
# Ensemble of decision trees with bagging and Gini importance
# Version: 2.0.0

import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import cross_val_score, StratifiedKFold

class RandomForestModel:
    """Random Forest with tuned hyperparameters."""

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
        """Train Random Forest on scaled features."""
        X_scaled = self.scaler.fit_transform(X_train)
        self.model.fit(X_scaled, y_train)
        return self

    def predict(self, X_test):
        """Predict class labels."""
        X_scaled = self.scaler.transform(X_test)
        return self.model.predict(X_scaled)

    def predict_proba(self, X_test):
        """Return probability estimates."""
        X_scaled = self.scaler.transform(X_test)
        return self.model.predict_proba(X_scaled)

    def evaluate(self, X_test, y_test):
        y_pred = self.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        cm = confusion_matrix(y_test, y_pred)
        return {'accuracy': acc, 'confusion_matrix': cm}

    def feature_importance(self):
        """Return Gini-based feature importance."""
        return self.model.feature_importances_

    def cross_validate(self, X, y, cv=5):
        """Stratified K-fold cross-validation."""
        X_scaled = self.scaler.fit_transform(X)
        skf = StratifiedKFold(n_splits=cv, shuffle=True, random_state=42)
        scores = cross_val_score(self.model, X_scaled, y, cv=skf, scoring='f1_weighted')
        return {'mean': scores.mean(), 'std': scores.std()}

# Usage
if __name__ == '__main__':
    model = RandomForestModel(n_estimators=300, max_depth=12)
    print("Random Forest model initialized.")
    print(f"Parameters: {model.params}")
