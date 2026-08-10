import React from "react";
import { History, Download, Trash2, ShieldCheck, ShieldAlert, FileSpreadsheet } from "lucide-react";

export const HistoryLog = ({ history, onClearHistory }) => {
  const exportToCSV = () => {
    if (history.length === 0) return;

    const headers = [
      "Timestamp",
      "Age",
      "Income",
      "Loan Amount",
      "Term (Months)",
      "Credit History",
      "DTI Ratio",
      "Employment Years",
      "Prediction",
      "Probability",
    ];

    const rows = history.map((item) => [
      item.timestamp,
      item.input.age,
      item.input.income,
      item.input.loan_amount,
      item.input.loan_term,
      item.input.credit_history === 1 ? "Good" : "Bad",
      item.input.debt_to_income,
      item.input.employment_years,
      item.result.prediction,
      item.result.probability,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `credit_evaluations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-card animate-fade-in" style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 className="text-gradient-cyan" style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <History size={28} />
            Evaluation Audit Trail ({history.length})
          </h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.2rem" }}>
            Historical record of all credit risk predictions generated in this session.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          {history.length > 0 && (
            <>
              <button className="btn-secondary" onClick={exportToCSV}>
                <Download size={16} /> Export CSV
              </button>

              <button
                className="btn-secondary"
                onClick={onClearHistory}
                style={{ color: "var(--rose-danger)" }}
              >
                <Trash2 size={16} /> Clear Audit Log
              </button>
            </>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-muted)" }}>
          <FileSpreadsheet size={48} style={{ opacity: 0.3, marginBottom: "1rem" }} />
          <p style={{ fontSize: "1.1rem" }}>No credit evaluation history logged yet.</p>
          <p style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>
            Run predictions in the Evaluator tab to automatically build an audit trail.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Age</th>
                <th>Annual Income</th>
                <th>Loan Request</th>
                <th>Term</th>
                <th>DTI Ratio</th>
                <th>Credit History</th>
                <th>Decision</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row, idx) => {
                const isApproved = row.result.prediction === "Creditworthy";

                return (
                  <tr key={idx}>
                    <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {row.timestamp}
                    </td>
                    <td>{row.input.age} yrs</td>
                    <td style={{ fontFamily: "var(--font-mono)" }}>
                      ${row.input.income.toLocaleString()}
                    </td>
                    <td style={{ fontFamily: "var(--font-mono)" }}>
                      ${row.input.loan_amount.toLocaleString()}
                    </td>
                    <td>{row.input.loan_term} mo</td>
                    <td style={{ fontFamily: "var(--font-mono)" }}>
                      {(row.input.debt_to_income * 100).toFixed(0)}%
                    </td>
                    <td>
                      {row.input.credit_history === 1 ? (
                        <span style={{ color: "var(--emerald-success)", fontSize: "0.8rem" }}>
                          ✓ Good
                        </span>
                      ) : (
                        <span style={{ color: "var(--rose-danger)", fontSize: "0.8rem" }}>
                          ⚠ Bad
                        </span>
                      )}
                    </td>
                    <td>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          padding: "0.2rem 0.6rem",
                          borderRadius: "999px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          background: isApproved ? "rgba(16, 185, 129, 0.15)" : "rgba(244, 63, 94, 0.15)",
                          color: isApproved ? "var(--emerald-success)" : "var(--rose-danger)",
                          border: `1px solid ${isApproved ? "rgba(16, 185, 129, 0.3)" : "rgba(244, 63, 94, 0.3)"}`,
                        }}
                      >
                        {isApproved ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                        {row.result.prediction}
                      </span>
                    </td>
                    <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                      {(row.result.probability * 100).toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
