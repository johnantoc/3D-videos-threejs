import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const SideBySide: React.FC = () => {
  const frame = useCurrentFrame();

  // Left side (Earth) slides in
  const earthX = interpolate(frame, [0, 450], [-400, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const earthOpacity = interpolate(frame, [0, 300], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Right side (LHS 1140b) slides in
  const lhsX = interpolate(frame, [150, 600], [400, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const lhsOpacity = interpolate(frame, [150, 450], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "VS" divider
  const vsOpacity = interpolate(frame, [600, 750], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Atmosphere pulse for both
  const pulse = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.8, 1]);

  // Difficulty meter
  const meterProgress = interpolate(frame, [900, 1500], [0, 0.92], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const meterOpacity = interpolate(frame, [900, 1200], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000510" }}>
      {/* Stars background */}
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

      {/* Divider line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "15%",
          width: 2,
          height: "70%",
          background:
            "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.15), transparent)",
          opacity: vsOpacity,
        }}
      />

      {/* EARTH - Left side */}
      <div
        style={{
          position: "absolute",
          left: "15%",
          top: "50%",
          transform: `translate(${earthX}px, -50%)`,
          opacity: earthOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Planet */}
        <div style={{ position: "relative" }}>
          {/* Thick atmosphere glow */}
          <div
            style={{
              position: "absolute",
              left: -50,
              top: -50,
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(70, 140, 240, 0.1) 50%, rgba(70, 140, 240, 0.25) 70%, rgba(70, 140, 240, 0.15) 85%, transparent 100%)",
              opacity: pulse,
              filter: "blur(15px)",
            }}
          />
          {/* Atmosphere rim */}
          <div
            style={{
              position: "absolute",
              left: -25,
              top: -25,
              width: 450,
              height: 450,
              borderRadius: "50%",
              border: "4px solid rgba(100, 170, 255, 0.25)",
              boxShadow:
                "0 0 40px rgba(70, 140, 240, 0.2), inset 0 0 30px rgba(70, 140, 240, 0.1)",
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
                "radial-gradient(circle at 35% 35%, #4a90d9, #2d6bb5, #1a4a8a, #0d2d5a)",
              boxShadow:
                "inset -30px -20px 60px rgba(0, 0, 0, 0.4), inset 10px 10px 30px rgba(100, 180, 255, 0.2)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Clouds */}
            <div
              style={{
                position: "absolute",
                left: "15%",
                top: "20%",
                width: "40%",
                height: "15%",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse, rgba(255, 255, 255, 0.4), transparent)",
                filter: "blur(8px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "45%",
                top: "55%",
                width: "35%",
                height: "12%",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse, rgba(255, 255, 255, 0.3), transparent)",
                filter: "blur(6px)",
              }}
            />
            {/* Continents */}
            <div
              style={{
                position: "absolute",
                left: "25%",
                top: "30%",
                width: "30%",
                height: "25%",
                borderRadius: "40%",
                background:
                  "radial-gradient(ellipse, rgba(40, 120, 50, 0.6), transparent)",
                filter: "blur(5px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "55%",
                top: "45%",
                width: "20%",
                height: "20%",
                borderRadius: "40%",
                background:
                  "radial-gradient(ellipse, rgba(50, 130, 60, 0.5), transparent)",
                filter: "blur(4px)",
              }}
            />
          </div>
        </div>

        {/* Label */}
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 72,
            fontWeight: 600,
            color: "rgba(100, 170, 255, 0.9)",
            letterSpacing: 6,
            textShadow: "0 0 30px rgba(70, 140, 240, 0.4)",
          }}
        >
          EARTH
        </span>
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 44,
            fontWeight: 300,
            color: "rgba(160, 180, 210, 0.6)",
            letterSpacing: 4,
          }}
        >
          Thick atmosphere
        </span>
      </div>

      {/* LHS 1140b - Right side */}
      <div
        style={{
          position: "absolute",
          right: "15%",
          top: "50%",
          transform: `translate(${lhsX}px, -50%)`,
          opacity: lhsOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Planet */}
        <div style={{ position: "relative" }}>
          {/* Thin atmosphere glow */}
          <div
            style={{
              position: "absolute",
              left: -30,
              top: -30,
              width: 460,
              height: 460,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, transparent 55%, rgba(100, 160, 255, 0.08) 70%, rgba(100, 160, 255, 0.15) 85%, transparent 100%)",
              opacity: pulse,
              filter: "blur(10px)",
            }}
          />
          {/* Thin atmosphere rim */}
          <div
            style={{
              position: "absolute",
              left: -15,
              top: -15,
              width: 430,
              height: 430,
              borderRadius: "50%",
              border: "2px solid rgba(100, 160, 255, 0.12)",
              boxShadow: "0 0 15px rgba(100, 160, 255, 0.08)",
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
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "25%",
                height: "18%",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse, rgba(60, 28, 16, 0.4), transparent)",
                filter: "blur(5px)",
              }}
            />
          </div>
        </div>

        {/* Label */}
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 72,
            fontWeight: 600,
            color: "rgba(200, 120, 70, 0.9)",
            letterSpacing: 6,
            textShadow: "0 0 30px rgba(180, 100, 50, 0.4)",
          }}
        >
          LHS 1140b
        </span>
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 44,
            fontWeight: 300,
            color: "rgba(160, 180, 210, 0.6)",
            letterSpacing: 4,
          }}
        >
          Thin atmospheric haze
        </span>
      </div>

      {/* VS badge */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: vsOpacity,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "3px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(20, 20, 40, 0.8)",
          }}
        >
          <span
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: 52,
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.6)",
              letterSpacing: 4,
            }}
          >
            VS
          </span>
        </div>
      </div>

      {/* Difficulty meter */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          opacity: meterOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 36,
            fontWeight: 400,
            color: "rgba(200, 210, 230, 0.6)",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Detection Difficulty
        </span>
        <div
          style={{
            width: "100%",
            height: 16,
            borderRadius: 8,
            background: "rgba(255, 255, 255, 0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${meterProgress * 100}%`,
              height: "100%",
              borderRadius: 8,
              background:
                "linear-gradient(90deg, rgba(40, 180, 80, 0.8), rgba(255, 180, 40, 0.8), rgba(255, 80, 50, 0.9))",
              boxShadow: "0 0 15px rgba(255, 120, 50, 0.4)",
            }}
          />
        </div>
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 32,
            fontWeight: 600,
            color: "rgba(255, 140, 60, 0.8)",
            letterSpacing: 4,
          }}
        >
          EXTREMELY DIFFICULT
        </span>
      </div>
    </AbsoluteFill>
  );
};
