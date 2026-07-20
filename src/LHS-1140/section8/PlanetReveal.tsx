import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const PlanetReveal: React.FC = () => {
  const frame = useCurrentFrame();

  // Planet appears at frame 900 (15s)
  const planetOpacity = interpolate(frame, [900, 1200], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Planet scale grows as it approaches
  const planetScale = interpolate(frame, [900, 1500], [0.6, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Planet fades out at frame 2100 (35s)
  const fadeOut = interpolate(frame, [2100, 2400], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Atmospheric glow pulse
  const glowPulse = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.7, 1],
  );

  // Dim red star in background
  const starOpacity = interpolate(frame, [600, 1200], [0, 0.3], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Dim red star background */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200, 80, 40, 0.8) 0%, rgba(150, 50, 20, 0.4) 50%, transparent 70%)",
          transform: "translate(-50%, -50%) scale(2)",
          opacity: starOpacity,
          boxShadow: "0 0 200px rgba(200, 80, 40, 0.4)",
        }}
      />

      {/* Atmospheric glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180, 220, 255, 0.12) 0%, rgba(180, 220, 255, 0.04) 50%, transparent 70%)",
          transform: `translate(-50%, -50%) scale(${planetScale * 1.4 * glowPulse})`,
          opacity: planetOpacity,
        }}
      />

      {/* Planet body */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #8B4513, #5C2D0A, #3D1F07)",
          boxShadow: `
            inset -50px -25px 100px rgba(0, 0, 0, 0.6),
            0 0 80px rgba(180, 100, 50, 0.3),
            0 0 150px rgba(180, 220, 255, ${0.12 * glowPulse})
          `,
          transform: `translate(-50%, -50%) scale(${planetScale})`,
          opacity: planetOpacity,
          overflow: "hidden",
        }}
      >
        {/* Surface details - craters and terrain */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: `
              radial-gradient(circle at 60% 40%, rgba(100, 60, 30, 0.5) 0%, transparent 25%),
              radial-gradient(circle at 30% 70%, rgba(80, 50, 25, 0.4) 0%, transparent 20%),
              radial-gradient(circle at 75% 65%, rgba(90, 55, 28, 0.3) 0%, transparent 18%),
              radial-gradient(circle at 45% 30%, rgba(110, 65, 35, 0.3) 0%, transparent 15%)
            `,
          }}
        />

        {/* Atmospheric rim light */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "3px solid rgba(180, 220, 255, 0.25)",
            boxShadow: "inset 0 0 40px rgba(180, 220, 255, 0.12)",
          }}
        />

        {/* Terminator line (day/night boundary) */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "linear-gradient(135deg, transparent 40%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.7) 100%)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
