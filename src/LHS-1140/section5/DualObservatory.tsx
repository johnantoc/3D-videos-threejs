import React from "react";
import {
  useCurrentFrame,
  interpolate,
  Easing,
  AbsoluteFill,
} from "remotion";

export const DualObservatory: React.FC = () => {
  const frame = useCurrentFrame();

  // JWST (left) fades in
  const jwstOpacity = interpolate(frame, [0, 450], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const jwstX = interpolate(frame, [0, 450], [-200, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // HWO (right) fades in
  const hwoOpacity = interpolate(frame, [300, 750], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const hwoX = interpolate(frame, [300, 750], [200, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Target star
  const starPulse = interpolate(Math.sin(frame * 0.02), [-1, 1], [0.8, 1.1]);

  // Light beams converge
  const beamOpacity = interpolate(frame, [900, 1200], [0, 0.7], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Ground telescope hint
  const groundOpacity = interpolate(frame, [1500, 1800], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const stars = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < 100; i++) {
      const seed = (n: number) => {
        const x = Math.sin((i * 3 + n) * 9301 + 49297) * 233280;
        return x - Math.floor(x);
      };
      result.push({
        x: seed(1) * 100,
        y: seed(2) * 100,
        size: seed(3) * 3 + 1,
        brightness: seed(4) * 0.4 + 0.2,
        offset: seed(5) * 300,
      });
    }
    return result;
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000510" }}>
      {/* Stars */}
      {stars.map((star, i) => {
        const twinkle = interpolate(
          Math.sin(frame * 0.04 + star.offset),
          [-1, 1],
          [0.3, 1]
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              backgroundColor: `rgba(255, 255, 255, ${star.brightness * twinkle})`,
            }}
          />
        );
      })}

      {/* Target star in the distance */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "15%",
          transform: `translate(-50%, -50%) scale(${starPulse})`,
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255, 200, 80, 1), rgba(255, 160, 40, 0.7), transparent)",
            boxShadow:
              "0 0 40px rgba(255, 180, 60, 0.6), 0 0 80px rgba(255, 140, 30, 0.3)",
          }}
        />
      </div>

      {/* JWST - Left side */}
      <div
        style={{
          position: "absolute",
          left: "22%",
          top: "55%",
          transform: `translate(${jwstX}px, -50%)`,
          opacity: jwstOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* Mini JWST */}
        <div style={{ position: "relative" }}>
          {/* Sunshield */}
          <div
            style={{
              position: "absolute",
              left: -120,
              top: 80,
              width: 240,
              height: 15,
              background:
                "linear-gradient(180deg, rgba(180, 190, 210, 0.8), rgba(140, 150, 170, 0.7))",
              borderRadius: 3,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -110,
              top: 100,
              width: 220,
              height: 12,
              background:
                "linear-gradient(180deg, rgba(170, 180, 200, 0.7), rgba(130, 140, 160, 0.6))",
              borderRadius: 3,
            }}
          />
          {/* Mirror segments */}
          <div
            style={{
              width: 160,
              height: 160,
              position: "relative",
            }}
          >
            {[
              { x: 60, y: 10 },
              { x: 10, y: 40 },
              { x: 110, y: 40 },
              { x: 35, y: 85 },
              { x: 85, y: 85 },
              { x: 60, y: 40 },
              { x: 60, y: 120 },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: pos.x,
                  top: pos.y,
                  width: 45,
                  height: 45,
                  background:
                    "linear-gradient(135deg, rgba(210, 190, 140, 0.9), rgba(180, 160, 110, 0.8))",
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              />
            ))}
          </div>
        </div>
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 56,
            fontWeight: 600,
            color: "rgba(210, 190, 140, 0.9)",
            letterSpacing: 6,
          }}
        >
          JWST
        </span>
      </div>

      {/* HWO - Right side */}
      <div
        style={{
          position: "absolute",
          right: "22%",
          top: "55%",
          transform: `translate(${hwoX}px, -50%)`,
          opacity: hwoOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* Futuristic telescope */}
        <div style={{ position: "relative" }}>
          {/* Large primary mirror */}
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 35%, rgba(180, 200, 230, 0.9), rgba(120, 140, 170, 0.8), rgba(80, 100, 130, 0.7))",
              border: "3px solid rgba(160, 180, 210, 0.4)",
              boxShadow: "0 0 30px rgba(100, 140, 200, 0.2)",
            }}
          />
          {/* Secondary mirror strut */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: -40,
              width: 4,
              height: 50,
              background: "rgba(160, 175, 200, 0.7)",
              transform: "translateX(-50%)",
            }}
          />
          {/* Secondary mirror */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: -55,
              width: 30,
              height: 30,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(200, 210, 230, 0.9), rgba(150, 165, 190, 0.8))",
              transform: "translateX(-50%)",
            }}
          />
          {/* Sunshield */}
          <div
            style={{
              position: "absolute",
              left: -60,
              top: 140,
              width: 300,
              height: 12,
              background:
                "linear-gradient(180deg, rgba(100, 140, 200, 0.7), rgba(70, 110, 170, 0.6))",
              borderRadius: 3,
            }}
          />
        </div>
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 52,
            fontWeight: 600,
            color: "rgba(140, 180, 230, 0.9)",
            letterSpacing: 6,
          }}
        >
          Habitable Worlds Observatory
        </span>
      </div>

      {/* Light beams converging on target star */}
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          opacity: beamOpacity,
        }}
      >
        {/* JWST beam */}
        <line
          x1="30%"
          y1="55%"
          x2="50%"
          y2="15%"
          stroke="rgba(210, 190, 140, 0.3)"
          strokeWidth={3}
          strokeDasharray="8 4"
        />
        {/* HWO beam */}
        <line
          x1="70%"
          y1="55%"
          x2="50%"
          y2="15%"
          stroke="rgba(140, 180, 230, 0.3)"
          strokeWidth={3}
          strokeDasharray="8 4"
        />
      </svg>

      {/* Ground-based ELT hint */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: groundOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 44,
            fontWeight: 300,
            color: "rgba(160, 175, 200, 0.6)",
            letterSpacing: 6,
          }}
        >
          + Ground-based Extremely Large Telescopes
        </span>
      </div>
    </AbsoluteFill>
  );
};
