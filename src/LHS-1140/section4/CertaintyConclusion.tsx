import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const CertaintyConclusion: React.FC = () => {
  const frame = useCurrentFrame();

  // LHS 1140b fades in at center
  const planetOpacity = interpolate(frame, [0, 450], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const planetScale = interpolate(frame, [0, 450], [0.6, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Checkmark appears
  const checkOpacity = interpolate(frame, [600, 900], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const checkScale = interpolate(frame, [600, 900], [0.3, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "That is a first" text
  const textOpacity = interpolate(frame, [900, 1200], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const textScale = interpolate(frame, [900, 1200], [0.9, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const pulse = interpolate(Math.sin(frame * 0.025), [-1, 1], [0.85, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000510" }}>
      {/* Stars */}
      {React.useMemo(() => {
        const result = [];
        for (let i = 0; i < 80; i++) {
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

      {/* Radial glow behind planet */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          width: 1200,
          height: 1200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(40, 180, 80, 0.08) 0%, rgba(40, 180, 80, 0.04) 40%, transparent 70%)",
          opacity: planetOpacity * pulse,
        }}
      />

      {/* LHS 1140b at center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: `translate(-50%, -50%) scale(${planetScale})`,
          opacity: planetOpacity,
        }}
      >
        {/* Atmosphere glow */}
        <div
          style={{
            position: "absolute",
            left: -40,
            top: -40,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, transparent 55%, rgba(100, 160, 255, 0.1) 70%, rgba(100, 160, 255, 0.2) 85%, transparent 100%)",
            opacity: pulse,
            filter: "blur(12px)",
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
            border: "3px solid rgba(100, 160, 255, 0.15)",
            boxShadow: "0 0 20px rgba(100, 160, 255, 0.1)",
            opacity: pulse,
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

      {/* Checkmark */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "62%",
          transform: `translate(-50%, -50%) scale(${checkScale})`,
          opacity: checkOpacity,
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "rgba(40, 180, 80, 0.15)",
            border: "4px solid rgba(40, 200, 90, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 40px rgba(40, 180, 80, 0.3)",
          }}
        >
          <span
            style={{
              fontSize: 80,
              color: "rgba(40, 200, 90, 0.9)",
              fontWeight: 700,
            }}
          >
            ✓
          </span>
        </div>
      </div>

      {/* "That is a first." */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: textOpacity,
          scale: `${textScale}`,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 112,
            fontWeight: 700,
            color: "rgba(40, 200, 90, 0.95)",
            letterSpacing: 8,
            textShadow:
              "0 0 40px rgba(40, 180, 80, 0.5), 0 0 80px rgba(40, 160, 70, 0.25)",
          }}
        >
          That is a first.
        </span>
      </div>
    </AbsoluteFill>
  );
};
