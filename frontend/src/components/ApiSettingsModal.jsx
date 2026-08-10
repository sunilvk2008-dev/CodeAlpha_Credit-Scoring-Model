import React, { useState } from "react";
import { getApiUrl, setApiUrl, checkApiHealth } from "../utils/mlEngine";
import { Settings, X, Server, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";

export const ApiSettingsModal = ({ isOpen, onClose, isOnline, onRefreshHealth }) => {
  const [urlInput, setUrlInput] = useState(getApiUrl());
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    setApiUrl(urlInput);
    setTesting(true);
    const health = await checkApiHealth();
    setTestResult(health);
    setTesting(false);
    onRefreshHealth();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Server size={20} className="text-gradient-cyan" />
            Backend API Configuration
          </h3>
          <button className="btn-secondary" onClick={onClose} style={{ padding: "0.4rem" }}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
          Configure the base URL of your Python FastAPI server running in <code style={{ color: "var(--cyan-primary)" }}>app/main.py</code>.
        </p>

        <div className="form-field" style={{ marginBottom: "1.25rem" }}>
          <label className="form-label">FastAPI Server Endpoint URL</label>
          <input
            type="text"
            className="input-control mono"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="http://127.0.0.1:8000"
          />
        </div>

        {testResult && (
          <div
            style={{
              padding: "0.8rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.85rem",
              marginBottom: "1rem",
              background: testResult.online ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
              border: `1px solid ${testResult.online ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
              color: testResult.online ? "var(--emerald-success)" : "var(--amber-warning)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {testResult.online ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
            {testResult.online
              ? "FastAPI server reached successfully!"
              : `FastAPI offline (${testResult.reason}). Falling back to Local Client-side ML.`}
          </div>
        )}

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave} disabled={testing} style={{ width: "auto", marginTop: 0 }}>
            {testing ? <RefreshCw size={16} className="animate-spin" /> : "Save & Test Connection"}
          </button>
        </div>
      </div>
    </div>
  );
};
