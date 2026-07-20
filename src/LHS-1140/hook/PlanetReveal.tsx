import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const PlanetReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const planetOpacity = interpolate(frame, [1800, 2400], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const planetScale = interpolate(frame, [1800, 3000, 4500], [0.85, 1, 1.05], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const atmospherePulse = interpolate(
    Math.sin(frame * 0.015),
    [-1, 1],
    [0.6, 1]
  );

  const starOpacity = interpolate(frame, [1200, 1800], [0, 0.8], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const cameraZoom = interpolate(frame, [480, 4500], [1, 1.25], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        scale: `${cameraZoom}`,
      }}
    >
      {/* Red dwarf star in background */}
      <div
        style={{
          position: "absolute",
          right: "18%",
          top: "25%",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 80, 30, 1) 0%, rgba(200, 40, 10, 0.8) 40%, rgba(150, 20, 5, 0.3) 70%, transparent 100%)",
          opacity: starOpacity,
          filter: "blur(8px)",
          boxShadow: "0 0 120px rgba(255, 60, 20, 0.6), 0 0 240px rgba(200, 30, 10, 0.3)",
        }}
      />

      {/* Planet */}
      <div
        style={{
          position: "absolute",
          left: "25%",
          top: "20%",
          opacity: planetOpacity,
          scale: `${planetScale}`,
        }}
      >
        {/* Atmospheric glow - outer */}
        <div
          style={{
            position: "absolute",
            left: -90,
            top: -90,
            width: 980,
            height: 980,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(100, 160, 255, 0.15) 60%, rgba(80, 140, 255, 0.08) 80%, transparent 100%)",
            opacity: atmospherePulse,
            filter: "blur(30px)",
          }}
        />

        {/* Atmospheric glow - inner rim */}
        <div
          style={{
            position: "absolute",
            left: -30,
            top: -30,
            width: 820,
            height: 820,
            borderRadius: "50%",
            border: "4px solid rgba(120, 180, 255, 0.2)",
            boxShadow:
              "inset 0 0 80px rgba(100, 160, 255, 0.1), 0 0 40px rgba(100, 160, 255, 0.15)",
            opacity: atmospherePulse,
          }}
        />

        {/* Planet body */}
        <div
          style={{
            width: 760,
            height: 760,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, rgba(160, 90, 60, 1) 0%, rgba(120, 60, 40, 1) 30%, rgba(80, 35, 25, 1) 60%, rgba(50, 20, 15, 1) 100%)",
            boxShadow:
              "inset -60px -40px 120px rgba(0, 0, 0, 0.6), inset 20px 20px 60px rgba(180, 100, 60, 0.3)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Surface texture - dark regions */}
          <div
            style={{
              position: "absolute",
              left: "20%",
              top: "30%",
              width: "35%",
              height: "25%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(60, 25, 15, 0.6) 0%, transparent 70%)",
              filter: "blur(16px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "55%",
              top: "50%",
              width: "25%",
              height: "20%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(70, 30, 18, 0.5) 0%, transparent 70%)",
              filter: "blur(12px)",
            }}
          />
          {/* Surface texture - lighter highlands */}
          <div
            style={{
              position: "absolute",
              left: "40%",
              top: "15%",
              width: "30%",
              height: "20%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(180, 110, 70, 0.3) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
