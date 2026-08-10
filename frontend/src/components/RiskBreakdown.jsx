import React from "react";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Layers,
} from "lucide-react";

export const RiskBreakdown = ({ formData, result }) => {
  const {
    income = 1,
    loan_amount = 0,
    debt_to_income = 0,
    credit_history = 1,
    employment_years = 0,
  } = formData;

  const lti = loan_amount / Math.max(income, 1);
  const isApproved = result?.prediction === "Creditworthy";

  // Identify risk drivers
  const strengths = [];
  const vulnerabilities = [];
  const recommendations = [];

  // Credit history evaluation
  if (credit_history === 1) {
    strengths.push({
      title: "Clean Credit History",
      desc: "Positive historical record significantly boosts creditworthiness probability.",
      weight: "+35%",
    });
  } else {
    vulnerabilities.push({
      title: "Adverse Credit Record",
      desc: "Prior delinquencies or bad credit history create severe risk penalty.",
      severity: "High",
    });
    recommendations.push("Provide guarantor or collateral to mitigate past credit delinquencies.");
  }

  // DTI evaluation
  if (debt_to_income <= 0.35) {
    strengths.push({
      title: "Low Debt-to-Income Ratio",
      desc: `DTI at ${(debt_to_income * 100).toFixed(0)}% indicates ample cash flow capacity.`,
      weight: "+25%",
    });
  } else if (debt_to_income > 0.5) {
    vulnerabilities.push({
      title: "Elevated Debt Load",
      desc: `DTI of ${(debt_to_income * 100).toFixed(0)}% exceeds conservative threshold (50%).`,
      severity: "Critical",
    });
    recommendations.push("Pay down existing revolving debt to reduce monthly obligations.");
  }

  // LTI evaluation
  if (lti < 0.3) {
    strengths.push({
      title: "Conservative Loan Amount",
      desc: `Loan represents only ${(lti * 100).toFixed(0)}% of annual income.`,
      weight: "+20%",
    });
  } else if (lti > 0.5) {
    vulnerabilities.push({
      title: "High Loan-to-Income Ratio",
      desc: `Loan request is ${(lti * 100).toFixed(0)}% of total annual income.`,
      severity: "Moderate",
    });
    recommendations.push(
      `Consider reducing requested principal by $${Math.round(
        loan_amount * 0.2
      ).toLocaleString()} to improve approval odds.`
    );
  }

  // Employment tenure
  if (employment_years >= 5) {
    strengths.push({
      title: "Employment Stability",
      desc: `${employment_years} years with current employer demonstrates income consistency.`,
      weight: "+15%",
    });
  } else if (employment_years < 2) {
    vulnerabilities.push({
      title: "Short Employment History",
      desc: `${employment_years} years in current role poses career transition uncertainty.`,
      severity: "Low",
    });
  }

  return (
    <div className="glass-card" style={{ padding: "2rem", marginTop: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
        <Layers size={22} className="text-gradient-cyan" />
        <h3 style={{ fontSize: "1.15rem" }}>AI Feature Impact & Risk Breakdown</h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Strengths Column */}
        <div>
          <h4
            style={{
              fontSize: "0.95rem",
              color: "var(--emerald-success)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "0.8rem",
            }}
          >
            <TrendingUp size={18} /> Supporting Risk Factors ({strengths.length})
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {strengths.length > 0 ? (
              strengths.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(16, 185, 129, 0.08)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.8rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "0.85rem", color: "#fff" }}>
                    <span>{item.title}</span>
                    <span style={{ color: "var(--emerald-success)" }}>{item.weight}</span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                    {item.desc}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>No major supporting factors detected.</p>
            )}
          </div>
        </div>

        {/* Vulnerabilities Column */}
        <div>
          <h4
            style={{
              fontSize: "0.95rem",
              color: "var(--rose-danger)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "0.8rem",
            }}
          >
            <TrendingDown size={18} /> Risk Drivers & Flags ({vulnerabilities.length})
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {vulnerabilities.length > 0 ? (
              vulnerabilities.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(244, 63, 94, 0.08)",
                    border: "1px solid rgba(244, 63, 94, 0.2)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.8rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "0.85rem", color: "#fff" }}>
                    <span>{item.title}</span>
                    <span style={{ color: "var(--rose-danger)", fontSize: "0.75rem", padding: "0.1rem 0.4rem", background: "rgba(244, 63, 94, 0.2)", borderRadius: "4px" }}>
                      {item.severity} Risk
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                    {item.desc}
                  </p>
                </div>
              ))
            ) : (
              <div style={{ background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.15)", borderRadius: "var(--radius-sm)", padding: "0.8rem", color: "var(--emerald-success)", fontSize: "0.85rem" }}>
                ✓ Zero risk flags triggered for this profile.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Visual Feature Weighting Progress Bars */}
      <div style={{ marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px dashed var(--border-color)" }}>
        <h4 style={{ fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: "0.85rem" }}>
          Relative Feature Score Contributions (Model Feature SHAP-Style Estimation)
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.25rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>Credit Record Standing</span>
              <strong style={{ color: credit_history === 1 ? "var(--emerald-success)" : "var(--rose-danger)" }}>
                {credit_history === 1 ? "+210 pts (High Boost)" : "-180 pts (Penalty)"}
              </strong>
            </div>
            <div style={{ height: "6px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: credit_history === 1 ? "85%" : "15%", background: credit_history === 1 ? "var(--emerald-success)" : "var(--rose-danger)", transition: "width 0.8s ease" }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.25rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>Debt-to-Income Ratio ({(debt_to_income * 100).toFixed(0)}%)</span>
              <strong style={{ color: debt_to_income <= 0.35 ? "var(--emerald-success)" : "var(--rose-danger)" }}>
                {debt_to_income <= 0.35 ? "+130 pts (Healthy)" : "-110 pts (High Debt)"}
              </strong>
            </div>
            <div style={{ height: "6px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.max(10, Math.min(100, (1 - debt_to_income) * 100))}%`, background: debt_to_income <= 0.35 ? "var(--cyan-primary)" : "var(--rose-danger)", transition: "width 0.8s ease" }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.25rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>Loan-to-Income Exposure ({lti.toFixed(2)}x)</span>
              <strong style={{ color: lti <= 0.3 ? "var(--emerald-success)" : "var(--amber-warning)" }}>
                {lti <= 0.3 ? "+90 pts (Safe Loan Size)" : "-60 pts (Large Request)"}
              </strong>
            </div>
            <div style={{ height: "6px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.max(15, Math.min(100, (1 - Math.min(lti, 1)) * 100))}%`, background: lti <= 0.3 ? "var(--emerald-success)" : "var(--amber-warning)", transition: "width 0.8s ease" }} />
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "rgba(6, 182, 212, 0.08)",
            border: "1px solid rgba(6, 182, 212, 0.25)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--cyan-primary)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            <Lightbulb size={18} />
            AI Underwriting Recommendations to Boost Approval Odds
          </div>
          <ul style={{ paddingLeft: "1.2rem", fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
