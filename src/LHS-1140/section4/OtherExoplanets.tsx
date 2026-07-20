import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

interface ExoPlanet {
  name: string;
  subtitle: string;
  x: number;
  y: number;
  size: number;
  color: string;
  ringColor?: string;
  delay: number;
}

const exoplanets: ExoPlanet[] = [
  {
    name: "K2-18b",
    subtitle: "Sub-Neptune",
    x: 700,
    y: 700,
    size: 280,
    color: "radial-gradient(circle at 35% 35%, #7ec8e3, #4a8fa8, #2d6680)",
    delay: 0,
  },
  {
    name: "TRAPPIST-1d",
    subtitle: "Rocky — No atmosphere confirmed",
    x: 1920,
    y: 800,
    size: 200,
    color: "radial-gradient(circle at 35% 35%, #c1440e, #8b3008, #5a1e05)",
    delay: 300,
  },
  {
    name: "TRAPPIST-1e",
    subtitle: "Rocky — Inconclusive",
    x: 3100,
    y: 700,
    size: 210,
    color: "radial-gradient(circle at 35% 35%, #a0826d, #7a5e4a, #5a3e2e)",
    ringColor: "rgba(100, 160, 255, 0.1)",
    delay: 600,
  },
];

export const OtherExoplanets: React.FC = () => {
  const frame = useCurrentFrame();

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

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [0, 300], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 72,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.85)",
            letterSpacing: 8,
          }}
        >
          Other Candidates
        </span>
      </div>

      {/* Exoplanets */}
      {exoplanets.map((planet) => {
        const planetOpacity = interpolate(
          frame,
          [planet.delay, planet.delay + 450],
          [0, 1],
          {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }
        );

        const planetScale = interpolate(
          frame,
          [planet.delay, planet.delay + 450],
          [0.7, 1],
          {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }
        );

        // Question mark appears after planet
        const questionOpacity = interpolate(
          frame,
          [planet.delay + 600, planet.delay + 900],
          [0, 1],
          {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }
        );

        const questionScale = interpolate(
          frame,
          [planet.delay + 600, planet.delay + 900],
          [0.5, 1],
          {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }
        );

        const questionBounce = interpolate(
          Math.sin((frame - planet.delay) * 0.04),
          [-1, 1],
          [0.95, 1.05]
        );

        return (
          <div
            key={planet.name}
            style={{
              position: "absolute",
              left: planet.x,
              top: planet.y,
              transform: `translate(-50%, -50%) scale(${planetScale})`,
              opacity: planetOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 30,
            }}
          >
            {/* Planet */}
            <div style={{ position: "relative" }}>
              {planet.ringColor && (
                <div
                  style={{
                    position: "absolute",
                    left: -planet.size * 0.3,
                    top: planet.size * 0.3,
                    width: planet.size * 1.6,
                    height: planet.size * 0.4,
                    borderRadius: "50%",
                    border: `3px solid ${planet.ringColor}`,
                    opacity: 0.5,
                  }}
                />
              )}
              <div
                style={{
                  width: planet.size,
                  height: planet.size,
                  borderRadius: "50%",
                  background: planet.color,
                  boxShadow: `inset -${planet.size * 0.08}px -${planet.size * 0.06}px ${planet.size * 0.2}px rgba(0,0,0,0.5)`,
                }}
              />

              {/* Question mark */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: -60,
                  transform: `translateX(-50%) scale(${questionScale * questionBounce})`,
                  opacity: questionOpacity,
                }}
              >
                <span
                  style={{
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: 100,
                    fontWeight: 700,
                    color: "rgba(255, 200, 60, 0.85)",
                    textShadow: "0 0 30px rgba(255, 180, 40, 0.5)",
                  }}
                >
                  ?
                </span>
              </div>
            </div>

            {/* Name */}
            <span
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 52,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.9)",
                letterSpacing: 4,
              }}
            >
              {planet.name}
            </span>

            {/* Subtitle */}
            <span
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 36,
                fontWeight: 300,
                color: "rgba(180, 190, 210, 0.6)",
                letterSpacing: 3,
              }}
            >
              {planet.subtitle}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
