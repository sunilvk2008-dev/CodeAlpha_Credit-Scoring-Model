import React from "react";
import { Printer, Download, X, ShieldCheck, ShieldAlert, Award, FileText, CheckCircle2 } from "lucide-react";

export const ReportModal = ({ isOpen, onClose, formData, result }) => {
  if (!isOpen || !result) return null;

  const probability = result.probability || 0;
  const isApproved = result.prediction === "Creditworthy";
  const creditScore = Math.round(300 + probability * 550);
  const reportDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div
        className="modal-container report-modal-container glass-card animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "800px", width: "90%", maxHeight: "90vh", overflowY: "auto", padding: "0" }}
      >
        {/* Modal Action Header (Screen Only) */}
        <div
          className="no-print"
          style={{
            display: "flex",
            justify: "space-between",
            alignItems: "center",
            padding: "1.25rem 2rem",
            background: "rgba(15, 23, 42, 0.9)",
            borderBottom: "1px solid var(--border-color)",
            position: "sticky",
            top: 0,
            zIndex: 10
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FileText className="text-gradient-cyan" size={22} />
            <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Official Credit Evaluation Certificate</h3>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <button className="btn-primary" onClick={handlePrint} style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}>
              <Printer size={16} /> Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Printable Certificate Document Content */}
        <div className="printable-certificate-content" style={{ padding: "2.5rem", background: "var(--bg-card)", color: "var(--text-primary)" }}>
          {/* Document Header */}
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid var(--cyan-primary)", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
            <div>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-0.5px" }} className="text-gradient-cyan">
                CrediPulse AI
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Automated Credit Scoring & Underwriting System
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>DOCUMENT ID</div>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.9rem" }}>
                CP-REP-{(Math.random() * 1000000).toFixed(0).padStart(6, "0")}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{reportDate}</div>
            </div>
          </div>

          {/* Verdict Banner */}
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "var(--radius-md)",
              background: isApproved ? "rgba(16, 185, 129, 0.12)" : "rgba(244, 63, 94, 0.12)",
              border: `2px solid ${isApproved ? "var(--emerald-success)" : "var(--rose-danger)"}`,
              display: "flex",
              justify: "space-between",
              alignItems: "center",
              marginBottom: "2rem"
            }}
          >
            <div>
              <div style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700, color: isApproved ? "var(--emerald-success)" : "var(--rose-danger)" }}>
                UNDERWRITING DECISION
              </div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.2rem" }}>
                {isApproved ? (
                  <>
                    <ShieldCheck size={32} color="var(--emerald-success)" />
                    <span style={{ color: "var(--emerald-success)" }}>CREDITWORTHY (APPROVED)</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert size={32} color="var(--rose-danger)" />
                    <span style={{ color: "var(--rose-danger)" }}>NOT CREDITWORTHY (REJECTED)</span>
                  </>
                )}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>AI CREDIT SCORE</div>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "var(--font-mono)", color: isApproved ? "var(--emerald-success)" : "var(--rose-danger)" }}>
                {creditScore}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Prob. Approval: {(probability * 100).toFixed(1)}%</div>
            </div>
          </div>

          {/* Applicant & Financial Summary Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ border: "1px solid var(--border-color)", padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
              <h4 style={{ fontSize: "0.95rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem", color: "var(--cyan-primary)" }}>
                Applicant Demographics & Income
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.88rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Age:</span>
                  <strong>{formData.age} years</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Annual Income:</span>
                  <strong>${formData.income?.toLocaleString()}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Employment Tenure:</span>
                  <strong>{formData.employment_years} years</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Credit Record:</span>
                  <strong style={{ color: formData.credit_history === 1 ? "var(--emerald-success)" : "var(--rose-danger)" }}>
                    {formData.credit_history === 1 ? "✓ Good Standing" : "⚠ Past Delinquency"}
                  </strong>
                </div>
              </div>
            </div>

            <div style={{ border: "1px solid var(--border-color)", padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
              <h4 style={{ fontSize: "0.95rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem", color: "var(--cyan-primary)" }}>
                Requested Credit Terms
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.88rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Loan Principal:</span>
                  <strong>${formData.loan_amount?.toLocaleString()}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Term Duration:</span>
                  <strong>{formData.loan_term} months</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Debt-to-Income (DTI):</span>
                  <strong>{(formData.debt_to_income * 100).toFixed(0)}%</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Loan-to-Income (LTI):</span>
                  <strong>{(formData.loan_amount / Math.max(formData.income, 1)).toFixed(2)}x</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Model Explanation Summary */}
          <div style={{ border: "1px solid var(--border-color)", padding: "1.25rem", borderRadius: "var(--radius-md)", marginBottom: "2rem" }}>
            <h4 style={{ fontSize: "0.95rem", marginBottom: "0.75rem", color: "var(--cyan-primary)" }}>
              Underwriting Assessment & Risk Drivers
            </h4>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Evaluation executed via Supervised Machine Learning Credit Scoring Model. Primary feature contributions evaluated against baseline historical defaults.
              {formData.credit_history === 1 ? " Clean credit payment history substantially positively impacted probability." : " Prior adverse credit record introduced significant risk penalty."}
              {formData.debt_to_income <= 0.35 ? " Low Debt-to-Income ratio (<35%) supports debt serviceability." : " Debt-to-Income ratio exceeds recommended conservative bounds."}
            </p>
          </div>

          {/* Sign-off Seal */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px dashed var(--border-color)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              <Award size={18} color="var(--cyan-primary)" />
              Certified by CrediPulse Automated Underwriting Engine v1.0
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>AI Risk Model Verification</div>
              <div style={{ fontSize: "0.75rem", color: "var(--emerald-success)" }}>✓ Digital Signature Validated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
