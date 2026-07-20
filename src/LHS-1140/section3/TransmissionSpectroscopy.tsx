import React from "react";
import {
  useCurrentFrame,
  interpolate,
  Easing,
  AbsoluteFill,
} from "remotion";

export const TransmissionSpectroscopy: React.FC = () => {
  const frame = useCurrentFrame();

  // Red dwarf star
  const starPulse = interpolate(Math.sin(frame * 0.015), [-1, 1], [0.9, 1.1]);

  // Planet transit - moves from right to left across the star
  const planetX = interpolate(frame, [0, 1800], [1200, -200], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Light beam - appears when planet is in front of star
  const beamOpacity = interpolate(frame, [600, 900, 1500, 1800], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Spectrum splitting animation
  const spectrumProgress = interpolate(frame, [900, 1800], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Atmosphere glow around planet
  const atmosphereGlow = interpolate(
    Math.sin(frame * 0.02),
    [-1, 1],
    [0.5, 1]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000510" }}>
      {/* Distant stars */}
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
                backgroundColor: `rgba(255, 255, 255, ${seed(4) * 0.4 + 0.2})`,
              }}
            />
          );
        }
        return result;
      }, [])}

      {/* Red dwarf star */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${starPulse})`,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 100, 40, 1) 0%, rgba(220, 60, 20, 0.9) 30%, rgba(180, 40, 10, 0.6) 60%, rgba(120, 20, 5, 0.2) 80%, transparent 100%)",
          boxShadow:
            "0 0 100px rgba(255, 80, 30, 0.6), 0 0 200px rgba(200, 50, 20, 0.3), 0 0 400px rgba(150, 30, 10, 0.15)",
        }}
      />

      {/* LHS 1140b planet with atmosphere */}
      <div
        style={{
          position: "absolute",
          left: planetX,
          top: "43%",
        }}
      >
        {/* Atmospheric halo */}
        <div
          style={{
            position: "absolute",
            left: -30,
            top: -30,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(100, 160, 255, 0.08) 50%, rgba(80, 140, 255, 0.15) 70%, transparent 100%)",
            opacity: atmosphereGlow,
            filter: "blur(12px)",
          }}
        />
        {/* Atmospheric rim light */}
        <div
          style={{
            position: "absolute",
            left: -10,
            top: -10,
            width: 220,
            height: 220,
            borderRadius: "50%",
            border: "3px solid rgba(100, 160, 255, 0.15)",
            boxShadow:
              "0 0 30px rgba(100, 160, 255, 0.2), inset 0 0 20px rgba(100, 160, 255, 0.05)",
            opacity: atmosphereGlow,
          }}
        />
        {/* Planet body */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, rgba(140, 80, 50, 1) 0%, rgba(100, 50, 30, 1) 40%, rgba(60, 25, 15, 1) 70%, rgba(30, 12, 8, 1) 100%)",
            boxShadow:
              "inset -20px -15px 40px rgba(0, 0, 0, 0.7), inset 8px 8px 20px rgba(160, 90, 50, 0.2)",
          }}
        />
      </div>

      {/* Light beam from star through atmosphere */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "48%",
          width: 1800,
          height: 6,
          background:
            "linear-gradient(90deg, rgba(255, 200, 100, 0.9), rgba(255, 220, 140, 0.7), rgba(255, 240, 180, 0.5))",
          opacity: beamOpacity,
          transform: "translateX(-50%)",
          filter: "blur(2px)",
          boxShadow: "0 0 20px rgba(255, 200, 100, 0.4)",
        }}
      />

      {/* Spectrum split - rainbow bands */}
      {spectrumProgress > 0 && (
        <div
          style={{
            position: "absolute",
            right: "8%",
            top: "30%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            opacity: spectrumProgress,
          }}
        >
          {[
            { color: "rgba(140, 40, 40, 0.9)", label: "706nm" },
            { color: "rgba(200, 80, 30, 0.9)", label: "668nm" },
            { color: "rgba(220, 180, 40, 0.9)", label: "588nm" },
            { color: "rgba(60, 180, 60, 0.9)", label: "502nm" },
            { color: "rgba(40, 120, 200, 0.9)", label: "447nm" },
            { color: "rgba(80, 40, 180, 0.9)", label: "389nm" },
          ].map((band, i) => {
            const bandProgress = interpolate(
              spectrumProgress,
              [i * 0.1, i * 0.1 + 0.4],
              [0, 1],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
            );
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  opacity: bandProgress,
                }}
              >
                <div
                  style={{
                    width: interpolate(bandProgress, [0, 1], [0, 400]),
                    height: 28,
                    background: band.color,
                    borderRadius: 4,
                    boxShadow: `0 0 15px ${band.color}66`,
                  }}
                />
                <span
                  style={{
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: 48,
                    fontWeight: 400,
                    color: "rgba(200, 210, 230, 0.6)",
                  }}
                >
                  {band.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [1200, 1500], [0, 1], {
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
            fontSize: 80,
            fontWeight: 300,
            color: "rgba(200, 210, 230, 0.7)",
            letterSpacing: 10,
            fontStyle: "italic",
          }}
        >
          Transmission Spectroscopy — Light Through an Atmosphere
        </span>
      </div>
    </AbsoluteFill>
  );
};
