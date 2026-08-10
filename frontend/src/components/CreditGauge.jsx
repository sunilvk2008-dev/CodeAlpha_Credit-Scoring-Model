import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ShieldCheck, ShieldAlert, Activity, CheckCircle, HelpCircle } from "lucide-react";

export const CreditGauge = ({ result, isEvaluating, onOpenReport }) => {
  const probability = result?.probability || 0;
  const isApproved = result?.prediction === "Creditworthy";

  // Map probability (0 - 1) to credit score scale (300 - 850)
  const creditScore = Math.round(300 + probability * 550);

  // Trigger celebration on high approval
  useEffect(() => {
    if (isApproved && probability > 0.65) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#06b6d4", "#10b981", "#8b5cf6", "#3b82f6"],
      });
    }
  }, [result]);

  // Determine score grade label and color
  let scoreGrade = "High Risk";
  let gradeColor = "var(--rose-danger)";
  let strokeGradientId = "gradientDanger";

  if (creditScore >= 780) {
    scoreGrade = "Exceptional Prime";
    gradeColor = "var(--emerald-success)";
    strokeGradientId = "gradientSuccess";
  } else if (creditScore >= 700) {
    scoreGrade = "Very Good";
    gradeColor = "var(--emerald-success)";
    strokeGradientId = "gradientSuccess";
  } else if (creditScore >= 640) {
    scoreGrade = "Good Standing";
    gradeColor = "var(--cyan-primary)";
    strokeGradientId = "gradientCyan";
  } else if (creditScore >= 580) {
    scoreGrade = "Fair Risk";
    gradeColor = "var(--amber-warning)";
    strokeGradientId = "gradientWarning";
  }

  // SVG Gauge Calculations
  const radius = 100;
  const circumference = Math.PI * radius; // Half-circle perimeter
  const strokeDashoffset = circumference - probability * circumference;

  // Needle Rotation Angle (-90 deg to +90 deg)
  const needleAngle = -90 + probability * 180;

  return (
    <div className="glass-card animate-fade-in" style={{ padding: "2rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Sparkles size={22} className="text-gradient-cyan" />
          AI Credit Score Meter
        </h3>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {onOpenReport && (
            <button
              className="btn-secondary"
              onClick={onOpenReport}
              style={{ fontSize: "0.75rem", padding: "0.3rem 0.65rem", background: "rgba(6, 182, 212, 0.15)", color: "var(--cyan-primary)", border: "1px solid rgba(6, 182, 212, 0.3)" }}
              title="Generate printable official PDF credit report"
            >
              📄 Export PDF
            </button>
          )}

          {result?.isFallback ? (
            <span style={{ fontSize: "0.75rem", background: "rgba(245, 158, 11, 0.15)", color: "var(--amber-warning)", padding: "0.25rem 0.65rem", borderRadius: "6px", border: "1px solid rgba(245, 158, 11, 0.3)", fontWeight: 600 }}>
              ⚡ Client ML
            </span>
          ) : (
            <span style={{ fontSize: "0.75rem", background: "rgba(16, 185, 129, 0.15)", color: "var(--emerald-success)", padding: "0.25rem 0.65rem", borderRadius: "6px", border: "1px solid rgba(16, 185, 129, 0.3)", fontWeight: 600 }}>
              ✓ FastAPI
            </span>
          )}
        </div>
      </div>

      {/* SVG Arc Meter */}
      <div className="gauge-container">
        <svg className="gauge-svg" viewBox="0 0 240 145">
          <defs>
            <linearGradient id="gradientSuccess" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="gradientCyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="gradientWarning" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="gradientDanger" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>

          {/* Background Track Arc */}
          <path
            d="M 20 120 A 100 100 0 0 1 220 120"
            className="gauge-bg-path"
          />

          {/* Dynamic Value Arc */}
          <path
            d="M 20 120 A 100 100 0 0 1 220 120"
            className="gauge-value-path"
            stroke={`url(#${strokeGradientId})`}
            strokeDasharray={circumference}
            strokeDashoffset={isEvaluating ? circumference : strokeDashoffset}
          />

          {/* Score Scale Ticks (300, 580, 640, 700, 780, 850) */}
          <text x="15" y="140" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">300</text>
          <text x="205" y="140" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">850</text>
        </svg>

        {/* Center Score Output */}
        <div className="gauge-center-text">
          <div className="gauge-score-val" style={{ color: gradeColor }}>
            {isEvaluating ? "---" : creditScore}
          </div>
          <div className="gauge-score-label">{scoreGrade}</div>
        </div>
      </div>

      {/* Probability Dual Meter */}
      <div style={{ background: "rgba(5, 7, 14, 0.5)", border: "1px solid var(--border-color)", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.4rem" }}>
          <span style={{ color: "var(--emerald-success)" }}>Approval Probability</span>
          <span style={{ color: "var(--rose-danger)" }}>Default Risk</span>
        </div>
        <div style={{ width: "100%", height: "8px", background: "rgba(244, 63, 94, 0.3)", borderRadius: "4px", overflow: "hidden", display: "flex" }}>
          <div
            style={{
              height: "100%",
              width: `${probability * 100}%`,
              background: "linear-gradient(90deg, #06b6d4, #10b981)",
              borderRadius: "4px",
              transition: "width 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          ></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", marginTop: "0.3rem" }}>
          <span>{(probability * 100).toFixed(1)}%</span>
          <span>{((1 - probability) * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Decision Banner */}
      <div className={`result-banner ${isApproved ? "approved" : "rejected"}`}>
        <div>
          <div className="result-title">
            {isApproved ? (
              <>
                <ShieldCheck size={26} />
                CREDITWORTHY (APPROVED)
              </>
            ) : (
              <>
                <ShieldAlert size={26} />
                NOT CREDITWORTHY (REJECTED)
              </>
            )}
          </div>
          <p style={{ fontSize: "0.85rem", opacity: 0.9, marginTop: "0.2rem" }}>
            {isApproved
              ? "Model predicts low probability of loan default."
              : "High risk parameters exceed model safety limits."}
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.8, fontWeight: 700 }}>
            Model Score
          </div>
          <div className="probability-badge">
            {creditScore}
          </div>
        </div>
      </div>
    </div>
  );
};

