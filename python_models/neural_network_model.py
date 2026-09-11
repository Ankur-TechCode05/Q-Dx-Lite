# Q-Dx Neural Network Classifier
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
    """MLP with configurable hidden layers, dropout, and batch norm."""

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
        """Train with Adam optimizer and early stopping."""
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
        """Predict class labels."""
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
