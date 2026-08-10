import React from "react";

export const AmbientBackground = ({ theme = "dark", result }) => {
  const isApproved = result?.prediction === "Creditworthy";
  const probability = result?.probability || 0;
  const creditScore = Math.round(300 + probability * 550);

  let scoreCategory = "neutral";
  if (result) {
    if (isApproved && creditScore >= 680) {
      scoreCategory = "prime"; // Emerald Green theme & bg_prime.jpg picture
    } else if (!isApproved || creditScore < 580) {
      scoreCategory = "risk"; // Crimson Red theme & bg_risk.jpg picture
    } else {
      scoreCategory = "moderate"; // Amber / Cyan theme
    }
  }

  return (
    <div className={`ambient-background theme-${theme} category-${scoreCategory}`}>
      {/* SVG Liquid Filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="liquid-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="45" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
              result="liquid"
            />
            <feBlend in="SourceGraphic" in2="liquid" />
          </filter>
        </defs>
      </svg>

      {/* Dynamic Background Picture Overlay */}
      <div
        className="bg-picture-layer"
        style={{
          backgroundImage:
            scoreCategory === "prime"
              ? `url('/bg_prime.jpg')`
              : scoreCategory === "risk"
              ? `url('/bg_risk.jpg')`
              : "none",
        }}
      ></div>

      {/* Dynamic Liquid Blob Orbs */}
      <div className="liquid-container">
        <div className={`liquid-blob blob-1 cat-${scoreCategory}`}></div>
        <div className={`liquid-blob blob-2 cat-${scoreCategory}`}></div>
        <div className={`liquid-blob blob-3 cat-${scoreCategory}`}></div>
      </div>

      {/* Floating Animated Light Particles */}
      <div className="particle-layer">
        <div className={`light-particle p-1 cat-${scoreCategory}`}></div>
        <div className={`light-particle p-2 cat-${scoreCategory}`}></div>
        <div className={`light-particle p-3 cat-${scoreCategory}`}></div>
        <div className={`light-particle p-4 cat-${scoreCategory}`}></div>
        <div className={`light-particle p-5 cat-${scoreCategory}`}></div>
      </div>

      {/* Grid Mesh */}
      <div className="liquid-mesh-grid"></div>
    </div>
  );
};
