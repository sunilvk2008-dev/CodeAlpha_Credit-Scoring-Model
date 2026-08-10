import json
import joblib
import numpy as np
from pathlib import Path

from app.config import MODEL_PATH, SCALER_PATH, METRICS_PATH


# -----------------------------
# Load Trained Model and Scaler
# -----------------------------
try:
    model = joblib.load(MODEL_PATH)
except Exception:
    model = None

try:
    scaler = joblib.load(SCALER_PATH)
except Exception:
    scaler = None


# -----------------------------
# Prediction Function
# -----------------------------
def predict_credit(data):
    """
    Predict whether a customer is Creditworthy or Not Creditworthy.
    """

    if model is None:
        raise Exception("Model not found. Please train the model first.")

    if scaler is None:
        raise Exception("Scaler not found. Please train the model first.")

    features = np.array([
        [
            data.age,
            data.income,
            data.loan_amount,
            data.loan_term,
            data.credit_history,
            data.debt_to_income,
            data.employment_years
        ]
    ])

    # Scale the input
    scaled_features = scaler.transform(features)

    # Prediction & Probability for Class 1 (Creditworthy)
    prediction = model.predict(scaled_features)[0]
    prob_creditworthy = float(model.predict_proba(scaled_features)[0][1])

    if prediction == 1:
        result = "Creditworthy"
    else:
        result = "Not Creditworthy"

    return result, round(prob_creditworthy, 4)


# -----------------------------
# Model Information
# -----------------------------
def get_model_info():

    if model is None:
        return {
            "status": "Model not loaded"
        }

    return {
        "model_name": type(model).__name__,
        "status": "Loaded Successfully",
        "features": [
            "age",
            "income",
            "loan_amount",
            "loan_term",
            "credit_history",
            "debt_to_income",
            "employment_years"
        ]
    }


# -----------------------------
# Evaluation Metrics
# -----------------------------
def get_metrics():

    if not Path(METRICS_PATH).exists():
        return {
            "message": "Metrics file not found."
        }

    with open(METRICS_PATH, "r") as file:
        metrics = json.load(file)

    return metrics