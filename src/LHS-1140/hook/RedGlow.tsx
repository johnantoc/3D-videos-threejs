import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const RedGlow: React.FC = () => {
  const frame = useCurrentFrame();

  const glowOpacity = interpolate(frame, [180, 600, 1200, 4500], [0, 0.15, 0.35, 0.35], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const glowScale = interpolate(frame, [180, 1200, 4500], [0.3, 1, 1.15], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const pulseIntensity = interpolate(
    Math.sin(frame * 0.01),
    [-1, 1],
    [0.9, 1.1]
  );

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 1200,
          height: 1200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180, 40, 20, 0.9) 0%, rgba(120, 20, 10, 0.5) 30%, rgba(80, 10, 5, 0.2) 60%, transparent 80%)",
          opacity: glowOpacity * pulseIntensity,
          scale: `${glowScale}`,
          filter: "blur(60px)",
        }}
      />
    </AbsoluteFill>
  );
};
