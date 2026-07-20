import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const ConclusionText: React.FC = () => {
  const frame = useCurrentFrame();

  // Only show after planet fades (frame 2100+)
  const containerOpacity = interpolate(frame, [2100, 2200], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Text appears at frame 2200 (36.7s)
  const textOpacity = interpolate(frame, [2200, 2400], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const textY = interpolate(frame, [2200, 2400], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Fade to black at end
  const fadeOut = interpolate(frame, [2600, 2700], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  if (containerOpacity === 0) return null;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        opacity: containerOpacity * fadeOut,
      }}
    >
      <div
        style={{
          textAlign: "center",
          transform: `translateY(${textY}px)`,
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 120,
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.95)",
            letterSpacing: 8,
            lineHeight: 1.2,
            textShadow: "0 0 60px rgba(180, 220, 255, 0.4)",
          }}
        >
          LHS 1140b
        </div>

        <div
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 80,
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.75)",
            letterSpacing: 4,
            marginTop: 40,
          }}
        >
          48 light-years from Earth
        </div>

        <div
          style={{
            width: 200,
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(180, 220, 255, 0.5), transparent)",
            margin: "50px auto",
          }}
        />

        <div
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 64,
            fontWeight: 400,
            color: "rgba(180, 220, 255, 0.85)",
            letterSpacing: 2,
            maxWidth: 1600,
            lineHeight: 1.5,
            margin: "0 auto",
          }}
        >
          The first rocky exoplanet with a confirmed atmosphere.
        </div>
      </div>
    </AbsoluteFill>
  );
};
