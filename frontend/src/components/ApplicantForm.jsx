import React from "react";
import {
  User,
  DollarSign,
  Briefcase,
  Calendar,
  Percent,
  Clock,
  ShieldCheck,
  Zap,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export const ApplicantForm = ({
  formData,
  setFormData,
  onEvaluate,
  isEvaluating,
  onReset,
}) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: typeof value === "string" ? parseFloat(value) || 0 : value,
    }));
  };

  // Quick Preset Handlers
  const applyQuickPreset = (presetType) => {
    if (presetType === "prime") {
      setFormData({ age: 40, income: 110000, loan_amount: 15000, loan_term: 24, credit_history: 1, debt_to_income: 0.20, employment_years: 10 });
    } else if (presetType === "risky") {
      setFormData({ age: 28, income: 35000, loan_amount: 25000, loan_term: 48, credit_history: 0, debt_to_income: 0.58, employment_years: 1 });
    } else if (presetType === "moderate") {
      setFormData({ age: 32, income: 65000, loan_amount: 12000, loan_term: 36, credit_history: 1, debt_to_income: 0.32, employment_years: 4 });
    }
  };

  // Calculations
  const annualIncome = Math.max(formData.income, 1);
  const loanAmount = formData.loan_amount;
  const ltiRatio = (loanAmount / annualIncome).toFixed(2);

  // Amortized monthly payment estimate (at ~8.5% annual interest)
  const monthlyRate = 0.085 / 12;
  const months = Math.max(formData.loan_term, 1);
  const estimatedMonthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return (
    <div className="glass-card" style={{ padding: "2rem" }}>
      <div className="form-section-header">
        <div>
          <h2 style={{ fontSize: "1.35rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <User size={24} className="text-gradient-cyan" />
            Applicant Profile & Loan Inputs
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
            Adjust credit scoring variables to recalculate risk probability.
          </p>
        </div>

        <button
          className="btn-secondary"
          onClick={onReset}
          title="Reset to default inputs"
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>

      {/* Quick Benchmark Preset Chips */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <Sparkles size={14} className="text-gradient-cyan" /> Quick Benchmarks:
        </span>
        <button
          className="btn-secondary"
          onClick={() => applyQuickPreset("prime")}
          style={{ fontSize: "0.78rem", padding: "0.3rem 0.75rem", borderRadius: "999px", background: "rgba(16, 185, 129, 0.12)", color: "var(--emerald-success)", border: "1px solid rgba(16, 185, 129, 0.3)" }}
        >
          ⚡ Prime Executive
        </button>
        <button
          className="btn-secondary"
          onClick={() => applyQuickPreset("moderate")}
          style={{ fontSize: "0.78rem", padding: "0.3rem 0.75rem", borderRadius: "999px", background: "rgba(6, 182, 212, 0.12)", color: "var(--cyan-primary)", border: "1px solid rgba(6, 182, 212, 0.3)" }}
        >
          💼 Young Professional
        </button>
        <button
          className="btn-secondary"
          onClick={() => applyQuickPreset("risky")}
          style={{ fontSize: "0.78rem", padding: "0.3rem 0.75rem", borderRadius: "999px", background: "rgba(244, 63, 94, 0.12)", color: "var(--rose-danger)", border: "1px solid rgba(244, 63, 94, 0.3)" }}
        >
          ⚠️ High Risk Profile
        </button>
      </div>

      <div className="form-group-grid">
        {/* Age */}
        <div className="form-field">
          <div className="form-label">
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Calendar size={16} /> Customer Age
            </span>
            <span className="form-value-badge">{formData.age} yrs</span>
          </div>
          <input
            type="number"
            className="input-control"
            min="18"
            max="100"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
          />
          <input
            type="range"
            className="range-slider"
            min="18"
            max="90"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
          />
        </div>

        {/* Annual Income */}
        <div className="form-field">
          <div className="form-label">
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <DollarSign size={16} /> Annual Income ($)
            </span>
            <span className="form-value-badge">
              ${formData.income.toLocaleString()}
            </span>
          </div>
          <input
            type="number"
            className="input-control"
            min="1000"
            step="1000"
            value={formData.income}
            onChange={(e) => handleChange("income", e.target.value)}
          />
          <input
            type="range"
            className="range-slider"
            min="10000"
            max="250000"
            step="2500"
            value={formData.income}
            onChange={(e) => handleChange("income", e.target.value)}
          />
        </div>

        {/* Loan Amount */}
        <div className="form-field">
          <div className="form-label">
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <DollarSign size={16} /> Requested Loan ($)
            </span>
            <span className="form-value-badge">
              ${formData.loan_amount.toLocaleString()}
            </span>
          </div>
          <input
            type="number"
            className="input-control"
            min="1000"
            step="500"
            value={formData.loan_amount}
            onChange={(e) => handleChange("loan_amount", e.target.value)}
          />
          <input
            type="range"
            className="range-slider"
            min="1000"
            max="100000"
            step="1000"
            value={formData.loan_amount}
            onChange={(e) => handleChange("loan_amount", e.target.value)}
          />
        </div>

        {/* Loan Term */}
        <div className="form-field">
          <div className="form-label">
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Clock size={16} /> Loan Term (Months)
            </span>
            <span className="form-value-badge">{formData.loan_term} mo</span>
          </div>
          <input
            type="number"
            className="input-control"
            min="6"
            max="120"
            step="6"
            value={formData.loan_term}
            onChange={(e) => handleChange("loan_term", e.target.value)}
          />
          <input
            type="range"
            className="range-slider"
            min="6"
            max="72"
            step="6"
            value={formData.loan_term}
            onChange={(e) => handleChange("loan_term", e.target.value)}
          />
        </div>

        {/* Debt to Income Ratio */}
        <div className="form-field">
          <div className="form-label">
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Percent size={16} /> Debt-to-Income (DTI)
            </span>
            <span
              className="form-value-badge"
              style={{
                color:
                  formData.debt_to_income > 0.45
                    ? "var(--rose-danger)"
                    : "var(--cyan-primary)",
              }}
            >
              {(formData.debt_to_income * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            className="range-slider"
            min="0.05"
            max="0.80"
            step="0.01"
            value={formData.debt_to_income}
            onChange={(e) => handleChange("debt_to_income", e.target.value)}
          />
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
            {formData.debt_to_income <= 0.35
              ? "✓ Conservative DTI (<35%)"
              : formData.debt_to_income <= 0.5
              ? "⚠ Moderate Debt Load (35-50%)"
              : "⛔ High Risk Debt Burden (>50%)"}
          </div>
        </div>

        {/* Employment Tenure */}
        <div className="form-field">
          <div className="form-label">
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Briefcase size={16} /> Employment Tenure
            </span>
            <span className="form-value-badge">
              {formData.employment_years} yrs
            </span>
          </div>
          <input
            type="number"
            className="input-control"
            min="0"
            max="40"
            value={formData.employment_years}
            onChange={(e) => handleChange("employment_years", e.target.value)}
          />
          <input
            type="range"
            className="range-slider"
            min="0"
            max="30"
            value={formData.employment_years}
            onChange={(e) => handleChange("employment_years", e.target.value)}
          />
        </div>
      </div>

      {/* Credit History Radio Toggle */}
      <div style={{ marginTop: "1.5rem" }}>
        <div className="form-label" style={{ marginBottom: "0.5rem" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <ShieldCheck size={16} /> Past Credit Payment Standing
          </span>
        </div>
        <div className="toggle-group">
          <div
            className={`toggle-option ${
              formData.credit_history === 1 ? "active-good" : ""
            }`}
            onClick={() => handleChange("credit_history", 1)}
          >
            ✓ Good History (Zero Recent Defaults)
          </div>
          <div
            className={`toggle-option ${
              formData.credit_history === 0 ? "active-bad" : ""
            }`}
            onClick={() => handleChange("credit_history", 0)}
          >
            ⚠ Adverse Record (Past Default / Delinquencies)
          </div>
        </div>
      </div>

      {/* Live Ratio & Payment Summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          marginTop: "1.5rem",
          padding: "1rem 1.25rem",
          background: "rgba(5, 7, 14, 0.5)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-color)",
          fontSize: "0.85rem",
        }}
      >
        <div>
          <span style={{ color: "var(--text-muted)" }}>Loan-to-Income (LTI):</span>{" "}
          <strong
            style={{
              color: ltiRatio > 0.5 ? "var(--rose-danger)" : "var(--cyan-primary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {ltiRatio}x
          </strong>
        </div>
        <div>
          <span style={{ color: "var(--text-muted)" }}>Est. Monthly Payment:</span>{" "}
          <strong style={{ color: "#fff", fontFamily: "var(--font-mono)" }}>
            ${isNaN(estimatedMonthlyPayment) ? "0" : Math.round(estimatedMonthlyPayment).toLocaleString()}/mo
          </strong>
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={onEvaluate}
        disabled={isEvaluating}
      >
        <Zap size={20} />
        {isEvaluating ? "Evaluating Model Risk..." : "Run AI Credit Scoring"}
      </button>
    </div>
  );
};
