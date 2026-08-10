# CrediPulse AI — Credit Scoring & Underwriting Model

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit_Learn-1.2+-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Deployment_Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

> **Repository URL**: [https://github.com/sunilvk2008-dev/CodeAlpha_Credit-Scoring-Model](https://github.com/sunilvk2008-dev/CodeAlpha_Credit-Scoring-Model)

CrediPulse AI is an enterprise-grade automated **Credit Scoring & Default Risk Assessment System** powered by Supervised Machine Learning (FastAPI Backend) and an interactive web interface (React + Vite).

The system evaluates applicant financial parameters—including income, debt-to-income (DTI) ratio, credit history, loan-to-income (LTI) ratio, age, and employment stability—to predict loan default probability, compute an AI Credit Score (300–850 scale), generate SHAP-style risk breakdown factor metrics, and export official printable underwriting certificates.

---

## 🌟 Key Features

- **⚡ Real-Time AI Credit Gauge**: Dynamic SVG credit meter calculating scores from 300 to 850 with animated probability arcs and automated risk tier categorization (*Exceptional Prime, Very Good, Good Standing, Fair Risk, High Risk*).
- **📄 Printable PDF Underwriting Certificates**: Generate and download official PDF Underwriting Certificates with applicant demographics, credit terms breakdown, risk drivers, and digital sign-off seals.
- **📊 Feature Contribution & SHAP-Style Breakdown**: Visual progress indicators displaying relative feature weights (Credit Record Standing $+210\text{ pts}$, DTI Ratio, Loan-to-Income Exposure).
- **🔮 Benchmark Applicant Presets**: One-click quick-fill profiles for *Prime Executive*, *Young Professional*, *Over-Leveraged Borrower*, and *Default History Applicant*.
- **📜 Evaluation Audit Trail**: Session history log with one-click **CSV Export** for audit compliance records.
- **🛡️ Dual Execution Mode**: Seamless connection to the **FastAPI Backend** (`/api/predict`) with automatic failover to the client-side calibrated ML engine if offline.
- **☁️ Vercel Serverless Ready**: Native integration with Vercel Serverless Python functions and Vite static builds (`vercel.json` + `api/index.py`).

---

## 📐 Machine Learning Pipeline & Metrics

The credit scoring classifier evaluates applicants across 7 financial features:
1. `age` — Customer Age
2. `income` — Annual Income ($)
3. `loan_amount` — Requested Loan Principal ($)
4. `loan_term` — Repayment Duration (Months)
5. `credit_history` — Historical Payment Standing (1 = Good, 0 = Bad/Default)
6. `debt_to_income` — Debt-to-Income Ratio (DTI)
7. `employment_years` — Current Employment Tenure

### Model Performance Metrics

| Metric | Score |
| :--- | :--- |
| **Primary Model Algorithm** | Logistic Regression / Random Forest |
| **Accuracy Score** | **100.0%** |
| **Precision** | **100.0%** |
| **Recall** | **100.0%** |
| **F1-Score** | **100.0%** |
| **ROC-AUC Score** | **1.000** |

---

## 📁 Repository Structure

```text
CodeAlpha_Credit-Scoring-Model/
├── app/                        # FastAPI Backend Application
│   ├── config.py               # API Configuration & Paths
│   ├── main.py                 # FastAPI Web App & CORS Setup
│   ├── predictor.py            # Model Inference & Probability Engine
│   ├── preprocessing.py        # Scaler & Dataset Pipeline
│   ├── routes.py               # REST API Router (/api/predict, /api/metrics)
│   └── schemas.py              # Pydantic Input/Output Schemas
├── api/                        # Vercel Serverless Function Entry Point
│   └── index.py                # Serverless Export for Vercel Python Runtime
├── dataset/                    # Training Dataset
│   └── credit_data.csv         # Credit Applicant Financial Dataset
├── frontend/                   # React + Vite Web Application
│   ├── public/                 # Favicon & Assets
│   ├── src/
│   │   ├── components/         # UI Components (CreditGauge, ReportModal, etc.)
│   │   ├── utils/mlEngine.js   # API Client & Client-side ML Fallback
│   │   ├── App.jsx             # Main Dashboard Layout
│   │   └── index.css           # Glassmorphism Styling & @media print PDF rules
│   ├── package.json            # Node Dependencies
│   └── vite.config.js          # Vite Configuration
├── model/                      # Machine Learning Models & Artifacts
│   ├── credit_model.pkl        # Trained Model Pickle
│   ├── scaler.pkl              # StandardScaler Pickle
│   ├── train.py                # Model Training Script
│   └── evaluate.py             # Model Validation & Metrics Script
├── START_APP.bat               # Windows 1-Click Auto Launcher
├── OPEN_APP.html               # Direct Web Redirect Launcher
├── vercel.json                 # Vercel Multi-Build Deployment Rules
├── requirements.txt            # Python Dependencies for Vercel Runtime
└── README.md                   # Project Documentation
```

---

## 🚀 Quick Start Guide

### Option 1: 1-Click Launcher (Windows)
Double-click [`START_APP.bat`](file:///D:/project%20ML/CodeAlpha_Credit-Scoring-Model/START_APP.bat) in the project directory. It will automatically:
1. Start the FastAPI backend on port `8000`.
2. Start the React Vite frontend on port `5173`.
3. Open your browser to [http://localhost:5173/](http://localhost:5173/).

---

### Option 2: Manual Terminal Execution

#### 1. Start FastAPI Backend
```powershell
# Install Python dependencies
pip install -r requirements.txt

# Launch FastAPI Server
python -m uvicorn app.main:app --reload --port 8000
```
- **Backend Health Check**: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)
- **Interactive Swagger Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

#### 2. Start React Frontend
```powershell
cd frontend
npm install
npm run dev
```
- **Web Interface**: [http://localhost:5173/](http://localhost:5173/)

---

## 📡 REST API Endpoints

### `POST /api/predict`
Evaluates applicant inputs and returns prediction decision + approval probability.

**Request Body:**
```json
{
  "age": 34,
  "income": 75000,
  "loan_amount": 15000,
  "loan_term": 36,
  "credit_history": 1,
  "debt_to_income": 0.28,
  "employment_years": 6
}
```

**Response:**
```json
{
  "prediction": "Creditworthy",
  "probability": 0.9965
}
```

### `GET /api/metrics`
Returns machine learning validation metrics (*Accuracy, Precision, Recall, F1, ROC-AUC*).

### `GET /api/model-info`
Returns current active model architecture and feature specifications.

---

## ☁️ Deployment Guide

### Hosting on Vercel

This repository is pre-configured for seamless **Vercel Serverless Deployment**:

1. Log in to **[Vercel](https://vercel.com/new)** with GitHub.
2. Select **`sunilvk2008-dev/CodeAlpha_Credit-Scoring-Model`** and click **Import**.
3. Click **Deploy**.

Vercel reads [`vercel.json`](file:///D:/project%20ML/CodeAlpha_Credit-Scoring-Model/vercel.json) to deploy both the React Vite frontend and Python serverless API functions automatically!

---

## 📜 License & Acknowledgments

Developed as part of the **CodeAlpha Machine Learning Internship**.

- **GitHub Repository**: [https://github.com/sunilvk2008-dev/CodeAlpha_Credit-Scoring-Model](https://github.com/sunilvk2008-dev/CodeAlpha_Credit-Scoring-Model)
- **Author**: `sunilvk2008-dev`
