import React from "react";
import {
  Zap,
  Activity,
  BarChart3,
  UserCheck,
  History,
  Settings,
  Sun,
  Moon,
} from "lucide-react";

export const Navbar = ({
  activeTab,
  setActiveTab,
  isOnline,
  onOpenSettings,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="navbar">
      <a
        href="#"
        className="brand-logo"
        onClick={(e) => {
          e.preventDefault();
          setActiveTab("evaluator");
        }}
      >
        <div className="brand-icon-wrapper">
          <Zap size={24} />
        </div>
        <div>
          <span className="text-gradient-cyan">CrediPulse</span>
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              marginLeft: "8px",
            }}
          >
            AI Risk Engine
          </span>
        </div>
      </a>

      <nav className="nav-tabs">
        <button
          className={`nav-tab-btn ${activeTab === "evaluator" ? "active" : ""}`}
          onClick={() => setActiveTab("evaluator")}
        >
          <Activity size={18} />
          Evaluator
        </button>

        <button
          className={`nav-tab-btn ${activeTab === "presets" ? "active" : ""}`}
          onClick={() => setActiveTab("presets")}
        >
          <UserCheck size={18} />
          Presets
        </button>

        <button
          className={`nav-tab-btn ${activeTab === "analytics" ? "active" : ""}`}
          onClick={() => setActiveTab("analytics")}
        >
          <BarChart3 size={18} />
          Model Metrics
        </button>

        <button
          className={`nav-tab-btn ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          <History size={18} />
          History Log
        </button>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        {/* Light / Dark Mode Toggle Button */}
        <button
          className="btn-secondary theme-toggle-btn"
          onClick={onToggleTheme}
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          style={{
            padding: "0.55rem 0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontWeight: 700,
          }}
        >
          {theme === "dark" ? (
            <>
              <Sun size={18} style={{ color: "#f59e0b" }} />
              <span style={{ fontSize: "0.8rem" }}>Light</span>
            </>
          ) : (
            <>
              <Moon size={18} style={{ color: "#8b5cf6" }} />
              <span style={{ fontSize: "0.8rem" }}>Dark</span>
            </>
          )}
        </button>

        <div
          className={`status-pill ${isOnline ? "" : "offline"}`}
          title={isOnline ? "FastAPI Server Connected" : "Local ML Fallback Active"}
        >
          <span className="status-dot"></span>
          <span>{isOnline ? "FastAPI Online" : "Local ML Active"}</span>
        </div>

        <button
          className="btn-secondary"
          onClick={onOpenSettings}
          title="Configure API Host"
          style={{ padding: "0.55rem" }}
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};
