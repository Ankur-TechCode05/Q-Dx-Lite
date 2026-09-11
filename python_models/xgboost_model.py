# Q-Dx XGBoost Classifier
# Gradient-boosted trees with L1/L2 regularization
# Version: 2.0.0

import numpy as np
import xgboost as xgb
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import cross_val_score

class XGBoostModel:
    """XGBoost classifier with tuned hyperparameters."""

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
        """Train XGBoost on scaled features."""
        X_scaled = self.scaler.fit_transform(X_train)
        y_encoded = self.encoder.fit_transform(y_train)
        self.model.fit(X_scaled, y_encoded)
        return self

    def predict(self, X_test):
        """Predict class labels."""
        X_scaled = self.scaler.transform(X_test)
        return self.encoder.inverse_transform(self.model.predict(X_scaled))

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
        """Return feature importance scores."""
        return self.model.feature_importances_

# Usage
if __name__ == '__main__':
    model = XGBoostModel(n_estimators=200, max_depth=6)
    print("XGBoost model initialized with regularization.")
    print(f"Parameters: {model.params}")
