import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const HabitableZone: React.FC = () => {
  const frame = useCurrentFrame();

  const diagramOpacity = interpolate(frame, [0, 600], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const greenBandOpacity = interpolate(frame, [300, 900], [0, 0.35], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const labelOpacity = interpolate(frame, [900, 1200], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const hotLabelOpacity = interpolate(frame, [1200, 1500], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const coldLabelOpacity = interpolate(frame, [1500, 1800], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const planetInZoneOpacity = interpolate(frame, [1800, 2100], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const sunPulse = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.9, 1.1]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: diagramOpacity,
      }}
    >
      {/* Habitable zone green band */}
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, transparent 30%, rgba(40, 180, 80, 0.15) 38%, rgba(40, 180, 80, 0.3) 45%, rgba(40, 180, 80, 0.15) 52%, transparent 60%)",
          opacity: greenBandOpacity,
        }}
      />

      {/* Zone boundary rings */}
      <div
        style={{
          position: "absolute",
          width: 660,
          height: 660,
          borderRadius: "50%",
          border: "2px dashed rgba(255, 100, 80, 0.3)",
          opacity: greenBandOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1050,
          height: 1050,
          borderRadius: "50%",
          border: "2px dashed rgba(80, 140, 255, 0.3)",
          opacity: greenBandOpacity,
        }}
      />

      {/* Star at center */}
      <div
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 220, 80, 1) 0%, rgba(255, 180, 40, 0.9) 50%, rgba(255, 120, 20, 0.5) 80%, transparent 100%)",
          boxShadow:
            "0 0 60px rgba(255, 200, 60, 0.8), 0 0 120px rgba(255, 150, 30, 0.4)",
          scale: `${sunPulse}`,
          zIndex: 10,
        }}
      />

      {/* Inner zone label - "TOO HOT" */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "30%",
          transform: "translateX(-50%)",
          opacity: hotLabelOpacity,
        }}
      >
        <span
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 36,
            fontWeight: 600,
            color: "rgba(255, 100, 80, 0.8)",
            letterSpacing: 6,
            textTransform: "uppercase",
            textShadow: "0 0 20px rgba(255, 80, 60, 0.4)",
          }}
        >
          Too Hot
        </span>
      </div>

      {/* Habitable zone label */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "22%",
          transform: "translateX(-50%)",
          opacity: labelOpacity,
        }}
      >
        <span
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 48,
            fontWeight: 700,
            color: "rgba(40, 200, 100, 0.9)",
            letterSpacing: 10,
            textTransform: "uppercase",
            textShadow: "0 0 30px rgba(40, 180, 80, 0.5)",
          }}
        >
          Goldilocks Zone
        </span>
      </div>

      {/* Outer zone label - "TOO COLD" */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "30%",
          transform: "translateX(-50%)",
          opacity: coldLabelOpacity,
        }}
      >
        <span
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 36,
            fontWeight: 600,
            color: "rgba(80, 140, 255, 0.8)",
            letterSpacing: 6,
            textTransform: "uppercase",
            textShadow: "0 0 20px rgba(60, 120, 255, 0.4)",
          }}
        >
          Too Cold
        </span>
      </div>

      {/* Planet in the habitable zone */}
      <div
        style={{
          position: "absolute",
          left: "58%",
          top: "48%",
          opacity: planetInZoneOpacity,
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          {/* Planet glow */}
          <div
            style={{
              position: "absolute",
              left: -12,
              top: -12,
              width: 64,
              height: 64,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(70, 150, 255, 0.2) 60%, transparent 100%)",
              filter: "blur(8px)",
            }}
          />
          {/* Planet body */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 35%, #5a9fd4, #3a7ab4, #2a5a8a)",
              boxShadow: "0 0 15px rgba(70, 140, 240, 0.4)",
            }}
          />
        </div>
      </div>

      {/* Orbit rings for scale */}
      {[200, 350, 525].map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: r * 2,
            height: r * 2,
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
