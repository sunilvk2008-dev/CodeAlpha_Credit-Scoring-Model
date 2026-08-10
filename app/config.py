from pathlib import Path

# Base project directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Dataset path
DATASET_PATH = BASE_DIR / "dataset" / "credit_data.csv"

# Model directory
MODEL_DIR = BASE_DIR / "model"

# Saved ML model
MODEL_PATH = MODEL_DIR / "credit_model.pkl"

# Saved scaler
SCALER_PATH = MODEL_DIR / "scaler.pkl"

# Evaluation metrics
METRICS_PATH = MODEL_DIR / "metrics.json"

# Random seed for reproducibility
RANDOM_STATE = 42

# Test split ratio
TEST_SIZE = 0.2

# API Information
API_TITLE = "Credit Scoring Prediction API"
API_VERSION = "1.0.0"
API_DESCRIPTION = (
    "Machine Learning API for predicting whether a customer is "
    "creditworthy based on financial information."
)