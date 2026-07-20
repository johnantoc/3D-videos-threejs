import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill, random } from "remotion";

interface Scientist {
  x: number;
  label: string;
  color: string;
  delay: number;
}

const scientists: Scientist[] = [
  { x: 600, label: "Dr. Charbonneau", color: "rgba(100, 170, 240, 0.8)", delay: 0 },
  { x: 1920, label: "Lead Researcher", color: "rgba(40, 200, 120, 0.8)", delay: 200 },
  { x: 3200, label: "Skeptic", color: "rgba(255, 160, 60, 0.8)", delay: 400 },
];

export const ScientistPanel: React.FC = () => {
  const frame = useCurrentFrame();

  // Floating data elements
  const dataElements = React.useMemo(() => {
    const items = [];
    for (let i = 0; i < 8; i++) {
      const seed = (n: number) => {
        const x = Math.sin((i * 3 + n) * 9301 + 49297) * 233280;
        return x - Math.floor(x);
      };
      items.push({
        x: 1000 + seed(1) * 1840,
        y: 600 + seed(2) * 900,
        width: seed(3) * 300 + 150,
        height: seed(4) * 80 + 40,
        type: seed(5) > 0.5 ? "chart" : "spectrum",
        delay: seed(6) * 600 + 300,
        color: [
          "rgba(100, 170, 240, 0.4)",
          "rgba(40, 200, 120, 0.4)",
          "rgba(255, 160, 60, 0.4)",
          "rgba(200, 100, 200, 0.4)",
        ][Math.floor(seed(7) * 4)],
      });
    }
    return items;
  }, []);

  // Speech bubble / thought indicators
  const activeDebate = interpolate(frame, [600, 900, 1200, 1500], [0, 1, 2, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a18" }}>
      {/* Subtle grid background */}
      <svg
        style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.06 }}
        viewBox="0 0 3840 2160"
      >
        {Array.from({ length: 40 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={i * 96}
            y1={0}
            x2={i * 96}
            y2={2160}
            stroke="white"
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 23 }, (_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * 96}
            x2={3840}
            y2={i * 96}
            stroke="white"
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Floating data visualizations */}
      {dataElements.map((el, i) => {
        const elOpacity = interpolate(
          frame,
          [el.delay, el.delay + 300],
          [0, 0.7],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
        );

        const floatY = interpolate(
          Math.sin(frame * 0.015 + i * 1.5),
          [-1, 1],
          [-8, 8]
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: el.x,
              top: el.y + floatY,
              width: el.width,
              height: el.height,
              borderRadius: 8,
              border: `1px solid ${el.color}`,
              background: `linear-gradient(135deg, ${el.color.replace("0.4", "0.08")}, transparent)`,
              opacity: elOpacity,
              overflow: "hidden",
            }}
          >
            {el.type === "chart" ? (
              <svg viewBox={`0 0 ${el.width} ${el.height}`} style={{ width: "100%", height: "100%" }}>
                <polyline
                  points={Array.from(
                    { length: 12 },
                    (_, j) =>
                      `${(j / 11) * el.width},${el.height * (0.3 + Math.sin(j * 0.8 + i) * 0.25)}`
                  ).join(" ")}
                  fill="none"
                  stroke={el.color.replace("0.4", "0.7")}
                  strokeWidth={2}
                />
              </svg>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: 3,
                  padding: 8,
                  height: "100%",
                  alignItems: "flex-end",
                }}
              >
                {Array.from({ length: 16 }, (_, j) => {
                  const h = 20 + Math.sin(j * 0.6 + i * 2) * 15 + random(`spectrum-${i}-${j}`) * 5;
                  return (
                    <div
                      key={j}
                      style={{
                        flex: 1,
                        height: `${h}px`,
                        background: el.color.replace("0.4", "0.6"),
                        borderRadius: 2,
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Three scientist silhouettes */}
      {scientists.map((sci, i) => {
        const sciOpacity = interpolate(
          frame,
          [sci.delay, sci.delay + 450],
          [0, 1],
          {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }
        );

        const isActive = Math.round(activeDebate) === i;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: sci.x,
              top: "50%",
              transform: "translate(-50%, -50%)",
              opacity: sciOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 30,
            }}
          >
            {/* Head */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: `radial-gradient(circle at 40% 35%, ${sci.color}, ${sci.color.replace("0.8", "0.4")})`,
                boxShadow: isActive
                  ? `0 0 40px ${sci.color.replace("0.8", "0.5")}`
                  : "none",
              }}
            />
            {/* Body */}
            <div
              style={{
                width: 160,
                height: 240,
                borderRadius: "80px 80px 20px 20px",
                background: `linear-gradient(180deg, ${sci.color.replace("0.8", "0.5")}, ${sci.color.replace("0.8", "0.2")})`,
                boxShadow: isActive
                  ? `0 0 30px ${sci.color.replace("0.8", "0.3")}`
                  : "none",
              }}
            />
            {/* Name */}
            <span
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 44,
                fontWeight: 400,
                color: sci.color,
                letterSpacing: 4,
              }}
            >
              {sci.label}
            </span>
          </div>
        );
      })}

      {/* Debate indicator arrows */}
      {activeDebate >= 0 && (
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            opacity: 0.3,
          }}
        >
          {/* Curved lines between scientists */}
          <path
            d="M 700 1080 Q 1300 900 1820 1080"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={2}
            strokeDasharray="8 4"
          />
          <path
            d="M 2020 1080 Q 2600 900 3100 1080"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={2}
            strokeDasharray="8 4"
          />
        </svg>
      )}

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: "6%",
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
          The Scientific Debate
        </span>
      </div>
    </AbsoluteFill>
  );
};
