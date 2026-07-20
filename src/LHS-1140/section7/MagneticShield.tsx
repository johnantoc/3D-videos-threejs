import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";

export const MagneticShield: React.FC = () => {
  const frame = useCurrentFrame();

  // Magnetic field lines appear
  const fieldOpacity = interpolate(frame, [300, 750], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Field line pulse
  const fieldPulse = interpolate(Math.sin(frame * 0.03), [-1, 1], [0.7, 1]);

  // Wind particles being deflected
  const deflectionActive = interpolate(frame, [750, 1050], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Wind particles
  const windParticles = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < 40; i++) {
      const seed = (n: number) => {
        const x = Math.sin((i * 3 + n) * 9301 + 49297) * 233280;
        return x - Math.floor(x);
      };
      result.push({
        y: seed(1) * 1600 + 280,
        speed: seed(2) * 6 + 3,
        size: seed(3) * 5 + 2,
        offset: seed(4) * 500,
        opacity: seed(5) * 0.5 + 0.3,
      });
    }
    return result;
  }, []);

  // Atmosphere intact indicator
  const atmosphereGlow = interpolate(frame, [1200, 1500], [0.15, 0.35], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // "Protected" badge
  const badgeOpacity = interpolate(frame, [1500, 1800], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0508" }}>
      {/* Background stars */}
      {React.useMemo(() => {
        const result = [];
        for (let i = 0; i < 60; i++) {
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
                width: seed(3) * 2 + 0.5,
                height: seed(3) * 2 + 0.5,
                borderRadius: "50%",
                backgroundColor: `rgba(255, 255, 255, ${seed(4) * 0.3 + 0.1})`,
              }}
            />
          );
        }
        return result;
      }, [])}

      {/* Red dwarf in background (dimmer) */}
      <div
        style={{
          position: "absolute",
          left: 300,
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255, 80, 30, 0.7) 0%, rgba(200, 50, 15, 0.4) 50%, transparent 100%)",
            boxShadow: "0 0 60px rgba(255, 60, 20, 0.3)",
          }}
        />
      </div>

      {/* Planet with magnetic field */}
      <div
        style={{
          position: "absolute",
          left: "55%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Magnetic field lines */}
        {fieldOpacity > 0 &&
          [-60, -30, 0, 30, 60].map((angle, i) => {
            const fieldLineOpacity =
              fieldOpacity *
              fieldPulse *
              interpolate(
                Math.sin(frame * 0.02 + i * 0.8),
                [-1, 1],
                [0.5, 1]
              );

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 100,
                  top: 100,
                  width: 300,
                  height: 200,
                  border: `2px solid rgba(80, 160, 255, ${0.3 * fieldLineOpacity})`,
                  borderRadius: "50%",
                  transform: `rotate(${angle}deg) translateX(-50%)`,
                  transformOrigin: "0% 50%",
                  opacity: fieldLineOpacity,
                }}
              />
            );
          })}

        {/* Magnetosphere glow */}
        <div
          style={{
            position: "absolute",
            left: -80,
            top: -80,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: `radial-gradient(circle, transparent 30%, rgba(80, 160, 255, ${0.06 * fieldOpacity}) 50%, rgba(80, 160, 255, ${0.12 * fieldOpacity}) 70%, transparent 90%)`,
            opacity: fieldPulse,
            filter: "blur(10px)",
          }}
        />

        {/* Atmosphere (intact, glowing) */}
        <div
          style={{
            position: "absolute",
            left: -20,
            top: -20,
            width: 440,
            height: 440,
            borderRadius: "50%",
            background: `radial-gradient(circle, transparent 50%, rgba(100, 160, 255, ${atmosphereGlow}) 70%, rgba(100, 160, 255, ${atmosphereGlow * 1.5}) 85%, transparent 100%)`,
            filter: "blur(12px)",
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

      {/* Deflected wind particles */}
      {deflectionActive > 0 &&
        windParticles.map((p, i) => {
          const rawX = ((frame * p.speed + p.offset) % 2400) + 400;
          // Deflect around the magnetic field
          const planetCenterX = 2100;
          const planetCenterY = 1080;
          const distFromCenter = Math.abs(rawX - planetCenterX);
          const deflectRange = 500;

          let yPos = p.y;
          let particleOpacity = p.opacity * deflectionActive;

          if (distFromCenter < deflectRange) {
            // Deflect upward or downward based on y position
            const deflectAmount =
              (1 - distFromCenter / deflectRange) * 200;
            yPos = p.y < planetCenterY ? p.y - deflectAmount : p.y + deflectAmount;
            particleOpacity *= 0.4; // Dimmer when deflected
          }

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: rawX,
                top: yPos,
                width: p.size * 3,
                height: p.size,
                borderRadius: "50%",
                background: `rgba(255, 140, 50, ${particleOpacity})`,
                filter: "blur(1px)",
              }}
            />
          );
        })}

      {/* "Protected" badge */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "55%",
          transform: "translateX(-50%)",
          opacity: badgeOpacity,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(40, 180, 80, 0.15)",
            border: "3px solid rgba(40, 200, 90, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 44, color: "rgba(40, 200, 90, 0.9)" }}>✓</span>
        </div>
        <span
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: 56,
            fontWeight: 600,
            color: "rgba(40, 200, 90, 0.9)",
            letterSpacing: 6,
            textShadow: "0 0 20px rgba(40, 180, 80, 0.4)",
          }}
        >
          Magnetic field protection
        </span>
      </div>

      {/* Label */}
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
          How LHS 1140b Retains Its Atmosphere
        </span>
      </div>
    </AbsoluteFill>
  );
};
