import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

const spectralLines = [
  { x: 0.05, color: "rgba(140, 40, 40, 0.7)", label: "" },
  { x: 0.12, color: "rgba(180, 60, 30, 0.5)", label: "" },
  { x: 0.2, color: "rgba(200, 100, 40, 0.6)", label: "" },
  { x: 0.28, color: "rgba(220, 160, 40, 0.4)", label: "" },
  { x: 0.35, color: "rgba(100, 180, 60, 0.5)", label: "" },
  { x: 0.42, color: "rgba(60, 140, 200, 0.6)", label: "" },
  { x: 0.49, color: "rgba(80, 60, 180, 0.4)", label: "" },
  { x: 0.55, color: "rgba(140, 40, 40, 0.5)", label: "" },
  { x: 0.62, color: "rgba(200, 120, 40, 0.4)", label: "" },
  { x: 0.7, color: "rgba(60, 160, 120, 0.5)", label: "" },
  { x: 0.78, color: "rgba(60, 100, 200, 0.6)", label: "" },
  { x: 0.85, color: "rgba(120, 50, 180, 0.4)", label: "" },
  { x: 0.92, color: "rgba(180, 80, 40, 0.5)", label: "" },
];

export const SpectrographChart: React.FC = () => {
  const frame = useCurrentFrame();

  // Chart fade in
  const chartOpacity = interpolate(frame, [0, 300], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Continuous spectrum bar animation
  const spectrumWidth = interpolate(frame, [150, 600], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Absorption line drawing
  const lineProgress = interpolate(frame, [600, 1200], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Helium highlight
  const heliumHighlight = interpolate(frame, [1500, 1800], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Helium label
  const heliumLabelOpacity = interpolate(frame, [1800, 2100], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "Helium detected" text
  const detectedOpacity = interpolate(frame, [2100, 2400], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const detectedScale = interpolate(frame, [2100, 2400], [0.8, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Pulse for detected text
  const detectedPulse = interpolate(
    Math.sin(frame * 0.03),
    [-1, 1],
    [0.85, 1]
  );

  // Chart dimensions
  const chartLeft = 500;
  const chartTop = 500;
  const chartWidth = 2840;
  const chartHeight = 800;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a14", opacity: chartOpacity }}>
      {/* Grid lines */}
      {[0, 0.2, 0.4, 0.6, 0.8, 1].map((t, i) => (
        <div
          key={`h${i}`}
          style={{
            position: "absolute",
            left: chartLeft,
            top: chartTop + chartHeight * t,
            width: chartWidth,
            height: 1,
            backgroundColor: "rgba(255, 255, 255, 0.06)",
          }}
        />
      ))}
      {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((t, i) => (
        <div
          key={`v${i}`}
          style={{
            position: "absolute",
            left: chartLeft + chartWidth * t,
            top: chartTop,
            width: 1,
            height: chartHeight,
            backgroundColor: "rgba(255, 255, 255, 0.06)",
          }}
        />
      ))}

      {/* Axis labels */}
      <div
        style={{
          position: "absolute",
          left: chartLeft,
          top: chartTop + chartHeight + 30,
          width: chartWidth,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {["389nm", "447nm", "502nm", "588nm", "668nm", "706nm"].map(
          (label, i) => (
            <span
              key={i}
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 44,
                color: "rgba(160, 170, 190, 0.5)",
              }}
            >
              {label}
            </span>
          )
        )}
      </div>

      {/* Y-axis label */}
      <div
        style={{
          position: "absolute",
          left: chartLeft - 120,
          top: chartTop + chartHeight / 2,
          transform: "rotate(-90deg) translateX(-50%)",
          transformOrigin: "left center",
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 44,
            color: "rgba(160, 170, 190, 0.5)",
            letterSpacing: 8,
          }}
        >
          INTENSITY
        </span>
      </div>

      {/* Continuous spectrum bar */}
      <div
        style={{
          position: "absolute",
          left: chartLeft,
          top: chartTop - 80,
          width: chartWidth * spectrumWidth,
          height: 40,
          borderRadius: 6,
          background:
            "linear-gradient(90deg, #8B0000, #FF4500, #FFD700, #32CD32, #1E90FF, #4B0082, #8B0000)",
          opacity: 0.8,
          boxShadow: "0 0 20px rgba(200, 150, 80, 0.2)",
        }}
      />

      {/* Intensity curve */}
      <svg
        style={{
          position: "absolute",
          left: chartLeft,
          top: chartTop,
          width: chartWidth,
          height: chartHeight,
        }}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      >
        {/* Base intensity line (flat) */}
        <line
          x1={0}
          y1={chartHeight * 0.3}
          x2={chartWidth * lineProgress}
          y2={chartHeight * 0.3}
          stroke="rgba(200, 210, 230, 0.6)"
          strokeWidth={3}
        />

        {/* Absorption dips */}
        {spectralLines.map((line, i) => {
          const lineX = chartWidth * line.x;
          const dipDepth =
            line.x === 0.49 ? 0.7 * lineProgress : 0.3 * lineProgress;
          const dipWidth = line.x === 0.49 ? 20 : 10;

          if (lineX > chartWidth * lineProgress) return null;

          return (
            <React.Fragment key={i}>
              {/* Vertical absorption line */}
              <line
                x1={lineX}
                y1={chartHeight * 0.3}
                x2={lineX}
                y2={chartHeight * (0.3 + dipDepth)}
                stroke={line.color}
                strokeWidth={line.x === 0.49 ? 4 : 2}
              />
              {/* Dip shape */}
              <path
                d={`M ${lineX - dipWidth} ${chartHeight * 0.3} Q ${lineX} ${chartHeight * (0.3 + dipDepth)} ${lineX + dipWidth} ${chartHeight * 0.3}`}
                fill="none"
                stroke={
                  line.x === 0.49
                    ? "rgba(0, 200, 255, 0.9)"
                    : "rgba(200, 210, 230, 0.4)"
                }
                strokeWidth={line.x === 0.49 ? 4 : 2}
              />
            </React.Fragment>
          );
        })}
      </svg>

      {/* Helium highlight box */}
      <div
        style={{
          position: "absolute",
          left: chartLeft + chartWidth * 0.47 - 40,
          top: chartTop - 20,
          width: 80,
          height: chartHeight + 40,
          border: "3px solid rgba(0, 200, 255, 0.7)",
          borderRadius: 8,
          opacity: heliumHighlight,
          boxShadow: "0 0 30px rgba(0, 200, 255, 0.3)",
        }}
      />

      {/* Helium label */}
      <div
        style={{
          position: "absolute",
          left: chartLeft + chartWidth * 0.47,
          top: chartTop - 100,
          transform: "translateX(-50%)",
          opacity: heliumLabelOpacity,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 64,
            fontWeight: 600,
            color: "rgba(0, 200, 255, 0.9)",
            letterSpacing: 8,
            textShadow: "0 0 20px rgba(0, 200, 255, 0.5)",
          }}
        >
          He — 588nm
        </span>
      </div>

      {/* "Helium detected" text */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: detectedOpacity * detectedPulse,
          scale: `${detectedScale}`,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 140,
            fontWeight: 700,
            color: "rgba(0, 220, 255, 1)",
            letterSpacing: 16,
            textShadow:
              "0 0 40px rgba(0, 200, 255, 0.6), 0 0 80px rgba(0, 160, 220, 0.3)",
          }}
        >
          HELIUM DETECTED
        </span>
      </div>
    </AbsoluteFill>
  );
};
