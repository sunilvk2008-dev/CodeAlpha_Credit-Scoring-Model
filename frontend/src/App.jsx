import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { CreditGauge } from "./components/CreditGauge";
import { ApplicantForm } from "./components/ApplicantForm";
import { RiskBreakdown } from "./components/RiskBreakdown";
import { ModelAnalytics } from "./components/ModelAnalytics";
import { ApplicantPresets } from "./components/ApplicantPresets";
import { HistoryLog } from "./components/HistoryLog";
import { ApiSettingsModal } from "./components/ApiSettingsModal";
import { AmbientBackground } from "./components/AmbientBackground";
import { ReportModal } from "./components/ReportModal";
import { predictCredit, checkApiHealth } from "./utils/mlEngine";

const DEFAULT_FORM_DATA = {
  age: 34,
  income: 75000,
  loan_amount: 15000,
  loan_term: 36,
  credit_history: 1,
  debt_to_income: 0.28,
  employment_years: 6,
};

export function App() {
  const [activeTab, setActiveTab] = useState("evaluator");
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Theme state: "dark" or "light"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("credipulse_theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("credipulse_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // History log loaded from localStorage
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("credipulse_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Check API health on mount & periodically
  const refreshHealth = async () => {
    const health = await checkApiHealth();
    setIsOnline(health.online);
  };

  useEffect(() => {
    refreshHealth();
    const interval = setInterval(refreshHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  // Run initial calculation
  useEffect(() => {
    handleEvaluate();
  }, []);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("credipulse_history", JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history:", e);
    }
  }, [history]);

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    const [res] = await Promise.all([
      predictCredit(formData),
      new Promise((r) => setTimeout(r, 400)),
    ]);
    setPredictionResult(res);
    setIsEvaluating(false);

    const logItem = {
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      input: { ...formData },
      result: res,
    };

    setHistory((prev) => [logItem, ...prev.slice(0, 49)]);
  };

  const handleLoadPreset = (presetData) => {
    setFormData(presetData);
    setActiveTab("evaluator");
    setTimeout(() => {
      handleEvaluate();
    }, 100);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("credipulse_history");
  };

  return (
    <>
      <AmbientBackground theme={theme} result={predictionResult} />
      <div className="app-container">
        {/* Navigation Header */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOnline={isOnline}
          onOpenSettings={() => setIsSettingsOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main Tab Views */}
        <main>
          {activeTab === "evaluator" && (
            <div>
              <div className="dashboard-grid">
                <ApplicantForm
                  formData={formData}
                  setFormData={setFormData}
                  onEvaluate={handleEvaluate}
                  isEvaluating={isEvaluating}
                  onReset={() => setFormData(DEFAULT_FORM_DATA)}
                />

                <div>
                  <CreditGauge
                    result={predictionResult}
                    isEvaluating={isEvaluating}
                    onOpenReport={() => setIsReportOpen(true)}
                  />
                </div>
              </div>

              {/* Feature Impact & Risk Breakdown */}
              {predictionResult && (
                <RiskBreakdown formData={formData} result={predictionResult} />
              )}
            </div>
          )}

          {activeTab === "presets" && (
            <ApplicantPresets onLoadPreset={handleLoadPreset} />
          )}

          {activeTab === "analytics" && <ModelAnalytics />}

          {activeTab === "history" && (
            <HistoryLog history={history} onClearHistory={handleClearHistory} />
          )}
        </main>

        {/* API Backend Settings Modal */}
        <ApiSettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          isOnline={isOnline}
          onRefreshHealth={refreshHealth}
        />

        {/* Official Printable PDF Report Modal */}
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          formData={formData}
          result={predictionResult}
        />
      </div>
    </>
  );
}

export default App;
