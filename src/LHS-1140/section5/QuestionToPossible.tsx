import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const QuestionToPossible: React.FC = () => {
  const frame = useCurrentFrame();

  // Planet fades in
  const planetOpacity = interpolate(frame, [0, 450], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const planetScale = interpolate(frame, [0, 450], [0.7, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Question mark appears (2-10s)
  const questionOpacity = interpolate(frame, [120, 300], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const questionY = interpolate(frame, [120, 300], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Question mark fades out (12-15s)
  const questionFadeOut = interpolate(frame, [720, 900], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Colon appears (15-17s)
  const colonOpacity = interpolate(frame, [900, 1020], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "Possible" word appears (17-22s)
  const possibleOpacity = interpolate(frame, [1020, 1320], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const possibleScale = interpolate(frame, [1020, 1320], [0.8, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const possiblePulse = interpolate(
    Math.sin(frame * 0.025),
    [-1, 1],
    [0.9, 1]
  );

  // Atmosphere pulse
  const atmospherePulse = interpolate(
    Math.sin(frame * 0.02),
    [-1, 1],
    [0.6, 1]
  );

  // Planet glow intensifies with "Possible"
  const planetGlow = interpolate(frame, [1020, 1320], [0.1, 0.3], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000510" }}>
      {/* Stars */}
      {React.useMemo(() => {
        const result = [];
        for (let i = 0; i < 100; i++) {
          const seed = (n: number) => {
            const x = Math.sin((i * 3 + n) * 9301 + 49297) * 233280;
            return x - Math.floor(x);
          };
          result.push(
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${seed(1) * 100}%`,
                top: `${seed(2) * 100}%`,
                width: seed(3) * 3 + 1,
                height: seed(3) * 3 + 1,
                borderRadius: "50%",
                backgroundColor: `rgba(255, 255, 255, ${seed(4) * 0.3 + 0.1})`,
              }}
            />
          );
        }
        return result;
      }, [])}

      {/* Planet */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${planetScale})`,
          opacity: planetOpacity,
        }}
      >
        {/* Enhanced atmosphere glow */}
        <div
          style={{
            position: "absolute",
            left: -50,
            top: -50,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, transparent 50%, rgba(100, 160, 255, ${planetGlow}) 70%, rgba(100, 160, 255, ${planetGlow * 1.5}) 85%, transparent 100%)`,
            opacity: atmospherePulse,
            filter: "blur(15px)",
          }}
        />
        {/* Atmosphere rim */}
        <div
          style={{
            position: "absolute",
            left: -20,
            top: -20,
            width: 440,
            height: 440,
            borderRadius: "50%",
            border: `2px solid rgba(100, 160, 255, ${planetGlow})`,
            boxShadow: `0 0 20px rgba(100, 160, 255, ${planetGlow * 0.5})`,
            opacity: atmospherePulse,
          }}
        />
        {/* Planet body */}
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, rgba(150, 85, 55, 1) 0%, rgba(110, 55, 35, 1) 35%, rgba(70, 30, 20, 1) 65%, rgba(40, 15, 10, 1) 100%)",
            boxShadow:
              "inset -30px -20px 60px rgba(0, 0, 0, 0.6), inset 10px 10px 30px rgba(170, 95, 55, 0.2)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "20%",
              top: "30%",
              width: "30%",
              height: "20%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(50, 22, 12, 0.5), transparent)",
              filter: "blur(6px)",
            }}
          />
        </div>
      </div>

      {/* Question mark → Colon → "Possible" */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "22%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Question mark */}
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 160,
            fontWeight: 700,
            color: "rgba(255, 200, 60, 0.9)",
            textShadow: "0 0 40px rgba(255, 180, 40, 0.5)",
            opacity: questionOpacity * questionFadeOut,
            translate: `0 ${questionY}px`,
          }}
        >
          ?
        </span>

        {/* Colon (appears after question fades) */}
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 140,
            fontWeight: 300,
            color: "rgba(200, 210, 230, 0.7)",
            opacity: colonOpacity,
            marginRight: 20,
          }}
        >
          :
        </span>

        {/* "Possible" */}
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 140,
            fontWeight: 700,
            color: "rgba(40, 200, 120, 0.95)",
            letterSpacing: 8,
            textShadow:
              "0 0 50px rgba(40, 180, 100, 0.5), 0 0 100px rgba(40, 160, 90, 0.25)",
            opacity: possibleOpacity * possiblePulse,
            scale: `${possibleScale}`,
          }}
        >
          Possible
        </span>
      </div>
    </AbsoluteFill>
  );
};
