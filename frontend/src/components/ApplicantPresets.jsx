import React from "react";
import { APPLICANT_PRESETS } from "../utils/mlEngine";
import { UserCheck, ArrowRight, ShieldCheck, ShieldAlert, DollarSign, Clock } from "lucide-react";

export const ApplicantPresets = ({ onLoadPreset }) => {
  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="glass-card" style={{ padding: "2rem" }}>
        <h2 className="text-gradient-cyan" style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <UserCheck size={28} />
          Pre-Configured Applicant Personas
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.4rem" }}>
          Select any benchmark profile to instantly load its parameters into the scoring evaluator.
        </p>

        <div className="preset-grid" style={{ marginTop: "2rem" }}>
          {APPLICANT_PRESETS.map((preset) => {
            const isDanger = preset.tagType === "danger" || preset.tagType === "warning";

            return (
              <div
                key={preset.id}
                className="preset-card"
                onClick={() => onLoadPreset(preset.data)}
              >
                <div className="preset-title">
                  <span>{preset.title}</span>
                  <span
                    className="preset-tag"
                    style={{
                      background: isDanger ? "rgba(244, 63, 94, 0.15)" : "rgba(16, 185, 129, 0.15)",
                      color: isDanger ? "var(--rose-danger)" : "var(--emerald-success)",
                      border: `1px solid ${isDanger ? "rgba(244, 63, 94, 0.3)" : "rgba(16, 185, 129, 0.3)"}`,
                    }}
                  >
                    {preset.tag}
                  </span>
                </div>

                <div style={{ fontSize: "0.8rem", color: "var(--cyan-primary)", fontWeight: 600, marginBottom: "0.5rem" }}>
                  {preset.subtitle}
                </div>

                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.5 }}>
                  {preset.description}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.5rem",
                    padding: "0.75rem",
                    background: "rgba(7, 10, 18, 0.5)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.8rem",
                    color: "#fff",
                    fontFamily: "var(--font-mono)",
                    marginBottom: "1rem",
                  }}
                >
                  <div>Income: ${preset.data.income.toLocaleString()}</div>
                  <div>Loan: ${preset.data.loan_amount.toLocaleString()}</div>
                  <div>DTI: {(preset.data.debt_to_income * 100).toFixed(0)}%</div>
                  <div>Term: {preset.data.loan_term} mo</div>
                </div>

                <button
                  className="btn-secondary"
                  style={{ width: "100%", justifyContent: "center", background: "rgba(6, 182, 212, 0.1)", color: "var(--cyan-primary)" }}
                >
                  Load Profile into Evaluator <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
